// Copyright 2014 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package repo

import (
	"net/url"

	"github.com/Unknwon/com"
	"github.com/Unknwon/paginater"

	"github.com/cabernety/boxlinker-git/models"
	"github.com/cabernety/boxlinker-git/modules/base"
	"github.com/cabernety/boxlinker-git/modules/context"
	"github.com/cabernety/boxlinker-git/modules/setting"
)

const (
	PROJECT base.TplName = "repo/project"
)

func Project(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("repo.project")
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

	repo := ctx.Repo.Repository
	selectLabels := ctx.Query("labels")
	milestoneID := ctx.QueryInt64("milestone")

	issueStats := models.GetIssueStats(&models.IssueStatsOptions{
		RepoID:      repo.ID,
		UserID:      uid,
		Labels:      selectLabels,
		MilestoneID: milestoneID,
		AssigneeID:  assigneeID,
		FilterMode:  filterMode,
		IsPull:      false,
	})
	ctx.Data["IssueStats"] = issueStats
	ctx.Data["OpenIssue"] = float32(issueStats.OpenCount) * 100 / float32(issueStats.OpenCount+issueStats.ClosedCount+issueStats.FixCount)
	ctx.Data["CloseIssue"] = float32(issueStats.ClosedCount) * 100 / float32(issueStats.OpenCount+issueStats.ClosedCount+issueStats.FixCount)
	ctx.Data["FixIssue"] = float32(issueStats.FixCount) * 100 / float32(issueStats.OpenCount+issueStats.ClosedCount+issueStats.FixCount)

	openCount, closedCount, _ := models.MilestoneStats(ctx.Repo.Repository.ID)
	ctx.Data["OpenCount"] = openCount
	ctx.Data["ClosedCount"] = closedCount

	ctx.Data["OpenCountPercent"] = float32(openCount) * 100 / float32(openCount+closedCount)
	ctx.Data["ClosedCountPercent"] = float32(closedCount) * 100 / float32(openCount+closedCount)

	page := ctx.QueryInt("page")
	if page <= 1 {
		page = 1
	}

	pager := paginater.New(int(issueStats.OpenCount), setting.UI.IssuePagingNum, page, 5)
	ctx.Data["Page"] = pager
	FixIssues, err := models.Issues(&models.IssuesOptions{
		UserID:      uid,
		AssigneeID:  assigneeID,
		RepoID:      repo.ID,
		PosterID:    posterID,
		MilestoneID: milestoneID,
		Page:        pager.Current(),
		IsClosed:    0,
		IsMention:   filterMode == models.FILTER_MODE_MENTION,
		IsPull:      false,
		Labels:      selectLabels,
		SortType:    sortType,
	})

	closepager := paginater.New(int(issueStats.ClosedCount), setting.UI.IssuePagingNum, page, 5)
	ctx.Data["ClosePage"] = closepager
	UnFixIssues, err := models.Issues(&models.IssuesOptions{
		UserID:      uid,
		AssigneeID:  assigneeID,
		RepoID:      repo.ID,
		PosterID:    posterID,
		MilestoneID: milestoneID,
		Page:        closepager.Current(),
		IsClosed:    1,
		IsMention:   filterMode == models.FILTER_MODE_MENTION,
		IsPull:      false,
		Labels:      selectLabels,
		SortType:    sortType,
	})

	if err != nil {
		ctx.Handle(500, "Issues", err)
		return
	}

	ctx.Data["OpenIssues"] = FixIssues
	ctx.Data["CloseIssues"] = UnFixIssues
	ctx.HTML(200, PROJECT)
}
