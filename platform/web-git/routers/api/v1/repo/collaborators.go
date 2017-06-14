// Copyright 2016 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package repo

import (
	api "github.com/gogits/go-gogs-client"

	"github.com/cabernety/boxlinker-git/models"
	"github.com/cabernety/boxlinker-git/models/errors"
	"github.com/cabernety/boxlinker-git/modules/context"
)

func ListCollaborators(ctx *context.APIContext) {
	collaborators, err := ctx.Repo.Repository.GetCollaborators()
	if err != nil {
		if errors.IsUserNotExist(err) {
			ctx.Error(422, "", err)
		} else {
			ctx.Error(500, "GetCollaborators", err)
		}
		return
	}

	apiCollaborators := make([]*api.Collaborator, len(collaborators))
	for i := range collaborators {
		apiCollaborators[i] = collaborators[i].APIFormat()
	}
	ctx.JSON(200, &apiCollaborators)
}

func AddCollaborator(ctx *context.APIContext, form api.AddCollaboratorOption) {
	collaborator, err := models.GetUserByName(ctx.Params(":collaborator"))
	if err != nil {
		if errors.IsUserNotExist(err) {
			ctx.Error(422, "", err)
		} else {
			ctx.Error(500, "GetUserByName", err)
		}
		return
	}

	if err := ctx.Repo.Repository.AddCollaborator(collaborator); err != nil {
		ctx.Error(500, "AddCollaborator", err)
		return
	}

	if form.Permission != nil {
		if err := ctx.Repo.Repository.ChangeCollaborationAccessMode(collaborator.ID, models.ParseAccessMode(*form.Permission)); err != nil {
			ctx.Error(500, "ChangeCollaborationAccessMode", err)
			return
		}
	}

	ctx.Status(204)
}

func IsCollaborator(ctx *context.APIContext) {
	collaborator, err := models.GetUserByName(ctx.Params(":collaborator"))
	if err != nil {
		if errors.IsUserNotExist(err) {
			ctx.Error(422, "", err)
		} else {
			ctx.Error(500, "GetUserByName", err)
		}
		return
	}

	if !ctx.Repo.Repository.IsCollaborator(collaborator.ID) {
		ctx.Status(404)
	} else {
		ctx.Status(204)
	}
}

func DeleteCollaborator(ctx *context.APIContext) {
	collaborator, err := models.GetUserByName(ctx.Params(":collaborator"))
	if err != nil {
		if errors.IsUserNotExist(err) {
			ctx.Error(422, "", err)
		} else {
			ctx.Error(500, "GetUserByName", err)
		}
		return
	}

	if err := ctx.Repo.Repository.DeleteCollaboration(collaborator.ID); err != nil {
		ctx.Error(500, "DeleteCollaboration", err)
		return
	}

	ctx.Status(204)
}
