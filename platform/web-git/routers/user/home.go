// Copyright 2014 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package user

import (
	"bytes"
	"fmt"

	"github.com/Unknwon/com"
	"github.com/Unknwon/paginater"

	"github.com/cabernety/boxlinker-git/models"
	"github.com/cabernety/boxlinker-git/models/errors"
	"github.com/cabernety/boxlinker-git/modules/base"
	"github.com/cabernety/boxlinker-git/modules/context"
	"github.com/cabernety/boxlinker-git/modules/setting"

	"strconv"

	log "gopkg.in/clog.v1"
)

const (
	DASHBOARD base.TplName = "user/dashboard/dashboard"
	NEWS_FEED base.TplName = "user/dashboard/feeds"
	ISSUES    base.TplName = "user/dashboard/issues"
	PROFILE   base.TplName = "user/profile"
	ORG_HOME  base.TplName = "org/home"
)

// getDashboardContextUser finds out dashboard is viewing as which context user.
func getDashboardContextUser(ctx *context.Context) *models.User {
	ctxUser := ctx.User
	orgName := ctx.Params(":org")
	if len(orgName) > 0 {
		// Organization.
		org, err := models.GetUserByName(orgName)
		if err != nil {
			ctx.NotFoundOrServerError("GetUserByName", errors.IsUserNotExist, err)
			return nil
		}
		ctxUser = org
	}
	ctx.Data["ContextUser"] = ctxUser

	if err := ctx.User.GetOrganizations(true); err != nil {
		ctx.Handle(500, "GetOrganizations", err)
		return nil
	}
	ctx.Data["Orgs"] = ctx.User.Orgs

	return ctxUser
}

// retrieveFeeds loads feeds from database by given context user.
// The user could be organization so it is not always the logged in user,
// which is why we have to explicitly pass the context user ID.
func retrieveFeeds(ctx *context.Context, ctxUser *models.User, userID int64, isProfile bool) {
	actions, err := models.GetFeeds(ctxUser, userID, ctx.QueryInt64("after_id"), isProfile)
	if err != nil {
		ctx.Handle(500, "GetFeeds", err)
		return
	}
	log.Info("[retrieveFeeds]: ctx ", ctx)
	// Check access of private repositories.
	feeds := make([]*models.Action, 0, len(actions))
	unameAvatars := make(map[string]string)
	for _, act := range actions {
		// Cache results to reduce queries.
		_, ok := unameAvatars[act.ActUserName]
		if !ok {
			u, err := models.GetUserByName(act.ActUserName)
			if err != nil {
				if errors.IsUserNotExist(err) {
					continue
				}
				ctx.Handle(500, "GetUserByName", err)
				return
			}
			unameAvatars[act.ActUserName] = u.RelAvatarLink()
		}

		act.ActAvatar = unameAvatars[act.ActUserName]

		if act.OpType == models.ACTION_ASSIGNEE_ISSUE {
			u, err := models.GetUserByID(act.AssigneeId)
			if err == nil {
				act.AssigneeName = u.Name
				act.AssigneeAvatar = u.AvatarLink()
				act.AssigneeLink = u.HomeLink()
			} else {
				fmt.Println(err)
			}
		} else if act.OpType == models.ACTION_CHANGE_LABEL {
			// Check labels.
			labels, err := models.GetLabelsByRepoID(act.RepoID)
			if err != nil {
				ctx.Handle(500, "GetLabelsByRepoID", err)
				return
			}
			for i := range labels {
				if labels[i].ID == act.Label {
					act.LabelInfo = labels[i]
					break
				}
			}
		} else if act.OpType == models.ACTION_SET_MILESTONE {
			milestone, err := models.GetMilestoneByRepoID(act.RepoID, act.Milestone)
			if err != nil {
				fmt.Println(err)
			} else {
				act.MilestoneInfo = milestone
			}
		}

		feeds = append(feeds, act)
	}

	ctx.Data["Feeds"] = feeds
	if len(feeds) > 0 {
		afterID := feeds[len(feeds)-1].ID
		ctx.Data["AfterID"] = afterID
		ctx.Header().Set("X-AJAX-URL", fmt.Sprintf("%s?after_id=%d", ctx.Data["Link"], afterID))
	}
}

