// Copyright 2014 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package repo

import (
	"path"

	log "gopkg.in/clog.v1"

	api "github.com/gogits/go-gogs-client"

	"github.com/cabernety/boxlinker-git/models"
	"github.com/cabernety/boxlinker-git/models/errors"
	"github.com/cabernety/boxlinker-git/modules/context"
	"github.com/cabernety/boxlinker-git/modules/form"
	"github.com/cabernety/boxlinker-git/modules/setting"
	"github.com/cabernety/boxlinker-git/routers/api/v1/convert"
)

// https://github.com/gogits/go-gogs-client/wiki/Repositories#search-repositories
func Search(ctx *context.APIContext) {
	opts := &models.SearchRepoOptions{
		Keyword:  path.Base(ctx.Query("q")),
		OwnerID:  ctx.QueryInt64("uid"),
		PageSize: convert.ToCorrectPageSize(ctx.QueryInt("limit")),
	}

	// Check visibility.
	if ctx.IsSigned && opts.OwnerID > 0 {
		if ctx.User.ID == opts.OwnerID {
			opts.Private = true
		} else {
			u, err := models.GetUserByID(opts.OwnerID)
			if err != nil {
				ctx.JSON(500, map[string]interface{}{
					"ok":    false,
					"error": err.Error(),
				})
				return
			}
			if u.IsOrganization() && u.IsOwnedBy(ctx.User.ID) {
				opts.Private = true
			}
			// FIXME: how about collaborators?
		}
	}

	repos, count, err := models.SearchRepositoryByName(opts)
	if err != nil {
		ctx.JSON(500, map[string]interface{}{
			"ok":    false,
			"error": err.Error(),
		})
		return
	}

	results := make([]*api.Repository, len(repos))
	for i := range repos {
		if err = repos[i].GetOwner(); err != nil {
			ctx.JSON(500, map[string]interface{}{
				"ok":    false,
				"error": err.Error(),
			})
			return
		}
		results[i] = &api.Repository{
			ID:       repos[i].ID,
			FullName: path.Join(repos[i].Owner.Name, repos[i].Name),
		}
	}

	ctx.SetLinkHeader(int(count), setting.API.MaxResponseItems)
	ctx.JSON(200, map[string]interface{}{
		"ok":   true,
		"data": results,
	})
}

func listUserRepositories(ctx *context.APIContext, username string) {
	user, err := models.GetUserByName(username)
	if err != nil {
		ctx.NotFoundOrServerError("GetUserByName", errors.IsUserNotExist, err)
		return
	}

	// Only list public repositories if user requests someone else's repository list,
	// or an organization isn't a member of.
	var ownRepos []*models.Repository
	if user.IsOrganization() {
		ownRepos, _, err = user.GetUserRepositories(ctx.User.ID, 1, user.NumRepos)
	} else {
		ownRepos, err = models.GetUserRepositories(&models.UserRepoOptions{
			UserID:   user.ID,
			Private:  ctx.User.ID == user.ID,
			Page:     1,
			PageSize: user.NumRepos,
		})
	}
	if err != nil {
		ctx.Error(500, "GetUserRepositories", err)
		return
	}

	if ctx.User.ID != user.ID {
		repos := make([]*api.Repository, len(ownRepos))
		for i := range ownRepos {
			repos[i] = ownRepos[i].APIFormat(&api.Permission{true, true, true})
		}
		ctx.JSON(200, &repos)
		return
	}

	accessibleRepos, err := user.GetRepositoryAccesses()
	if err != nil {
		ctx.Error(500, "GetRepositoryAccesses", err)
		return
	}

	numOwnRepos := len(ownRepos)
	repos := make([]*api.Repository, numOwnRepos+len(accessibleRepos))
	for i := range ownRepos {
		repos[i] = ownRepos[i].APIFormat(&api.Permission{true, true, true})
	}

	i := numOwnRepos
	for repo, access := range accessibleRepos {
		repos[i] = repo.APIFormat(&api.Permission{
			Admin: access >= models.ACCESS_MODE_ADMIN,
			Push:  access >= models.ACCESS_MODE_WRITE,
			Pull:  true,
		})
		i++
	}

	ctx.JSON(200, &repos)
}

