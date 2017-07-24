// Copyright 2014 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package repo

import (
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/Unknwon/com"
	"github.com/Unknwon/paginater"
	log "gopkg.in/clog.v1"

	"github.com/cabernety/boxlinker-git/models"
	"github.com/cabernety/boxlinker-git/models/errors"
	"github.com/cabernety/boxlinker-git/modules/base"
	"github.com/cabernety/boxlinker-git/modules/context"
	"github.com/cabernety/boxlinker-git/modules/form"
	"github.com/cabernety/boxlinker-git/modules/setting"
)

const (
	ISSUES     base.TplName = "repo/issue/list"
	ISSUE_NEW  base.TplName = "repo/issue/new"
	ISSUE_VIEW base.TplName = "repo/issue/view"

	LABELS base.TplName = "repo/issue/labels"

	MILESTONE      base.TplName = "repo/issue/milestones"
	MILESTONE_NEW  base.TplName = "repo/issue/milestone_new"
	MILESTONE_EDIT base.TplName = "repo/issue/milestone_edit"

	ISSUE_TEMPLATE_KEY = "IssueTemplate"
)

var (
	ErrFileTypeForbidden = errors.New("File type is not allowed")
	ErrTooManyFiles      = errors.New("Maximum number of files to upload exceeded")

	IssueTemplateCandidates = []string{
		"ISSUE_TEMPLATE.md",
		".gogs/ISSUE_TEMPLATE.md",
		".github/ISSUE_TEMPLATE.md",
	}
)

func MustEnableIssues(ctx *context.Context) {
	if !ctx.Repo.Repository.EnableIssues {
		ctx.Handle(404, "MustEnableIssues", nil)
		return
	}

	if ctx.Repo.Repository.EnableExternalTracker {
		ctx.Redirect(ctx.Repo.Repository.ExternalTrackerURL)
		return
	}
}

func MustAllowPulls(ctx *context.Context) {
	if !ctx.Repo.Repository.AllowsPulls() {
		ctx.Handle(404, "MustAllowPulls", nil)
		return
	}

	// User can send pull request if owns a forked repository.
	if ctx.IsSigned && ctx.User.HasForkedRepo(ctx.Repo.Repository.ID) {
		ctx.Repo.PullRequest.Allowed = true
		ctx.Repo.PullRequest.HeadInfo = ctx.User.Name + ":" + ctx.Repo.BranchName
	}
}

func RetrieveLabels(ctx *context.Context) {
	labels, err := models.GetLabelsByRepoID(ctx.Repo.Repository.ID)
	if err != nil {
		ctx.Handle(500, "RetrieveLabels.GetLabels", err)
		return
	}
	for _, l := range labels {
		l.CalOpenIssues()
	}
	ctx.Data["Labels"] = labels
	ctx.Data["NumLabels"] = len(labels)
}

func issues(ctx *context.Context, isPullList bool) {
	if isPullList {
		MustAllowPulls(ctx)
		if ctx.Written() {
			return
		}
		ctx.Data["Title"] = ctx.Tr("repo.pulls")
		ctx.Data["PageIsPullList"] = true

	} else {
		MustEnableIssues(ctx)
		if ctx.Written() {
			return
		}
		ctx.Data["Title"] = ctx.Tr("repo.issues")
		ctx.Data["PageIsIssueList"] = true
	}

	viewType := ctx.Query("type")
	sortType := ctx.Query("sort")
	types := []string{"assigned", "created_by", "mentioned"}
	if !com.IsSliceContainsStr(types, viewType) {
		viewType = "all"
	}

	// Must sign in to see issues about you.
	if viewType != "all" && !ctx.IsSigned {
		ctx.SetCookie("redirect_to", "/"+url.QueryEscape(setting.AppSubUrl+ctx.Req.RequestURI), 0, setting.AppSubUrl)
		ctx.Redirect(setting.AppSubUrl + "/user/login")
		return
	}

	var (
		assigneeID = ctx.QueryInt64("assignee")
		posterID   int64
	)
	filterMode := models.FILTER_MODE_YOUR_REPOS
	switch viewType {
	case "assigned":
		filterMode = models.FILTER_MODE_ASSIGN
		assigneeID = ctx.User.ID
	case "created_by":
		filterMode = models.FILTER_MODE_CREATE
		posterID = ctx.User.ID
	case "mentioned":
		filterMode = models.FILTER_MODE_MENTION
	}

	var uid int64 = -1
	if ctx.IsSigned {
		uid = ctx.User.ID
	}

	isShowClosed := string("open")
	repo := ctx.Repo.Repository
	selectLabels := ctx.Query("labels")
	milestoneID := ctx.QueryInt64("milestone")
	tmp := ctx.Query("state")
	if tmp != "" {
		isShowClosed = tmp
	}
	issueStats := models.GetIssueStats(&models.IssueStatsOptions{
		RepoID:      repo.ID,
		UserID:      uid,
		Labels:      selectLabels,
		MilestoneID: milestoneID,
		AssigneeID:  assigneeID,
		FilterMode:  filterMode,
		IsPull:      isPullList,
	})

	page := ctx.QueryInt("page")
	if page <= 1 {
		page = 1
	}

	var total int
	var show int8
	if isShowClosed == "open" {
		total = int(issueStats.OpenCount)
		show = 0
	} else if isShowClosed == "closed" {
		total = int(issueStats.ClosedCount)
		show = 1
	} else if isShowClosed == "fix" {
		total = int(issueStats.FixCount)
		show = 2
	}

	pager := paginater.New(total, setting.UI.IssuePagingNum, page, 5)
	ctx.Data["Page"] = pager

	issues, err := models.Issues(&models.IssuesOptions{
		UserID:      uid,
		AssigneeID:  assigneeID,
		RepoID:      repo.ID,
		PosterID:    posterID,
		MilestoneID: milestoneID,
		Page:        pager.Current(),
		IsClosed:    show,
		IsMention:   filterMode == models.FILTER_MODE_MENTION,
		IsPull:      isPullList,
		Labels:      selectLabels,
		SortType:    sortType,
	})
	if err != nil {
		ctx.Handle(500, "Issues", err)
		return
	}

	// Get issue-user relations.
	pairs, err := models.GetIssueUsers(repo.ID, posterID, show)
	if err != nil {
		ctx.Handle(500, "GetIssueUsers", err)
		return
	}

	// Get posters.
	for i := range issues {
		if !ctx.IsSigned {
			issues[i].IsRead = true
			continue
		}

		length := len(issues[i].Comments)

		for j := length - 1; j >= 0; j-- {
			if issues[i].Comments[j].Type != 0 {
				issues[i].TopComment = int64(j)
				u, err := models.GetUserByID(issues[i].Comments[j].AssigneeId)
				if err == nil {
					issues[i].Comments[j].AssigneeName = u.Name
					issues[i].Comments[j].AssigneeAvatar = u.AvatarLink()
					issues[i].Comments[j].AssigneeLink = u.HomeLink()
				} else {
					fmt.Println(err)
				}
				break
			}
		}

		// Check read status.
		idx := models.PairsContains(pairs, issues[i].ID, ctx.User.ID)
		if idx > -1 {
			issues[i].IsRead = pairs[idx].IsRead
		} else {
			issues[i].IsRead = true
		}
	}
	ctx.Data["Issues"] = issues

	// Get milestones.
	ctx.Data["Milestones"], err = models.GetMilestonesByRepoID(repo.ID)
	if err != nil {
		ctx.Handle(500, "GetAllRepoMilestones", err)
		return
	}

	// Get assignees.
	ctx.Data["Assignees"], err = repo.GetAssignees()
	if err != nil {
		ctx.Handle(500, "GetAssignees", err)
		return
	}

	if viewType == "assigned" {
		assigneeID = 0 // Reset ID to prevent unexpected selection of assignee.
	}

	ctx.Data["IssueStats"] = issueStats
	ctx.Data["SelectLabels"] = com.StrTo(selectLabels).MustInt64()
	ctx.Data["ViewType"] = viewType
	ctx.Data["SortType"] = sortType
	ctx.Data["MilestoneID"] = milestoneID
	ctx.Data["AssigneeID"] = assigneeID
	ctx.Data["IsShowClosed"] = show
	if isShowClosed == "closed" {
		ctx.Data["State"] = "closed"
	} else if isShowClosed == "open" {
		ctx.Data["State"] = "open"
	} else {
		ctx.Data["State"] = "fix"
	}
	ctx.Data["IssueImportanceState"] = []string{"有空看看", "紧急", "十分紧急", "十万火急"}
	ctx.HTML(200, ISSUES)
}