func Dashboard(ctx *context.Context) {
	ctxUser := getDashboardContextUser(ctx)
	if ctx.Written() {
		return
	}

	retrieveFeeds(ctx, ctxUser, ctx.User.ID, false)
	if ctx.Written() {
		return
	}

	if ctx.Req.Header.Get("X-AJAX") == "true" {
		ctx.HTML(200, NEWS_FEED)
		return
	}

	ctx.Data["Title"] = ctxUser.DisplayName() + " - " + ctx.Tr("dashboard")
	ctx.Data["PageIsDashboard"] = true
	ctx.Data["PageIsNews"] = true

	// Only user can have collaborative repositories.
	if !ctxUser.IsOrganization() {
		collaborateRepos, err := ctx.User.GetAccessibleRepositories(setting.UI.User.RepoPagingNum)
		if err != nil {
			ctx.Handle(500, "GetAccessibleRepositories", err)
			return
		} else if err = models.RepositoryList(collaborateRepos).LoadAttributes(); err != nil {
			ctx.Handle(500, "RepositoryList.LoadAttributes", err)
			return
		}
		ctx.Data["CollaborativeRepos"] = collaborateRepos
	}

	var err error
	var repos, mirrors []*models.Repository
	if ctxUser.IsOrganization() {
		repos, _, err = ctxUser.GetUserRepositories(ctx.User.ID, 1, setting.UI.User.RepoPagingNum)
		if err != nil {
			ctx.Handle(500, "GetUserRepositories", err)
			return
		}

		mirrors, err = ctxUser.GetUserMirrorRepositories(ctx.User.ID)
		if err != nil {
			ctx.Handle(500, "GetUserMirrorRepositories", err)
			return
		}
	} else {
		if err = ctxUser.GetRepositories(1, setting.UI.User.RepoPagingNum); err != nil {
			ctx.Handle(500, "GetRepositories", err)
			return
		}
		repos = ctxUser.Repos

		mirrors, err = ctxUser.GetMirrorRepositories()
		if err != nil {
			ctx.Handle(500, "GetMirrorRepositories", err)
			return
		}
	}
	ctx.Data["Repos"] = repos
	ctx.Data["MaxShowRepoNum"] = setting.UI.User.RepoPagingNum

	if err := models.MirrorRepositoryList(mirrors).LoadAttributes(); err != nil {
		ctx.Handle(500, "MirrorRepositoryList.LoadAttributes", err)
		return
	}
	ctx.Data["MirrorCount"] = len(mirrors)
	ctx.Data["Mirrors"] = mirrors

	ctx.HTML(200, DASHBOARD)
}