func ListMyRepos(ctx *context.APIContext) {
	listUserRepositories(ctx, ctx.User.Name)
}

func ListUserRepositories(ctx *context.APIContext) {
	listUserRepositories(ctx, ctx.Params(":username"))
}

func ListOrgRepositories(ctx *context.APIContext) {
	listUserRepositories(ctx, ctx.Params(":org"))
}

func CreateUserRepo(ctx *context.APIContext, owner *models.User, opt api.CreateRepoOption) {
	repo, err := models.CreateRepository(ctx.User, owner, models.CreateRepoOptions{
		Name:        opt.Name,
		Description: opt.Description,
		Gitignores:  opt.Gitignores,
		License:     opt.License,
		Readme:      opt.Readme,
		IsPrivate:   opt.Private,
		AutoInit:    opt.AutoInit,
	})
	if err != nil {
		if models.IsErrRepoAlreadyExist(err) ||
			models.IsErrNameReserved(err) ||
			models.IsErrNamePatternNotAllowed(err) {
			ctx.Error(422, "", err)
		} else {
			if repo != nil {
				if err = models.DeleteRepository(ctx.User.ID, repo.ID); err != nil {
					log.Error(4, "DeleteRepository: %v", err)
				}
			}
			ctx.Error(500, "CreateRepository", err)
		}
		return
	}

	ctx.JSON(201, repo.APIFormat(&api.Permission{true, true, true}))
}

// https://github.com/gogits/go-gogs-client/wiki/Repositories#create
func Create(ctx *context.APIContext, opt api.CreateRepoOption) {
	// Shouldn't reach this condition, but just in case.
	if ctx.User.IsOrganization() {
		ctx.Error(422, "", "not allowed creating repository for organization")
		return
	}
	CreateUserRepo(ctx, ctx.User, opt)
}

func CreateOrgRepo(ctx *context.APIContext, opt api.CreateRepoOption) {
	org, err := models.GetOrgByName(ctx.Params(":org"))
	if err != nil {
		if errors.IsUserNotExist(err) {
			ctx.Error(422, "", err)
		} else {
			ctx.Error(500, "GetOrgByName", err)
		}
		return
	}

	if !org.IsOwnedBy(ctx.User.ID) {
		ctx.Error(403, "", "Given user is not owner of organization.")
		return
	}
	CreateUserRepo(ctx, org, opt)
}

// https://github.com/gogits/go-gogs-client/wiki/Repositories#migrate
func Migrate(ctx *context.APIContext, f form.MigrateRepo) {
	ctxUser := ctx.User
	// Not equal means context user is an organization,
	// or is another user/organization if current user is admin.
	if f.Uid != ctxUser.ID {
		org, err := models.GetUserByID(f.Uid)
		if err != nil {
			if errors.IsUserNotExist(err) {
				ctx.Error(422, "", err)
			} else {
				ctx.Error(500, "GetUserByID", err)
			}
			return
		}
		ctxUser = org
	}

	if ctx.HasError() {
		ctx.Error(422, "", ctx.GetErrMsg())
		return
	}

	if ctxUser.IsOrganization() && !ctx.User.IsAdmin {
		// Check ownership of organization.
		if !ctxUser.IsOwnedBy(ctx.User.ID) {
			ctx.Error(403, "", "Given user is not owner of organization.")
			return
		}
	}

	remoteAddr, err := f.ParseRemoteAddr(ctx.User)
	if err != nil {
		if models.IsErrInvalidCloneAddr(err) {
			addrErr := err.(models.ErrInvalidCloneAddr)
			switch {
			case addrErr.IsURLError:
				ctx.Error(422, "", err)
			case addrErr.IsPermissionDenied:
				ctx.Error(422, "", "You are not allowed to import local repositories.")
			case addrErr.IsInvalidPath:
				ctx.Error(422, "", "Invalid local path, it does not exist or not a directory.")
			default:
				ctx.Error(500, "ParseRemoteAddr", "Unknown error type (ErrInvalidCloneAddr): "+err.Error())
			}
		} else {
			ctx.Error(500, "ParseRemoteAddr", err)
		}
		return
	}

	repo, err := models.MigrateRepository(ctx.User, ctxUser, models.MigrateRepoOptions{
		Name:        f.RepoName,
		Description: f.Description,
		IsPrivate:   f.Private || setting.Repository.ForcePrivate,
		IsMirror:    f.Mirror,
		RemoteAddr:  remoteAddr,
	})
	if err != nil {
		if repo != nil {
			if errDelete := models.DeleteRepository(ctxUser.ID, repo.ID); errDelete != nil {
				log.Error(4, "DeleteRepository: %v", errDelete)
			}
		}
		ctx.Error(500, "MigrateRepository", models.HandleCloneUserCredentials(err.Error(), true))
		return
	}

	log.Trace("Repository migrated: %s/%s", ctxUser.Name, f.RepoName)
	ctx.JSON(201, repo.APIFormat(&api.Permission{true, true, true}))
}