func Issues(ctx *context.Context) {
	issues(ctx, false)
}

func Pulls(ctx *context.Context) {
	issues(ctx, true)
}

func renderAttachmentSettings(ctx *context.Context) {
	ctx.Data["RequireDropzone"] = true
	ctx.Data["IsAttachmentEnabled"] = setting.AttachmentEnabled
	ctx.Data["AttachmentAllowedTypes"] = setting.AttachmentAllowedTypes
	ctx.Data["AttachmentMaxSize"] = setting.AttachmentMaxSize
	ctx.Data["AttachmentMaxFiles"] = setting.AttachmentMaxFiles
}

func RetrieveRepoMilestonesAndAssignees(ctx *context.Context, repo *models.Repository) {
	var err error
	ctx.Data["OpenMilestones"], err = models.GetMilestones(repo.ID, -1, 0)
	if err != nil {
		ctx.Handle(500, "GetMilestones", err)
		return
	}
	ctx.Data["ClosedMilestones"], err = models.GetMilestones(repo.ID, -1, 1)
	if err != nil {
		ctx.Handle(500, "GetMilestones", err)
		return
	}

	ctx.Data["Assignees"], err = repo.GetAssignees()
	if err != nil {
		ctx.Handle(500, "GetAssignees", err)
		return
	}
}

func RetrieveRepoMetas(ctx *context.Context, repo *models.Repository) []*models.Label {
	if !ctx.Repo.IsWriter() {
		return nil
	}

	labels, err := models.GetLabelsByRepoID(repo.ID)
	if err != nil {
		ctx.Handle(500, "GetLabelsByRepoID", err)
		return nil
	}
	ctx.Data["Labels"] = labels

	RetrieveRepoMilestonesAndAssignees(ctx, repo)
	if ctx.Written() {
		return nil
	}

	return labels
}

func getFileContentFromDefaultBranch(ctx *context.Context, filename string) (string, bool) {
	var r io.Reader
	var bytes []byte

	if ctx.Repo.Commit == nil {
		var err error
		ctx.Repo.Commit, err = ctx.Repo.GitRepo.GetBranchCommit(ctx.Repo.Repository.DefaultBranch)
		if err != nil {
			return "", false
		}
	}

	entry, err := ctx.Repo.Commit.GetTreeEntryByPath(filename)
	if err != nil {
		return "", false
	}
	r, err = entry.Blob().Data()
	if err != nil {
		return "", false
	}
	bytes, err = ioutil.ReadAll(r)
	if err != nil {
		return "", false
	}
	return string(bytes), true
}

func setTemplateIfExists(ctx *context.Context, ctxDataKey string, possibleFiles []string) {
	for _, filename := range possibleFiles {
		content, found := getFileContentFromDefaultBranch(ctx, filename)
		if found {
			ctx.Data[ctxDataKey] = content
			return
		}
	}
}