func Issues(ctx *context.Context) {
	isPullList := ctx.Params(":type") == "pulls"
	if isPullList {
		ctx.Data["Title"] = ctx.Tr("pull_requests")
		ctx.Data["PageIsPulls"] = true
	} else {
		ctx.Data["Title"] = ctx.Tr("issues")
		ctx.Data["PageIsIssues"] = true
	}

	ctxUser := getDashboardContextUser(ctx)
	if ctx.Written() {
		return
	}

	var (
		sortType   = ctx.Query("sort")
		filterMode = models.FILTER_MODE_YOUR_REPOS
	)

	// Note: Organization does not have view type and filter mode.
	if !ctxUser.IsOrganization() {
		viewType := ctx.Query("type")
		types := []string{
			string(models.FILTER_MODE_YOUR_REPOS),
			string(models.FILTER_MODE_ASSIGN),
			string(models.FILTER_MODE_CREATE),
		}
		if !com.IsSliceContainsStr(types, viewType) {
			viewType = string(models.FILTER_MODE_YOUR_REPOS)
		}
		filterMode = models.FilterMode(viewType)
	}

	page := ctx.QueryInt("page")
	if page <= 1 {
		page = 1
	}

	repoID := ctx.QueryInt64("repo")
	isShowClosed := ctx.Query("state")
	var show int8
	if isShowClosed == "open" {
		show = 0
	} else if isShowClosed == "closed" {
		show = 1
	} else if isShowClosed == "fix" {
		show = 2
	}

	// Get repositories.
	var (
		err         error
		repos       []*models.Repository
		userRepoIDs []int64
		showRepos   = make([]*models.Repository, 0, 10)
	)
	if ctxUser.IsOrganization() {
		repos, _, err = ctxUser.GetUserRepositories(ctx.User.ID, 1, ctxUser.NumRepos)
		if err != nil {
			ctx.Handle(500, "GetRepositories", err)
			return
		}
	} else {
		if err := ctxUser.GetRepositories(1, ctx.User.NumRepos); err != nil {
			ctx.Handle(500, "GetRepositories", err)
			return
		}
		repos = ctxUser.Repos
	}

	userRepoIDs = make([]int64, 0, len(repos))
	for _, repo := range repos {
		userRepoIDs = append(userRepoIDs, repo.ID)

		if filterMode != models.FILTER_MODE_YOUR_REPOS {
			continue
		}

		if isPullList {
			if show == 1 && repo.NumClosedPulls == 0 ||
				show == 0 && repo.NumOpenPulls == 0 {
				continue
			}
		} else {
			if !repo.EnableIssues || repo.EnableExternalTracker ||
				show == 1 && repo.NumClosedIssues == 0 ||
				show == 0 && repo.NumOpenIssues == 0 {
				continue
			}
		}

		showRepos = append(showRepos, repo)
	}

	// Filter repositories if the page shows issues.
	if !isPullList {
		userRepoIDs, err = models.FilterRepositoryWithIssues(userRepoIDs)
		if err != nil {
			ctx.Handle(500, "FilterRepositoryWithIssues", err)
			return
		}
	}

	issueOptions := &models.IssuesOptions{
		RepoID:   repoID,
		Page:     page,
		IsClosed: show,
		IsPull:   isPullList,
		SortType: sortType,
	}
	switch filterMode {
	case models.FILTER_MODE_YOUR_REPOS:
		// Get all issues from repositories from this user.
		if userRepoIDs == nil {
			issueOptions.RepoIDs = []int64{-1}
		} else {
			issueOptions.RepoIDs = userRepoIDs
		}

	case models.FILTER_MODE_ASSIGN:
		// Get all issues assigned to this user.
		issueOptions.AssigneeID = ctxUser.ID

	case models.FILTER_MODE_CREATE:
		// Get all issues created by this user.
		issueOptions.PosterID = ctxUser.ID
	}

	issues, err := models.Issues(issueOptions)
	if err != nil {
		ctx.Handle(500, "Issues", err)
		return
	}

	if repoID > 0 {
		repo, err := models.GetRepositoryByID(repoID)
		if err != nil {
			ctx.Handle(500, "GetRepositoryByID", fmt.Errorf("[#%d] %v", repoID, err))
			return
		}

		if err = repo.GetOwner(); err != nil {
			ctx.Handle(500, "GetOwner", fmt.Errorf("[#%d] %v", repoID, err))
			return
		}

		// Check if user has access to given repository.
		if !repo.IsOwnedBy(ctxUser.ID) && !repo.HasAccess(ctxUser.ID) {
			ctx.Handle(404, "Issues", fmt.Errorf("#%d", repoID))
			return
		}
	}

	for _, issue := range issues {
		if err = issue.Repo.GetOwner(); err != nil {
			ctx.Handle(500, "GetOwner", fmt.Errorf("[#%d] %v", issue.RepoID, err))
			return
		}
	}

	issueStats := models.GetUserIssueStats(repoID, ctxUser.ID, userRepoIDs, filterMode, isPullList)

	var total int
	if show == 0 {
		total = int(issueStats.OpenCount)
	} else if show == 1 {
		total = int(issueStats.ClosedCount)
	} else if show == 2 {
		total = int(issueStats.FixCount)
	}

	ctx.Data["Issues"] = issues
	ctx.Data["Repos"] = showRepos
	ctx.Data["Page"] = paginater.New(total, setting.UI.IssuePagingNum, page, 5)
	ctx.Data["IssueStats"] = issueStats
	ctx.Data["ViewType"] = string(filterMode)
	ctx.Data["SortType"] = sortType
	ctx.Data["RepoID"] = repoID
	ctx.Data["IsShowClosed"] = isShowClosed

	if isShowClosed == "closed" {
		ctx.Data["State"] = "closed"
	} else if isShowClosed == "open" {
		ctx.Data["State"] = "open"
	} else if isShowClosed == "fix" {
		ctx.Data["State"] = "fix"
	}

	ctx.HTML(200, ISSUES)
}

func ShowSSHKeys(ctx *context.Context, uid int64) {
	keys, err := models.ListPublicKeys(uid)
	if err != nil {
		ctx.Handle(500, "ListPublicKeys", err)
		return
	}

	var buf bytes.Buffer
	for i := range keys {
		buf.WriteString(keys[i].OmitEmail())
		buf.WriteString("\n")
	}
	ctx.PlainText(200, buf.Bytes())
}

