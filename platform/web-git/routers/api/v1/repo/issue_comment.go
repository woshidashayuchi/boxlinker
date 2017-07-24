// Copyright 2015 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.
package repo

import (
	"time"

	api "github.com/gogits/go-gogs-client"

	"github.com/cabernety/boxlinker-git/models"
	"github.com/cabernety/boxlinker-git/modules/context"
)

func ListIssueComments(ctx *context.APIContext) {
	var since time.Time
	if len(ctx.Query("since")) > 0 {
		since, _ = time.Parse(time.RFC3339, ctx.Query("since"))
	}

	// comments,err:=models.GetCommentsByIssueIDSince(, since)
	issue, err := models.GetRawIssueByIndex(ctx.Repo.Repository.ID, ctx.ParamsInt64(":index"))
	if err != nil {
		ctx.Error(500, "GetRawIssueByIndex", err)
		return
	}

	comments, err := models.GetCommentsByIssueIDSince(issue.ID, since.Unix())
	if err != nil {
		ctx.Error(500, "GetCommentsByIssueIDSince", err)
		return
	}

	apiComments := make([]*api.Comment, len(comments))
	for i := range comments {
		apiComments[i] = comments[i].APIFormat()
	}
	ctx.JSON(200, &apiComments)
}

func ListRepoIssueComments(ctx *context.APIContext) {
	var since time.Time
	if len(ctx.Query("since")) > 0 {
		since, _ = time.Parse(time.RFC3339, ctx.Query("since"))
	}

	comments, err := models.GetCommentsByRepoIDSince(ctx.Repo.Repository.ID, since.Unix())
	if err != nil {
		ctx.Error(500, "GetCommentsByRepoIDSince", err)
		return
	}

	apiComments := make([]*api.Comment, len(comments))
	for i := range comments {
		apiComments[i] = comments[i].APIFormat()
	}
	ctx.JSON(200, &apiComments)
}

func CreateIssueComment(ctx *context.APIContext, form api.CreateIssueCommentOption) {
	issue, err := models.GetIssueByIndex(ctx.Repo.Repository.ID, ctx.ParamsInt64(":index"))
	if err != nil {
		ctx.Error(500, "GetIssueByIndex", err)
		return
	}

	comment, err := models.CreateIssueComment(ctx.User, ctx.Repo.Repository, issue, form.Body, nil)
	if err != nil {
		ctx.Error(500, "CreateIssueComment", err)
		return
	}

	ctx.JSON(201, comment.APIFormat())
}

func EditIssueComment(ctx *context.APIContext, form api.EditIssueCommentOption) {
	comment, err := models.GetCommentByID(ctx.ParamsInt64(":id"))
	if err != nil {
		if models.IsErrCommentNotExist(err) {
			ctx.Error(404, "GetCommentByID", err)
		} else {
			ctx.Error(500, "GetCommentByID", err)
		}
		return
	}

	if ctx.User.ID != comment.PosterID && !ctx.Repo.IsAdmin() {
		ctx.Status(403)
		return
	} else if comment.Type != models.COMMENT_TYPE_COMMENT {
		ctx.Status(204)
		return
	}

	oldContent := comment.Content
	comment.Content = form.Body
	if err := models.UpdateComment(ctx.User, comment, oldContent); err != nil {
		ctx.Error(500, "UpdateComment", err)
		return
	}
	ctx.JSON(200, comment.APIFormat())
}

func DeleteIssueComment(ctx *context.APIContext) {
	comment, err := models.GetCommentByID(ctx.ParamsInt64(":id"))
	if err != nil {
		if models.IsErrCommentNotExist(err) {
			ctx.Error(404, "GetCommentByID", err)
		} else {
			ctx.Error(500, "GetCommentByID", err)
		}
		return
	}

	if ctx.User.ID != comment.PosterID && !ctx.Repo.IsAdmin() {
		ctx.Status(403)
		return
	} else if comment.Type != models.COMMENT_TYPE_COMMENT {
		ctx.Status(204)
		return
	}

	if err = models.DeleteCommentByID(ctx.User, comment.ID); err != nil {
		ctx.Error(500, "DeleteCommentByID", err)
		return
	}
	ctx.Status(204)
}