func NewIssue(ctx *context.Context) {
	fmt.Println("NewIssue")
	ctx.Data["Title"] = ctx.Tr("repo.issues.new")
	ctx.Data["PageIsIssueList"] = true
	ctx.Data["RequireHighlightJS"] = true
	ctx.Data["RequireSimpleMDE"] = true
	setTemplateIfExists(ctx, ISSUE_TEMPLATE_KEY, IssueTemplateCandidates)
	renderAttachmentSettings(ctx)

	RetrieveRepoMetas(ctx, ctx.Repo.Repository)
	if ctx.Written() {
		return
	}

	ctx.HTML(200, ISSUE_NEW)
}

func ValidateRepoMetas(ctx *context.Context, f form.NewIssue) ([]int64, int64, int64) {
	var (
		repo = ctx.Repo.Repository
		err  error
	)

	labels := RetrieveRepoMetas(ctx, ctx.Repo.Repository)
	if ctx.Written() {
		return nil, 0, 0
	}

	if !ctx.Repo.IsWriter() {
		return nil, 0, 0
	}

	// Check labels.
	labelIDs := base.StringsToInt64s(strings.Split(f.LabelIDs, ","))
	labelIDMark := base.Int64sToMap(labelIDs)
	hasSelected := false
	for i := range labels {
		if labelIDMark[labels[i].ID] {
			labels[i].IsChecked = true
			hasSelected = true
		}
	}
	ctx.Data["HasSelectedLabel"] = hasSelected
	ctx.Data["label_ids"] = f.LabelIDs
	ctx.Data["Labels"] = labels

	// Check milestone.
	milestoneID := f.MilestoneID
	if milestoneID > 0 {
		ctx.Data["Milestone"], err = repo.GetMilestoneByID(milestoneID)
		if err != nil {
			ctx.Handle(500, "GetMilestoneByID", err)
			return nil, 0, 0
		}
		ctx.Data["milestone_id"] = milestoneID
	}

	// Check assignee.
	assigneeID := f.AssigneeID
	if assigneeID > 0 {
		ctx.Data["Assignee"], err = repo.GetAssigneeByID(assigneeID)
		if err != nil {
			ctx.Handle(500, "GetAssigneeByID", err)
			return nil, 0, 0
		}
		ctx.Data["assignee_id"] = assigneeID
	}

	return labelIDs, milestoneID, assigneeID
}

func NewIssuePost(ctx *context.Context, f form.NewIssue) {
	ctx.Data["Title"] = ctx.Tr("repo.issues.new")
	ctx.Data["PageIsIssueList"] = true
	ctx.Data["RequireHighlightJS"] = true
	ctx.Data["RequireSimpleMDE"] = true
	renderAttachmentSettings(ctx)

	labelIDs, milestoneID, assigneeID := ValidateRepoMetas(ctx, f)
	if ctx.Written() {
		return
	}

	if ctx.HasError() {
		ctx.HTML(200, ISSUE_NEW)
		return
	}

	var attachments []string
	if setting.AttachmentEnabled {
		attachments = f.Files
	}

	issue := &models.Issue{
		RepoID:      ctx.Repo.Repository.ID,
		Title:       f.Title,
		PosterID:    ctx.User.ID,
		Poster:      ctx.User,
		MilestoneID: milestoneID,
		AssigneeID:  assigneeID,
		Content:     f.Content,
		Importance:  int8(f.Importance),
	}
	if err := models.NewIssue(ctx.Repo.Repository, issue, labelIDs, attachments); err != nil {
		ctx.Handle(500, "NewIssue", err)
		return
	}

	log.Trace("Issue created: %d/%d", ctx.Repo.Repository.ID, issue.ID)
	ctx.Redirect(ctx.Repo.RepoLink + "/issues/" + com.ToStr(issue.Index))
}

func uploadAttachment(ctx *context.Context, allowedTypes []string) {
	file, header, err := ctx.Req.FormFile("file")
	if err != nil {
		ctx.Error(500, fmt.Sprintf("FormFile: %v", err))
		return
	}
	defer file.Close()

	buf := make([]byte, 1024)
	n, _ := file.Read(buf)
	if n > 0 {
		buf = buf[:n]
	}
	fileType := http.DetectContentType(buf)

	allowed := false
	for _, t := range allowedTypes {
		t := strings.Trim(t, " ")
		if t == "*/*" || t == fileType {
			allowed = true
			break
		}
	}

	if !allowed {
		ctx.Error(400, ErrFileTypeForbidden.Error())
		return
	}

	attach, err := models.NewAttachment(header.Filename, buf, file)
	if err != nil {
		ctx.Error(500, fmt.Sprintf("NewAttachment: %v", err))
		return
	}

	log.Trace("New attachment uploaded: %s", attach.UUID)
	ctx.JSON(200, map[string]string{
		"uuid": attach.UUID,
	})
}

func UploadIssueAttachment(ctx *context.Context) {
	if !setting.AttachmentEnabled {
		ctx.NotFound()
		return
	}

	uploadAttachment(ctx, strings.Split(setting.AttachmentAllowedTypes, ","))
}