func parseOwnerAndRepo(ctx *context.APIContext) (*models.User, *models.Repository) {
	owner, err := models.GetUserByName(ctx.Params(":username"))
	if err != nil {
		if errors.IsUserNotExist(err) {
			ctx.Error(422, "", err)
		} else {
			ctx.Error(500, "GetUserByName", err)
		}
		return nil, nil
	}

	repo, err := models.GetRepositoryByName(owner.ID, ctx.Params(":reponame"))
	if err != nil {
		if errors.IsRepoNotExist(err) {
			ctx.Status(404)
		} else {
			ctx.Error(500, "GetRepositoryByName", err)
		}
		return nil, nil
	}

	return owner, repo
}

// https://github.com/gogits/go-gogs-client/wiki/Repositories#get
func Get(ctx *context.APIContext) {
	_, repo := parseOwnerAndRepo(ctx)
	if ctx.Written() {
		return
	}

	ctx.JSON(200, repo.APIFormat(&api.Permission{
		Admin: ctx.Repo.IsAdmin(),
		Push:  ctx.Repo.IsWriter(),
		Pull:  true,
	}))
}

// https://github.com/gogits/go-gogs-client/wiki/Repositories#delete
func Delete(ctx *context.APIContext) {
	owner, repo := parseOwnerAndRepo(ctx)
	if ctx.Written() {
		return
	}

	if owner.IsOrganization() && !owner.IsOwnedBy(ctx.User.ID) {
		ctx.Error(403, "", "Given user is not owner of organization.")
		return
	}

	if err := models.DeleteRepository(owner.ID, repo.ID); err != nil {
		ctx.Error(500, "DeleteRepository", err)
		return
	}

	log.Trace("Repository deleted: %s/%s", owner.Name, repo.Name)
	ctx.Status(204)
}

func ListForks(ctx *context.APIContext) {
	forks, err := ctx.Repo.Repository.GetForks()
	if err != nil {
		ctx.Error(500, "GetForks", err)
		return
	}

	apiForks := make([]*api.Repository, len(forks))
	for i := range forks {
		if err := forks[i].GetOwner(); err != nil {
			ctx.Error(500, "GetOwner", err)
			return
		}
		apiForks[i] = forks[i].APIFormat(&api.Permission{
			Admin: ctx.User.IsAdminOfRepo(forks[i]),
			Push:  ctx.User.IsWriterOfRepo(forks[i]),
			Pull:  true,
		})
	}

	ctx.JSON(200, &apiForks)
}

func MirrorSync(ctx *context.APIContext) {
	_, repo := parseOwnerAndRepo(ctx)
	if ctx.Written() {
		return
	} else if !repo.IsMirror {
		ctx.Status(404)
		return
	}

	go models.MirrorQueue.Add(repo.ID)
	ctx.Status(202)
}
