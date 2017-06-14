// Copyright 2014 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package routers

import (
	"github.com/Unknwon/paginater"

	"fmt"

	"github.com/cabernety/boxlinker-git/models"
	"github.com/cabernety/boxlinker-git/modules/base"
	"github.com/cabernety/boxlinker-git/modules/context"
	"github.com/cabernety/boxlinker-git/modules/setting"
	"github.com/cabernety/boxlinker-git/routers/user"
)

const (
	HOME                  base.TplName = "home"
	EXPLORE_REPOS         base.TplName = "explore/repos"
	EXPLORE_USERS         base.TplName = "explore/users"
	EXPLORE_ORGANIZATIONS base.TplName = "explore/organizations"
)

func Home(ctx *context.Context) {
	fmt.Println("HOME")
	if ctx.IsSigned {
		if !ctx.User.IsActive && setting.Service.RegisterEmailConfirm {
			ctx.Data["Title"] = ctx.Tr("auth.active_your_account")
			ctx.HTML(200, user.ACTIVATE)
		} else {
			issueStats := models.GetIssueByAssignee(ctx.User.ID)
			page := ctx.QueryInt("page")
			if page <= 1 {
				page = 1
			}
			pager := paginater.New(int(issueStats.OpenCount), setting.UI.IssuePagingNum, page, 5)
			ctx.Data["Page"] = pager
			OpenIssues, _ := models.Issues(&models.IssuesOptions{
				AssigneeID: ctx.User.ID,
				Page:       pager.Current(),
				IsClosed:   0,
				IsMention:  false,
				IsPull:     false,
				Labels:     ctx.Query("labels"),
				SortType:   ctx.Query("sort"),
			})
			for index, _ := range OpenIssues {
				var err error
				OpenIssues[index].RepoName, err = models.GetRepoName(OpenIssues[index].RepoID)
				if err != nil {
					fmt.Println(err)
				}
			}

			ctx.Data["IssueImportanceState"] = []string{"有空看看", "紧急", "十分紧急", "十万火急"}
			ctx.Data["OpenIssue"] = OpenIssues
			user.Dashboard(ctx)
		}
		return
	}

	// Check auto-login.
	uname := ctx.GetCookie(setting.CookieUserName)
	if len(uname) != 0 {
		ctx.Redirect(setting.AppSubUrl + "/user/login")
		return
	}

	ctx.Data["PageIsHome"] = true
	ctx.HTML(200, HOME)
}

func ExploreRepos(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("explore")
	ctx.Data["PageIsExplore"] = true
	ctx.Data["PageIsExploreRepositories"] = true

	page := ctx.QueryInt("page")
	if page <= 0 {
		page = 1
	}

	keyword := ctx.Query("q")
	repos, count, err := models.SearchRepositoryByName(&models.SearchRepoOptions{
		Keyword:  keyword,
		UserID:   ctx.UserID(),
		OrderBy:  "updated_unix DESC",
		Page:     page,
		PageSize: setting.UI.ExplorePagingNum,
	})
	if err != nil {
		ctx.Handle(500, "SearchRepositoryByName", err)
		return
	}
	ctx.Data["Keyword"] = keyword
	ctx.Data["Total"] = count
	ctx.Data["Page"] = paginater.New(int(count), setting.UI.ExplorePagingNum, page, 5)

	if err = models.RepositoryList(repos).LoadAttributes(); err != nil {
		ctx.Handle(500, "LoadAttributes", err)
		return
	}
	ctx.Data["Repos"] = repos

	ctx.HTML(200, EXPLORE_REPOS)
}

type UserSearchOptions struct {
	Type     models.UserType
	Counter  func() int64
	Ranger   func(int, int) ([]*models.User, error)
	PageSize int
	OrderBy  string
	TplName  base.TplName
}

func RenderUserSearch(ctx *context.Context, opts *UserSearchOptions) {
	page := ctx.QueryInt("page")
	if page <= 1 {
		page = 1
	}

	var (
		users []*models.User
		count int64
		err   error
	)

	keyword := ctx.Query("q")
	if len(keyword) == 0 {
		users, err = opts.Ranger(page, opts.PageSize)
		if err != nil {
			ctx.Handle(500, "opts.Ranger", err)
			return
		}
		count = opts.Counter()
	} else {
		users, count, err = models.SearchUserByName(&models.SearchUserOptions{
			Keyword:  keyword,
			Type:     opts.Type,
			OrderBy:  opts.OrderBy,
			Page:     page,
			PageSize: opts.PageSize,
		})
		if err != nil {
			ctx.Handle(500, "SearchUserByName", err)
			return
		}
	}
	ctx.Data["Keyword"] = keyword
	ctx.Data["Total"] = count
	ctx.Data["Page"] = paginater.New(int(count), opts.PageSize, page, 5)
	ctx.Data["Users"] = users

	ctx.HTML(200, opts.TplName)
}

func ExploreUsers(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("explore")
	ctx.Data["PageIsExplore"] = true
	ctx.Data["PageIsExploreUsers"] = true

	RenderUserSearch(ctx, &UserSearchOptions{
		Type:     models.USER_TYPE_INDIVIDUAL,
		Counter:  models.CountUsers,
		Ranger:   models.Users,
		PageSize: setting.UI.ExplorePagingNum,
		OrderBy:  "updated_unix DESC",
		TplName:  EXPLORE_USERS,
	})
}

func ExploreOrganizations(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("explore")
	ctx.Data["PageIsExplore"] = true
	ctx.Data["PageIsExploreOrganizations"] = true

	RenderUserSearch(ctx, &UserSearchOptions{
		Type:     models.USER_TYPE_ORGANIZATION,
		Counter:  models.CountOrganizations,
		Ranger:   models.Organizations,
		PageSize: setting.UI.ExplorePagingNum,
		OrderBy:  "updated_unix DESC",
		TplName:  EXPLORE_ORGANIZATIONS,
	})
}

func NotFound(ctx *context.Context) {
	ctx.Data["Title"] = "Page Not Found"
	ctx.Handle(404, "home.NotFound", nil)
}