func viewIssue(ctx *context.Context, isPullList bool) {
	ctx.Data["RequireHighlightJS"] = true
	ctx.Data["RequireDropzone"] = true
	renderAttachmentSettings(ctx)

	index := ctx.ParamsInt64(":index")
	if index <= 0 {
		ctx.NotFound()
		return
	}

	issue, err := models.GetIssueByIndex(ctx.Repo.Repository.ID, index)
	if err != nil {
		ctx.NotFoundOrServerError("GetIssueByIndex", errors.IsIssueNotExist, err)
		return
	}
	ctx.Data["Title"] = issue.Title

	// Make sure type and URL matches.
	if !isPullList && issue.IsPull {
		ctx.Redirect(ctx.Repo.RepoLink + "/pulls/" + com.ToStr(issue.Index))
		return
	} else if isPullList && !issue.IsPull {
		ctx.Redirect(ctx.Repo.RepoLink + "/issues/" + com.ToStr(issue.Index))
		return
	}

	if issue.IsPull {
		MustAllowPulls(ctx)
		if ctx.Written() {
			return
		}
		ctx.Data["PageIsPullList"] = true
		ctx.Data["PageIsPullConversation"] = true
	} else {
		MustEnableIssues(ctx)
		if ctx.Written() {
			return
		}
		ctx.Data["PageIsIssueList"] = true
	}

	issue.RenderedContent = string([]byte(issue.Content))

	repo := ctx.Repo.Repository

	// Get more information if it's a pull request.
	if issue.IsPull {
		if issue.PullRequest.HasMerged {
			ctx.Data["DisableStatusChange"] = issue.PullRequest.HasMerged
			PrepareMergedViewPullInfo(ctx, issue)
		} else {
			PrepareViewPullInfo(ctx, issue)
		}
		if ctx.Written() {
			return
		}
	}

	// Metas.
	// Check labels.
	labelIDMark := make(map[int64]bool)
	for i := range issue.Labels {
		labelIDMark[issue.Labels[i].ID] = true
	}
	labels, err := models.GetLabelsByRepoID(repo.ID)
	if err != nil {
		ctx.Handle(500, "GetLabelsByRepoID", err)
		return
	}
	hasSelected := false
	for i := range labels {
		if labelIDMark[labels[i].ID] {
			labels[i].IsChecked = true
			hasSelected = true
		}
	}
	ctx.Data["HasSelectedLabel"] = hasSelected
	ctx.Data["Labels"] = labels

	// Check milestone and assignee.
	if ctx.Repo.IsWriter() {
		RetrieveRepoMilestonesAndAssignees(ctx, repo)
		if ctx.Written() {
			return
		}
	}

	if ctx.IsSigned {
		// Update issue-user.
		if err = issue.ReadBy(ctx.User.ID); err != nil {
			ctx.Handle(500, "ReadBy", err)
			return
		}
	}

	var (
		tag          models.CommentTag
		ok           bool
		marked       = make(map[int64]models.CommentTag)
		comment      *models.Comment
		participants = make([]*models.User, 1, 10)
	)

	// Render comments and and fetch participants.
	participants[0] = issue.Poster
	var j int
	for j, comment = range issue.Comments {
		if comment.Type == models.COMMENT_TYPE_COMMENT {
			comment.RenderedContent = string([]byte(comment.Content))

			// Check tag.
			tag, ok = marked[comment.PosterID]
			if ok {
				comment.ShowTag = tag
				continue
			}

			if repo.IsOwnedBy(comment.PosterID) ||
				(repo.Owner.IsOrganization() && repo.Owner.IsOwnedBy(comment.PosterID)) {
				comment.ShowTag = models.COMMENT_TAG_OWNER
			} else if comment.Poster.IsWriterOfRepo(repo) {
				comment.ShowTag = models.COMMENT_TAG_WRITER
			} else if comment.PosterID == issue.PosterID {
				comment.ShowTag = models.COMMENT_TAG_POSTER
			}

			marked[comment.PosterID] = comment.ShowTag

			isAdded := false
			for j := range participants {
				if comment.Poster == participants[j] {
					isAdded = true
					break
				}
			}
			if !isAdded && !issue.IsPoster(comment.Poster.ID) {
				participants = append(participants, comment.Poster)
			}
		}

		if comment.Type == models.COMMENT_TYPE_ASSIGN {
			u, err := models.GetUserByID(comment.AssigneeId)
			if err == nil {
				issue.Comments[j].AssigneeName = u.Name
				issue.Comments[j].AssigneeAvatar = u.AvatarLink()
				issue.Comments[j].AssigneeLink = u.HomeLink()
			}
		}
	}

	if issue.IsPull && issue.PullRequest.HasMerged {
		pull := issue.PullRequest
		ctx.Data["IsPullBranchDeletable"] = pull.BaseRepoID == pull.HeadRepoID &&
			ctx.Repo.IsWriter() && ctx.Repo.GitRepo.IsBranchExist(pull.HeadBranch)

		deleteBranchUrl := ctx.Repo.RepoLink + "/branches/delete/" + pull.HeadBranch
		ctx.Data["DeleteBranchLink"] = fmt.Sprintf("%s?commit=%s&redirect_to=%s", deleteBranchUrl, pull.MergedCommitID, ctx.Data["Link"])
	}

	ctx.Data["Participants"] = participants
	ctx.Data["NumParticipants"] = len(participants)
	ctx.Data["Issue"] = issue
	ctx.Data["IsIssueOwner"] = ctx.Repo.IsWriter() || (ctx.IsSigned && issue.IsPoster(ctx.User.ID))
	ctx.Data["SignInLink"] = setting.AppSubUrl + "/user/login?redirect_to=" + ctx.Data["Link"].(string)
	ctx.Data["IssueImportanceState"] = []string{"有空看看", "紧急", "十分紧急", "十万火急"}
	ctx.HTML(200, ISSUE_VIEW)
}

func ViewIssue(ctx *context.Context) {
	viewIssue(ctx, false)
}

func ViewPull(ctx *context.Context) {
	viewIssue(ctx, true)
}

func getActionIssue(ctx *context.Context) *models.Issue {
	issue, err := models.GetIssueByIndex(ctx.Repo.Repository.ID, ctx.ParamsInt64(":index"))
	if err != nil {
		fmt.Println(err)
		ctx.NotFoundOrServerError("GetIssueByIndex", errors.IsIssueNotExist, err)
		return nil
	}

	// Prevent guests accessing pull requests
	if !ctx.Repo.HasAccess() && issue.IsPull {
		fmt.Println("ctx Not Found")
		ctx.NotFound()
		return nil
	}
	return issue
}

