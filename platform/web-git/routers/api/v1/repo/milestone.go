// Copyright 2016 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package repo

import (
	"time"

	api "github.com/gogits/go-gogs-client"

	"github.com/cabernety/boxlinker-git/models"
	"github.com/cabernety/boxlinker-git/modules/context"
)

func ListMilestones(ctx *context.APIContext) {
	milestones, err := models.GetMilestonesByRepoID(ctx.Repo.Repository.ID)
	if err != nil {
		ctx.Error(500, "GetMilestonesByRepoID", err)
		return
	}

	apiMilestones := make([]*api.Milestone, len(milestones))
	for i := range milestones {
		apiMilestones[i] = milestones[i].APIFormat()
	}
	ctx.JSON(200, &apiMilestones)
}

func GetMilestone(ctx *context.APIContext) {
	milestone, err := models.GetMilestoneByRepoID(ctx.Repo.Repository.ID, ctx.ParamsInt64(":id"))
	if err != nil {
		if models.IsErrMilestoneNotExist(err) {
			ctx.Status(404)
		} else {
			ctx.Error(500, "GetMilestoneByRepoID", err)
		}
		return
	}
	ctx.JSON(200, milestone.APIFormat())
}

func CreateMilestone(ctx *context.APIContext, form api.CreateMilestoneOption) {
	if form.Deadline == nil {
		defaultDeadline, _ := time.ParseInLocation("2006-01-02", "9999-12-31", time.Local)
		form.Deadline = &defaultDeadline
	}

	milestone := &models.Milestone{
		RepoID:   ctx.Repo.Repository.ID,
		Name:     form.Title,
		Content:  form.Description,
		Deadline: *form.Deadline,
	}

	if err := models.NewMilestone(milestone); err != nil {
		ctx.Error(500, "NewMilestone", err)
		return
	}
	ctx.JSON(201, milestone.APIFormat())
}

func EditMilestone(ctx *context.APIContext, form api.EditMilestoneOption) {
	milestone, err := models.GetMilestoneByRepoID(ctx.Repo.Repository.ID, ctx.ParamsInt64(":id"))
	if err != nil {
		if models.IsErrMilestoneNotExist(err) {
			ctx.Status(404)
		} else {
			ctx.Error(500, "GetMilestoneByRepoID", err)
		}
		return
	}

	if len(form.Title) > 0 {
		milestone.Name = form.Title
	}
	if form.Description != nil {
		milestone.Content = *form.Description
	}
	if form.Deadline != nil && !form.Deadline.IsZero() {
		milestone.Deadline = *form.Deadline
	}

	if form.State != nil {
		if err = milestone.ChangeStatus(api.STATE_CLOSED == api.StateType(*form.State)); err != nil {
			ctx.Error(500, "ChangeStatus", err)
			return
		}
	} else if err = models.UpdateMilestone(milestone); err != nil {
		ctx.Handle(500, "UpdateMilestone", err)
		return
	}

	ctx.JSON(200, milestone.APIFormat())
}

func DeleteMilestone(ctx *context.APIContext) {
	if err := models.DeleteMilestoneOfRepoByID(ctx.Repo.Repository.ID, ctx.ParamsInt64(":id")); err != nil {
		ctx.Error(500, "DeleteMilestoneByRepoID", err)
		return
	}
	ctx.Status(204)
}