func showOrgProfile(ctx *context.Context) {
	ctx.SetParams(":org", ctx.Params(":username"))
	context.HandleOrgAssignment(ctx)
	if ctx.Written() {
		return
	}

	org := ctx.Org.Organization
	ctx.Data["Title"] = org.FullName

	page := ctx.QueryInt("page")
	if page <= 0 {
		page = 1
	}

	var (
		repos []*models.Repository
		count int64
		err   error
	)
	if ctx.IsSigned && !ctx.User.IsAdmin {
		repos, count, err = org.GetUserRepositories(ctx.User.ID, page, setting.UI.User.RepoPagingNum)
		if err != nil {
			ctx.Handle(500, "GetUserRepositories", err)
			return
		}
		ctx.Data["Repos"] = repos
	} else {
		showPrivate := ctx.IsSigned && ctx.User.IsAdmin
		repos, err = models.GetUserRepositories(&models.UserRepoOptions{
			UserID:   org.ID,
			Private:  showPrivate,
			Page:     page,
			PageSize: setting.UI.User.RepoPagingNum,
		})
		if err != nil {
			ctx.Handle(500, "GetRepositories", err)
			return
		}
		ctx.Data["Repos"] = repos
		count = models.CountUserRepositories(org.ID, showPrivate)
	}
	ctx.Data["Page"] = paginater.New(int(count), setting.UI.User.RepoPagingNum, page, 5)

	if err := org.GetMembers(); err != nil {
		ctx.Handle(500, "GetMembers", err)
		return
	}
	ctx.Data["Members"] = org.Members

	ctx.Data["Teams"] = org.Teams

	ctx.HTML(200, ORG_HOME)
}

func Email2User(ctx *context.Context) {
	u, err := models.GetUserByEmail(ctx.Query("email"))
	if err != nil {
		ctx.NotFoundOrServerError("GetUserByEmail", errors.IsUserNotExist, err)
		return
	}
	ctx.Redirect(setting.AppSubUrl + "/user/" + u.Name)
}

func GetActionWithTime(ctx *context.Context) {
	var pulltime int
	timestr := ctx.Req.Form["PullTime"]
	if len(timestr) == 1 && timestr[0] != "" {
		var err error
		pulltime, err = strconv.Atoi(timestr[0])
		if err != nil {
			return
		}
	} else {
		return
	}

	ctxUser := getDashboardContextUser(ctx)
	if ctx.Written() {
		return
	}
	getFeedsWithTime(ctx, ctxUser, ctx.User.ID, int64(pulltime))
	if ctx.Written() {
		return
	}
}

func getFeedsWithTime(ctx *context.Context, ctxUser *models.User, userID int64, begin int64) {
	actions, err := models.GetActionWithTime(ctxUser, userID, begin)
	if err != nil {
		ctx.Handle(500, "GetFeeds", err)
		return
	}
	fmt.Println("Actions size is", len(actions))

	feeds := make([]*models.Action, 0, len(actions))
	unameAvatars := make(map[string]string)
	for _, act := range actions {
		fmt.Println(act)
		_, ok := unameAvatars[act.ActUserName]
		if !ok {
			u, err := models.GetUserByName(act.ActUserName)
			if err != nil {
				if errors.IsUserNotExist(err) {
					continue
				}
				ctx.Handle(500, "GetUserByName", err)
				return
			}
			unameAvatars[act.ActUserName] = u.RelAvatarLink()
		}

		act.ActAvatar = unameAvatars[act.ActUserName]

		if act.OpType == models.ACTION_ASSIGNEE_ISSUE {
			u, err := models.GetUserByID(act.AssigneeId)
			if err == nil {
				act.AssigneeName = u.Name
				act.AssigneeAvatar = u.AvatarLink()
				act.AssigneeLink = u.HomeLink()
			} else {
				fmt.Println(err)
			}
		} else if act.OpType == models.ACTION_CHANGE_LABEL {
			// Check labels.
			labels, err := models.GetLabelsByRepoID(act.RepoID)
			if err != nil {
				ctx.Handle(500, "GetLabelsByRepoID", err)
				return
			}
			for i := range labels {
				if labels[i].ID == act.Label {
					act.LabelInfo = labels[i]
					break
				}
			}
		} else if act.OpType == models.ACTION_SET_MILESTONE {
			milestone, err := models.GetMilestoneByRepoID(act.RepoID, act.Milestone)
			if err != nil {
				fmt.Println(err)
			} else {
				act.MilestoneInfo = milestone
			}
		}

		feeds = append(feeds, act)
	}
	ctx.JSON(200, feeds)
	ctx.Data["Feeds"] = feeds
}