func UpdateIssueTitle(ctx *context.Context) {
	issue := getActionIssue(ctx)
	if ctx.Written() {
		return
	}

	if !ctx.IsSigned || (!issue.IsPoster(ctx.User.ID) && !ctx.Repo.IsWriter()) {
		ctx.Error(403)
		return
	}

	title := ctx.QueryTrim("title")
	if len(title) == 0 {
		ctx.Error(204)
		return
	}

	if err := issue.ChangeTitle(ctx.User, title); err != nil {
		ctx.Handle(500, "ChangeTitle", err)
		return
	}

	ctx.JSON(200, map[string]interface{}{
		"title": issue.Title,
	})
}

func UpdateIssueContent(ctx *context.Context) {
	issue := getActionIssue(ctx)
	if ctx.Written() {
		return
	}

	if !ctx.IsSigned || (ctx.User.ID != issue.PosterID && !ctx.Repo.IsWriter()) {
		ctx.Error(403)
		return
	}

	content := ctx.Query("content")
	if err := issue.ChangeContent(ctx.User, content); err != nil {
		ctx.Handle(500, "ChangeContent", err)
		return
	}

	ctx.JSON(200, map[string]interface{}{
		"content": string([]byte(issue.Content)),
	})
}

func UpdateIssueLabel(ctx *context.Context) {
	issue := getActionIssue(ctx)
	if ctx.Written() {
		return
	}

	if ctx.Query("action") == "clear" {
		if err := issue.ClearLabels(ctx.User); err != nil {
			ctx.Handle(500, "ClearLabels: ", err)
			return
		}

		if err := models.CreateLabelComment(ctx.User, ctx.Repo.Repository, issue, -1, 0); err != nil {
			ctx.Handle(500, "ClearLabels: ", err)
			return
		}

	} else {
		isAttach := ctx.Query("action") == "attach"
		label, err := models.GetLabelOfRepoByID(ctx.Repo.Repository.ID, ctx.QueryInt64("id"))
		if err != nil {
			if models.IsErrLabelNotExist(err) {
				ctx.Error(404, "GetLabelByID")
			} else {
				ctx.Handle(500, "GetLabelByID", err)
			}
			return
		}

		if isAttach && !issue.HasLabel(label.ID) {
			if err = issue.AddLabel(ctx.User, label); err != nil {
				ctx.Handle(500, "AddLabel", err)
				return
			}

			if err := models.CreateLabelComment(ctx.User, ctx.Repo.Repository, issue, label.ID, 1); err != nil {
				ctx.Handle(500, "ClearLabels: ", err)
				return
			}

		} else if !isAttach && issue.HasLabel(label.ID) {
			if err = issue.RemoveLabel(ctx.User, label); err != nil {
				ctx.Handle(500, "RemoveLabel", err)
				return
			}

			if err := models.CreateLabelComment(ctx.User, ctx.Repo.Repository, issue, label.ID, -1); err != nil {
				ctx.Handle(500, "ClearLabels: ", err)
				return
			}
		}
	}

	ctx.JSON(200, map[string]interface{}{
		"ok": true,
	})
}

func UpdateIssueMilestone(ctx *context.Context) {
	issue := getActionIssue(ctx)
	if ctx.Written() {
		return
	}

	oldMilestoneID := issue.MilestoneID
	milestoneID := ctx.QueryInt64("id")
	if oldMilestoneID == milestoneID {
		ctx.JSON(200, map[string]interface{}{
			"ok": true,
		})
		return
	}

	// Not check for invalid milestone id and give responsibility to owners.
	issue.MilestoneID = milestoneID
	if err := models.ChangeMilestoneAssign(ctx.User, issue, oldMilestoneID); err != nil {
		ctx.Handle(500, "ChangeMilestoneAssign", err)
		return
	}

	if err := models.CreateMilestoneComment(ctx.User, ctx.Repo.Repository, issue, milestoneID); err != nil {
		ctx.Handle(500, "ChangeMilestoneAssign", err)
		return
	}

	ctx.JSON(200, map[string]interface{}{
		"ok": true,
	})
}

func UpdateIssueAssignee(ctx *context.Context) {
	issue := getActionIssue(ctx)
	if ctx.Written() {
		return
	}

	assigneeID := ctx.QueryInt64("id")
	if issue.AssigneeID == assigneeID {
		ctx.JSON(200, map[string]interface{}{
			"ok": true,
		})
		return
	}

	if err := issue.ChangeAssignee(ctx.User, assigneeID); err != nil {
		ctx.Handle(500, "ChangeAssignee", err)
		return
	}

	err := models.CreateAssigneeComment(ctx.User, ctx.Repo.Repository, issue, assigneeID)
	if err != nil {
		ctx.Handle(500, "CreateIssueComment", err)
		return
	}

	ctx.JSON(200, map[string]interface{}{
		"ok": true,
	})
}

func UpdateIssueImportance(ctx *context.Context) {
	fmt.Println("Update Issue Importance")
	issue := getActionIssue(ctx)
	if ctx.Written() {
		return
	}

	importanceID := ctx.QueryInt64("id")
	if int64(issue.Importance) == importanceID {
		ctx.JSON(200, map[string]interface{}{
			"ok": true,
		})
		return
	}

	if err := issue.ChangeImportance(ctx.User, int8(importanceID)); err != nil {
		ctx.Handle(500, "ChangeAssignee: ", err)
		return
	}

	if err := models.CreateImportanceComment(ctx.User, ctx.Repo.Repository, issue, int8(importanceID)); err != nil {
		ctx.Handle(500, "CreateImportanceComment: ", err)
		return
	}

	ctx.JSON(200, map[string]interface{}{
		"ok": true,
	})

}

func NewComment(ctx *context.Context, f form.CreateComment) {
	fmt.Println("NewComment:")
	issue := getActionIssue(ctx)
	if ctx.Written() {
		fmt.Println("ctx Written true return")
		return
	}

	var attachments []string
	if setting.AttachmentEnabled {
		attachments = f.Files
	}

	if ctx.HasError() {
		ctx.Flash.Error(ctx.Data["ErrorMsg"].(string))
		ctx.Redirect(fmt.Sprintf("%s/issues/%d", ctx.Repo.RepoLink, issue.Index))
		return
	}

	var err error
	var comment *models.Comment
	defer func() {
		// Check if issue admin/poster changes the status of issue.
		if (ctx.Repo.IsWriter() || (ctx.IsSigned && issue.IsPoster(ctx.User.ID))) &&
			(f.Status == "reopen" || f.Status == "close" || f.Status == "fix") &&
			!(issue.IsPull && issue.PullRequest.HasMerged) {
			// Duplication and conflict check should apply to reopen pull request.
			var pr *models.PullRequest

			if f.Status == "reopen" && issue.IsPull {
				pull := issue.PullRequest
				pr, err = models.GetUnmergedPullRequest(pull.HeadRepoID, pull.BaseRepoID, pull.HeadBranch, pull.BaseBranch)
				if err != nil {
					if !models.IsErrPullRequestNotExist(err) {
						ctx.Handle(500, "GetUnmergedPullRequest", err)
						return
					}
				}

				// Regenerate patch and test conflict.
				if pr == nil {
					if err = issue.PullRequest.UpdatePatch(); err != nil {
						ctx.Handle(500, "UpdatePatch", err)
						return
					}

					issue.PullRequest.AddToTaskQueue()
				}
			}

			if pr != nil {
				ctx.Flash.Info(ctx.Tr("repo.pulls.open_unmerged_pull_exists", pr.Index))
			} else {
				if err = issue.ChangeStatus(ctx.User, ctx.Repo.Repository, f.Status); err != nil {
					log.Error(4, "ChangeStatus: %v", err)
				} else {
					log.Trace("Issue [%d] status changed to closed: %v", issue.ID, issue.IsClosed)
				}
			}
		}

		// Redirect to comment hashtag if there is any actual content.
		typeName := "issues"
		if issue.IsPull {
			typeName = "pulls"
		}
		if comment != nil {
			ctx.Redirect(fmt.Sprintf("%s/%s/%d#%s", ctx.Repo.RepoLink, typeName, issue.Index, comment.HashTag()))
		} else {
			ctx.Redirect(fmt.Sprintf("%s/%s/%d", ctx.Repo.RepoLink, typeName, issue.Index))
		}
	}()

	// Fix #321: Allow empty comments, as long as we have attachments.
	if len(f.Content) == 0 && len(attachments) == 0 {
		return
	}

	comment, err = models.CreateIssueComment(ctx.User, ctx.Repo.Repository, issue, f.Content, attachments)
	if err != nil {
		ctx.Handle(500, "CreateIssueComment", err)
	}

	log.Trace("Comment created: %d/%d/%d", ctx.Repo.Repository.ID, issue.ID, comment.ID)
}

func UpdateCommentContent(ctx *context.Context) {
	fmt.Println("UpdateCommentcontent")
	comment, err := models.GetCommentByID(ctx.ParamsInt64(":id"))
	if err != nil {
		ctx.NotFoundOrServerError("GetCommentByID", models.IsErrCommentNotExist, err)
		return
	}

	if ctx.UserID() != comment.PosterID && !ctx.Repo.IsAdmin() {
		ctx.Error(404)
		return
	} else if comment.Type != models.COMMENT_TYPE_COMMENT {
		ctx.Error(204)
		return
	}

	oldContent := comment.Content
	comment.Content = ctx.Query("content")
	fmt.Println(comment.Content)
	if len(comment.Content) == 0 {
		ctx.JSON(200, map[string]interface{}{
			"content": "",
		})
		return
	}
	if err = models.UpdateComment(ctx.User, comment, oldContent); err != nil {
		ctx.Handle(500, "UpdateComment", err)
		return
	}

	ctx.JSON(200, map[string]interface{}{
		"content": string([]byte(comment.Content)),
	})
}

func DeleteComment(ctx *context.Context) {
	comment, err := models.GetCommentByID(ctx.ParamsInt64(":id"))
	if err != nil {
		ctx.NotFoundOrServerError("GetCommentByID", models.IsErrCommentNotExist, err)
		return
	}

	if ctx.UserID() != comment.PosterID && !ctx.Repo.IsAdmin() {
		ctx.Error(404)
		return
	} else if comment.Type != models.COMMENT_TYPE_COMMENT {
		ctx.Error(204)
		return
	}

	if err = models.DeleteCommentByID(ctx.User, comment.ID); err != nil {
		ctx.Handle(500, "DeleteCommentByID", err)
		return
	}

	ctx.Status(200)
}

func Labels(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("repo.labels")
	ctx.Data["PageIsIssueList"] = true
	ctx.Data["PageIsLabels"] = true
	ctx.Data["RequireMinicolors"] = true
	ctx.Data["LabelTemplates"] = models.LabelTemplates
	ctx.HTML(200, LABELS)
}

func InitializeLabels(ctx *context.Context, f form.InitializeLabels) {
	if ctx.HasError() {
		ctx.Redirect(ctx.Repo.RepoLink + "/labels")
		return
	}
	list, err := models.GetLabelTemplateFile(f.TemplateName)
	if err != nil {
		ctx.Flash.Error(ctx.Tr("repo.issues.label_templates.fail_to_load_file", f.TemplateName, err))
		ctx.Redirect(ctx.Repo.RepoLink + "/labels")
		return
	}

	labels := make([]*models.Label, len(list))
	for i := 0; i < len(list); i++ {
		labels[i] = &models.Label{
			RepoID: ctx.Repo.Repository.ID,
			Name:   list[i][0],
			Color:  list[i][1],
		}
	}
	if err := models.NewLabels(labels...); err != nil {
		ctx.Handle(500, "NewLabels", err)
		return
	}
	ctx.Redirect(ctx.Repo.RepoLink + "/labels")
}

func NewLabel(ctx *context.Context, f form.CreateLabel) {
	ctx.Data["Title"] = ctx.Tr("repo.labels")
	ctx.Data["PageIsLabels"] = true

	if ctx.HasError() {
		ctx.Flash.Error(ctx.Data["ErrorMsg"].(string))
		ctx.Redirect(ctx.Repo.RepoLink + "/labels")
		return
	}

	l := &models.Label{
		RepoID: ctx.Repo.Repository.ID,
		Name:   f.Title,
		Color:  f.Color,
	}
	if err := models.NewLabels(l); err != nil {
		ctx.Handle(500, "NewLabel", err)
		return
	}
	ctx.Redirect(ctx.Repo.RepoLink + "/labels")
}

func UpdateLabel(ctx *context.Context, f form.CreateLabel) {
	l, err := models.GetLabelByID(f.ID)
	if err != nil {
		switch {
		case models.IsErrLabelNotExist(err):
			ctx.Error(404)
		default:
			ctx.Handle(500, "UpdateLabel", err)
		}
		return
	}

	l.Name = f.Title
	l.Color = f.Color
	if err := models.UpdateLabel(l); err != nil {
		ctx.Handle(500, "UpdateLabel", err)
		return
	}
	ctx.Redirect(ctx.Repo.RepoLink + "/labels")
}

func DeleteLabel(ctx *context.Context) {
	if err := models.DeleteLabel(ctx.Repo.Repository.ID, ctx.QueryInt64("id")); err != nil {
		ctx.Flash.Error("DeleteLabel: " + err.Error())
	} else {
		ctx.Flash.Success(ctx.Tr("repo.issues.label_deletion_success"))
	}

	ctx.JSON(200, map[string]interface{}{
		"redirect": ctx.Repo.RepoLink + "/labels",
	})
	return
}

func Milestones(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("repo.milestones")
	ctx.Data["PageIsIssueList"] = true
	ctx.Data["PageIsMilestones"] = true

	var show int8
	isShowClosed := ctx.Query("state")
	openCount, closedCount, fixcount := models.MilestoneStats(ctx.Repo.Repository.ID)
	ctx.Data["OpenCount"] = openCount
	ctx.Data["ClosedCount"] = closedCount
	ctx.Data["FixCount"] = fixcount
	page := ctx.QueryInt("page")
	if page <= 1 {
		page = 1
	}

	var total int
	if isShowClosed == "closed" {
		total = int(closedCount)
		show = 1
	} else if isShowClosed == "fix" {
		total = int(fixcount)
		show = 2
	} else {
		total = int(openCount)
		show = 0
	}
	ctx.Data["Page"] = paginater.New(total, setting.UI.IssuePagingNum, page, 5)

	miles, err := models.GetMilestones(ctx.Repo.Repository.ID, page, show)
	if err != nil {
		ctx.Handle(500, "GetMilestones", err)
		return
	}

	for _, m := range miles {
		u, err := models.GetMilestonesUser(m.Uid)
		if err != nil {
			fmt.Println(err)
			return
		}
		m.UserName = u.Name
		m.RelAvatarLink = u.RelAvatarLink()
		m.HomeLink = u.HomeLink()

		m.CreateTimeFor = time.Unix(m.CreateTime, 0).Local()
		if m.CreateTimeFor.Year() == 9999 {
			return
		}

		m.NumOpenIssues = int(m.CountIssues(0, false))
		m.NumClosedIssues = int(m.CountIssues(1, false))
		m.NumFixIssues = int(m.CountIssues(2, false))
		if m.NumOpenIssues+m.NumClosedIssues+m.NumFixIssues > 0 {
			m.Completeness = m.NumFixIssues * 100 / (m.NumOpenIssues + m.NumClosedIssues + m.NumFixIssues)
		}
		m.RenderedContent = string([]byte(m.Content))
	}
	ctx.Data["Milestones"] = miles

	if show == 1 {
		ctx.Data["State"] = "closed"
	} else if show == 0 {
		ctx.Data["State"] = "open"
	} else {
		ctx.Data["State"] = "fix"
	}

	ctx.Data["IsShowClosed"] = show
	ctx.HTML(200, MILESTONE)
}

func NewMilestone(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("repo.milestones.new")
	ctx.Data["PageIsIssueList"] = true
	ctx.Data["PageIsMilestones"] = true
	ctx.Data["RequireDatetimepicker"] = true
	ctx.Data["DateLang"] = setting.DateLang(ctx.Locale.Language())
	ctx.HTML(200, MILESTONE_NEW)
}

func NewMilestonePost(ctx *context.Context, f form.CreateMilestone) {
	ctx.Data["Title"] = ctx.Tr("repo.milestones.new")
	ctx.Data["PageIsIssueList"] = true
	ctx.Data["PageIsMilestones"] = true
	ctx.Data["RequireDatetimepicker"] = true
	ctx.Data["DateLang"] = setting.DateLang(ctx.Locale.Language())

	if ctx.HasError() {
		ctx.HTML(200, MILESTONE_NEW)
		return
	}

	if len(f.Deadline) == 0 {
		f.Deadline = "9999-12-31"
	}
	deadline, err := time.ParseInLocation("2006-01-02", f.Deadline, time.Local)
	if err != nil {
		ctx.Data["Err_Deadline"] = true
		ctx.RenderWithErr(ctx.Tr("repo.milestones.invalid_due_date_format"), MILESTONE_NEW, &f)
		return
	}

	if err = models.NewMilestone(&models.Milestone{
		RepoID:     ctx.Repo.Repository.ID,
		Name:       f.Title,
		Content:    f.Content,
		Deadline:   deadline,
		Uid:        ctx.User.ID,
		CreateTime: time.Now().Unix(),
	}); err != nil {
		ctx.Handle(500, "NewMilestone", err)
		return
	}

	ctx.Flash.Success(ctx.Tr("repo.milestones.create_success", f.Title))
	ctx.Redirect(ctx.Repo.RepoLink + "/milestones")
}

func EditMilestone(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("repo.milestones.edit")
	ctx.Data["PageIsMilestones"] = true
	ctx.Data["PageIsEditMilestone"] = true
	ctx.Data["RequireDatetimepicker"] = true
	ctx.Data["DateLang"] = setting.DateLang(ctx.Locale.Language())

	m, err := models.GetMilestoneByRepoID(ctx.Repo.Repository.ID, ctx.ParamsInt64(":id"))
	if err != nil {
		if models.IsErrMilestoneNotExist(err) {
			ctx.Handle(404, "", nil)
		} else {
			ctx.Handle(500, "GetMilestoneByRepoID", err)
		}
		return
	}
	ctx.Data["title"] = m.Name
	ctx.Data["content"] = m.Content
	if len(m.DeadlineString) > 0 {
		ctx.Data["deadline"] = m.DeadlineString
	}
	ctx.HTML(200, MILESTONE_NEW)
}

func EditMilestonePost(ctx *context.Context, f form.CreateMilestone) {
	ctx.Data["Title"] = ctx.Tr("repo.milestones.edit")
	ctx.Data["PageIsMilestones"] = true
	ctx.Data["PageIsEditMilestone"] = true
	ctx.Data["RequireDatetimepicker"] = true
	ctx.Data["DateLang"] = setting.DateLang(ctx.Locale.Language())

	if ctx.HasError() {
		ctx.HTML(200, MILESTONE_NEW)
		return
	}

	if len(f.Deadline) == 0 {
		f.Deadline = "9999-12-31"
	}
	deadline, err := time.ParseInLocation("2006-01-02", f.Deadline, time.Local)
	if err != nil {
		ctx.Data["Err_Deadline"] = true
		ctx.RenderWithErr(ctx.Tr("repo.milestones.invalid_due_date_format"), MILESTONE_NEW, &f)
		return
	}

	m, err := models.GetMilestoneByRepoID(ctx.Repo.Repository.ID, ctx.ParamsInt64(":id"))
	if err != nil {
		if models.IsErrMilestoneNotExist(err) {
			ctx.Handle(404, "", nil)
		} else {
			ctx.Handle(500, "GetMilestoneByRepoID", err)
		}
		return
	}
	m.Name = f.Title
	m.Content = f.Content
	m.Deadline = deadline
	if err = models.UpdateMilestone(m); err != nil {
		ctx.Handle(500, "UpdateMilestone", err)
		return
	}

	ctx.Flash.Success(ctx.Tr("repo.milestones.edit_success", m.Name))
	ctx.Redirect(ctx.Repo.RepoLink + "/milestones")
}

func ChangeMilestonStatus(ctx *context.Context) {
	m, err := models.GetMilestoneByRepoID(ctx.Repo.Repository.ID, ctx.ParamsInt64(":id"))
	if err != nil {
		if models.IsErrMilestoneNotExist(err) {
			ctx.Handle(404, "", err)
		} else {
			ctx.Handle(500, "GetMilestoneByRepoID", err)
		}
		return
	}

	switch ctx.Params(":action") {
	case "open":
		if m.IsClosed {
			if err = models.ChangeMilestoneStatus(m, false); err != nil {
				ctx.Handle(500, "ChangeMilestoneStatus", err)
				return
			}
		}
		ctx.Redirect(ctx.Repo.RepoLink + "/milestones?state=open")
	case "close":
		if !m.IsClosed {
			m.ClosedDate = time.Now()
			if err = models.ChangeMilestoneStatus(m, true); err != nil {
				ctx.Handle(500, "ChangeMilestoneStatus", err)
				return
			}
		}
		ctx.Redirect(ctx.Repo.RepoLink + "/milestones?state=closed")
	default:
		ctx.Redirect(ctx.Repo.RepoLink + "/milestones")
	}
}

func DeleteMilestone(ctx *context.Context) {
	if err := models.DeleteMilestoneOfRepoByID(ctx.Repo.Repository.ID, ctx.QueryInt64("id")); err != nil {
		ctx.Flash.Error("DeleteMilestoneByRepoID: " + err.Error())
	} else {
		ctx.Flash.Success(ctx.Tr("repo.milestones.deletion_success"))
	}

	ctx.JSON(200, map[string]interface{}{
		"redirect": ctx.Repo.RepoLink + "/milestones",
	})
}

func DeleteIssue(ctx *context.Context) {
	issue := getActionIssue(ctx)

	err := models.NewDeleteIssueAction(issue.Poster, ctx.User, issue.Repo)
	if err != nil {
		fmt.Println(err)
		return
	}

	err = models.DeleteIssue(issue)
	if err != nil {
		fmt.Println(err)
	}

	ctx.Flash.Success(ctx.Tr("repo.issues.delete_success"))

	ctx.JSON(200, map[string]interface{}{
		"redirect": ctx.Repo.RepoLink + "/issues",
	})
}
