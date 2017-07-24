// Copyright 2016 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package repo

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"path"
	"strings"

	log "gopkg.in/clog.v1"

	"github.com/gogits/git-module"
	"github.com/cabernety/boxlinker-git/models"
	"github.com/cabernety/boxlinker-git/modules/base"
	"github.com/cabernety/boxlinker-git/modules/context"
	"github.com/cabernety/boxlinker-git/modules/form"
	"github.com/cabernety/boxlinker-git/modules/setting"
	"github.com/cabernety/boxlinker-git/modules/template"
)

const (
	EDIT_FILE         base.TplName = "repo/editor/edit"
	EDIT_DIFF_PREVIEW base.TplName = "repo/editor/diff_preview"
	DELETE_FILE       base.TplName = "repo/editor/delete"
	UPLOAD_FILE       base.TplName = "repo/editor/upload"
)

// getParentTreeFields returns list of parent tree names and corresponding tree paths
// based on given tree path.
func getParentTreeFields(treePath string) (treeNames []string, treePaths []string) {
	if len(treePath) == 0 {
		return treeNames, treePaths
	}

	treeNames = strings.Split(treePath, "/")
	treePaths = make([]string, len(treeNames))
	for i := range treeNames {
		treePaths[i] = strings.Join(treeNames[:i+1], "/")
	}
	return treeNames, treePaths
}

func editFile(ctx *context.Context, isNewFile bool) {
	ctx.Data["PageIsEdit"] = true
	ctx.Data["IsNewFile"] = isNewFile
	ctx.Data["RequireHighlightJS"] = true
	ctx.Data["RequireSimpleMDE"] = true

	treeNames, treePaths := getParentTreeFields(ctx.Repo.TreePath)

	if !isNewFile {
		entry, err := ctx.Repo.Commit.GetTreeEntryByPath(ctx.Repo.TreePath)
		if err != nil {
			ctx.NotFoundOrServerError("GetTreeEntryByPath", git.IsErrNotExist, err)
			return
		}

		// No way to edit a directory online.
		if entry.IsDir() {
			ctx.Handle(404, "", nil)
			return
		}

		blob := entry.Blob()
		dataRc, err := blob.Data()
		if err != nil {
			ctx.Handle(404, "blob.Data", err)
			return
		}

		ctx.Data["FileSize"] = blob.Size()
		ctx.Data["FileName"] = blob.Name()

		buf := make([]byte, 1024)
		n, _ := dataRc.Read(buf)
		buf = buf[:n]

		// Only text file are editable online.
		if !base.IsTextFile(buf) {
			ctx.Handle(404, "", nil)
			return
		}

		d, _ := ioutil.ReadAll(dataRc)
		buf = append(buf, d...)
		if err, content := template.ToUTF8WithErr(buf); err != nil {
			if err != nil {
				log.Error(4, "ToUTF8WithErr: %v", err)
			}
			ctx.Data["FileContent"] = string(buf)
		} else {
			ctx.Data["FileContent"] = content
		}
	} else {
		treeNames = append(treeNames, "") // Append empty string to allow user name the new file.
	}

	ctx.Data["TreeNames"] = treeNames
	ctx.Data["TreePaths"] = treePaths
	ctx.Data["BranchLink"] = ctx.Repo.RepoLink + "/src/" + ctx.Repo.BranchName
	ctx.Data["commit_summary"] = ""
	ctx.Data["commit_message"] = ""
	ctx.Data["commit_choice"] = "direct"
	ctx.Data["new_branch_name"] = ""
	ctx.Data["last_commit"] = ctx.Repo.Commit.ID
	ctx.Data["MarkdownFileExts"] = strings.Join(setting.Markdown.FileExtensions, ",")
	ctx.Data["LineWrapExtensions"] = strings.Join(setting.Repository.Editor.LineWrapExtensions, ",")
	ctx.Data["PreviewableFileModes"] = strings.Join(setting.Repository.Editor.PreviewableFileModes, ",")
	ctx.Data["EditorconfigURLPrefix"] = fmt.Sprintf("%s/api/v1/repos/%s/editorconfig/", setting.AppSubUrl, ctx.Repo.Repository.FullName())

	ctx.HTML(200, EDIT_FILE)
}

func EditFile(ctx *context.Context) {
	editFile(ctx, false)
}

func NewFile(ctx *context.Context) {
	editFile(ctx, true)
}

func editFilePost(ctx *context.Context, f form.EditRepoFile, isNewFile bool) {
	ctx.Data["PageIsEdit"] = true
	ctx.Data["IsNewFile"] = isNewFile
	ctx.Data["RequireHighlightJS"] = true
	ctx.Data["RequireSimpleMDE"] = true

	oldBranchName := ctx.Repo.BranchName
	branchName := oldBranchName
	oldTreePath := ctx.Repo.TreePath
	lastCommit := f.LastCommit
	f.LastCommit = ctx.Repo.Commit.ID.String()

	if f.IsNewBrnach() {
		branchName = f.NewBranchName
	}

	f.TreePath = strings.Trim(f.TreePath, " /")
	treeNames, treePaths := getParentTreeFields(f.TreePath)

	ctx.Data["TreePath"] = f.TreePath
	ctx.Data["TreeNames"] = treeNames
	ctx.Data["TreePaths"] = treePaths
	ctx.Data["BranchLink"] = ctx.Repo.RepoLink + "/src/" + branchName
	ctx.Data["FileContent"] = f.Content
	ctx.Data["commit_summary"] = f.CommitSummary
	ctx.Data["commit_message"] = f.CommitMessage
	ctx.Data["commit_choice"] = f.CommitChoice
	ctx.Data["new_branch_name"] = branchName
	ctx.Data["last_commit"] = f.LastCommit
	ctx.Data["MarkdownFileExts"] = strings.Join(setting.Markdown.FileExtensions, ",")
	ctx.Data["LineWrapExtensions"] = strings.Join(setting.Repository.Editor.LineWrapExtensions, ",")
	ctx.Data["PreviewableFileModes"] = strings.Join(setting.Repository.Editor.PreviewableFileModes, ",")

	if ctx.HasError() {
		ctx.HTML(200, EDIT_FILE)
		return
	}

	if len(f.TreePath) == 0 {
		ctx.Data["Err_TreePath"] = true
		ctx.RenderWithErr(ctx.Tr("repo.editor.filename_cannot_be_empty"), EDIT_FILE, &f)
		return
	}

	if oldBranchName != branchName {
		if _, err := ctx.Repo.Repository.GetBranch(branchName); err == nil {
			ctx.Data["Err_NewBranchName"] = true
			ctx.RenderWithErr(ctx.Tr("repo.editor.branch_already_exists", branchName), EDIT_FILE, &f)
			return
		}
	}

	var newTreePath string
	for index, part := range treeNames {
		newTreePath = path.Join(newTreePath, part)
		entry, err := ctx.Repo.Commit.GetTreeEntryByPath(newTreePath)
		if err != nil {
			if git.IsErrNotExist(err) {
				// Means there is no item with that name, so we're good
				break
			}

			ctx.Handle(500, "Repo.Commit.GetTreeEntryByPath", err)
			return
		}
		if index != len(treeNames)-1 {
			if !entry.IsDir() {
				ctx.Data["Err_TreePath"] = true
				ctx.RenderWithErr(ctx.Tr("repo.editor.directory_is_a_file", part), EDIT_FILE, &f)
				return
			}
		} else {
			if entry.IsLink() {
				ctx.Data["Err_TreePath"] = true
				ctx.RenderWithErr(ctx.Tr("repo.editor.file_is_a_symlink", part), EDIT_FILE, &f)
				return
			} else if entry.IsDir() {
				ctx.Data["Err_TreePath"] = true
				ctx.RenderWithErr(ctx.Tr("repo.editor.filename_is_a_directory", part), EDIT_FILE, &f)
				return
			}
		}
	}

	if !isNewFile {
		_, err := ctx.Repo.Commit.GetTreeEntryByPath(oldTreePath)
		if err != nil {
			if git.IsErrNotExist(err) {
				ctx.Data["Err_TreePath"] = true
				ctx.RenderWithErr(ctx.Tr("repo.editor.file_editing_no_longer_exists", oldTreePath), EDIT_FILE, &f)
			} else {
				ctx.Handle(500, "GetTreeEntryByPath", err)
			}
			return
		}
		if lastCommit != ctx.Repo.CommitID {
			files, err := ctx.Repo.Commit.GetFilesChangedSinceCommit(lastCommit)
			if err != nil {
				ctx.Handle(500, "GetFilesChangedSinceCommit", err)
				return
			}

			for _, file := range files {
				if file == f.TreePath {
					ctx.RenderWithErr(ctx.Tr("repo.editor.file_changed_while_editing", ctx.Repo.RepoLink+"/compare/"+lastCommit+"..."+ctx.Repo.CommitID), EDIT_FILE, &f)
					return
				}
			}
		}
	}

	if oldTreePath != f.TreePath {
		// We have a new filename (rename or completely new file) so we need to make sure it doesn't already exist, can't clobber.
		entry, err := ctx.Repo.Commit.GetTreeEntryByPath(f.TreePath)
		if err != nil {
			if !git.IsErrNotExist(err) {
				ctx.Handle(500, "GetTreeEntryByPath", err)
				return
			}
		}
		if entry != nil {
			ctx.Data["Err_TreePath"] = true
			ctx.RenderWithErr(ctx.Tr("repo.editor.file_already_exists", f.TreePath), EDIT_FILE, &f)
			return
		}
	}

	message := strings.TrimSpace(f.CommitSummary)
	if len(message) == 0 {
		if isNewFile {
			message = ctx.Tr("repo.editor.add", f.TreePath)
		} else {
			message = ctx.Tr("repo.editor.update", f.TreePath)
		}
	}

	f.CommitMessage = strings.TrimSpace(f.CommitMessage)
	if len(f.CommitMessage) > 0 {
		message += "\n\n" + f.CommitMessage
	}

	if err := ctx.Repo.Repository.UpdateRepoFile(ctx.User, models.UpdateRepoFileOptions{
		LastCommitID: lastCommit,
		OldBranch:    oldBranchName,
		NewBranch:    branchName,
		OldTreeName:  oldTreePath,
		NewTreeName:  f.TreePath,
		Message:      message,
		Content:      strings.Replace(f.Content, "\r", "", -1),
		IsNewFile:    isNewFile,
	}); err != nil {
		ctx.Data["Err_TreePath"] = true
		ctx.RenderWithErr(ctx.Tr("repo.editor.fail_to_update_file", f.TreePath, err), EDIT_FILE, &f)
		return
	}

	if f.IsNewBrnach() && ctx.Repo.PullRequest.Allowed {
		ctx.Redirect(ctx.Repo.PullRequestURL(oldBranchName, f.NewBranchName))
	} else {
		ctx.Redirect(ctx.Repo.RepoLink + "/src/" + branchName + "/" + template.EscapePound(f.TreePath))
	}
}

func EditFilePost(ctx *context.Context, f form.EditRepoFile) {
	editFilePost(ctx, f, false)
}

func NewFilePost(ctx *context.Context, f form.EditRepoFile) {
	editFilePost(ctx, f, true)
}

func DiffPreviewPost(ctx *context.Context, f form.EditPreviewDiff) {
	treePath := ctx.Repo.TreePath

	entry, err := ctx.Repo.Commit.GetTreeEntryByPath(treePath)
	if err != nil {
		ctx.Error(500, "GetTreeEntryByPath: "+err.Error())
		return
	} else if entry.IsDir() {
		ctx.Error(422)
		return
	}

	diff, err := ctx.Repo.Repository.GetDiffPreview(ctx.Repo.BranchName, treePath, f.Content)
	if err != nil {
		ctx.Error(500, "GetDiffPreview: "+err.Error())
		return
	}

	if diff.NumFiles() == 0 {
		ctx.PlainText(200, []byte(ctx.Tr("repo.editor.no_changes_to_show")))
		return
	}
	ctx.Data["File"] = diff.Files[0]

	ctx.HTML(200, EDIT_DIFF_PREVIEW)
}

func DeleteFile(ctx *context.Context) {
	ctx.Data["PageIsDelete"] = true
	ctx.Data["BranchLink"] = ctx.Repo.RepoLink + "/src/" + ctx.Repo.BranchName
	ctx.Data["TreePath"] = ctx.Repo.TreePath
	ctx.Data["commit_summary"] = ""
	ctx.Data["commit_message"] = ""
	ctx.Data["commit_choice"] = "direct"
	ctx.Data["new_branch_name"] = ""
	ctx.HTML(200, DELETE_FILE)
}

func DeleteFilePost(ctx *context.Context, f form.DeleteRepoFile) {
	ctx.Data["PageIsDelete"] = true
	ctx.Data["BranchLink"] = ctx.Repo.RepoLink + "/src/" + ctx.Repo.BranchName
	ctx.Data["TreePath"] = ctx.Repo.TreePath

	oldBranchName := ctx.Repo.BranchName
	branchName := oldBranchName

	if f.IsNewBrnach() {
		branchName = f.NewBranchName
	}
	ctx.Data["commit_summary"] = f.CommitSummary
	ctx.Data["commit_message"] = f.CommitMessage
	ctx.Data["commit_choice"] = f.CommitChoice
	ctx.Data["new_branch_name"] = branchName

	if ctx.HasError() {
		ctx.HTML(200, DELETE_FILE)
		return
	}

	if oldBranchName != branchName {
		if _, err := ctx.Repo.Repository.GetBranch(branchName); err == nil {
			ctx.Data["Err_NewBranchName"] = true
			ctx.RenderWithErr(ctx.Tr("repo.editor.branch_already_exists", branchName), DELETE_FILE, &f)
			return
		}
	}

	message := strings.TrimSpace(f.CommitSummary)
	if len(message) == 0 {
		message = ctx.Tr("repo.editor.delete", ctx.Repo.TreePath)
	}

	f.CommitMessage = strings.TrimSpace(f.CommitMessage)
	if len(f.CommitMessage) > 0 {
		message += "\n\n" + f.CommitMessage
	}

	if err := ctx.Repo.Repository.DeleteRepoFile(ctx.User, models.DeleteRepoFileOptions{
		LastCommitID: ctx.Repo.CommitID,
		OldBranch:    oldBranchName,
		NewBranch:    branchName,
		TreePath:     ctx.Repo.TreePath,
		Message:      message,
	}); err != nil {
		ctx.Handle(500, "DeleteRepoFile", err)
		return
	}

	if f.IsNewBrnach() && ctx.Repo.PullRequest.Allowed {
		ctx.Redirect(ctx.Repo.PullRequestURL(oldBranchName, f.NewBranchName))
	} else {
		ctx.Flash.Success(ctx.Tr("repo.editor.file_delete_success", ctx.Repo.TreePath))
		ctx.Redirect(ctx.Repo.RepoLink + "/src/" + branchName)
	}
}

func renderUploadSettings(ctx *context.Context) {
	ctx.Data["RequireDropzone"] = true
	ctx.Data["UploadAllowedTypes"] = strings.Join(setting.Repository.Upload.AllowedTypes, ",")
	ctx.Data["UploadMaxSize"] = setting.Repository.Upload.FileMaxSize
	ctx.Data["UploadMaxFiles"] = setting.Repository.Upload.MaxFiles
}

func UploadFile(ctx *context.Context) {
	ctx.Data["PageIsUpload"] = true
	renderUploadSettings(ctx)

	treeNames, treePaths := getParentTreeFields(ctx.Repo.TreePath)
	if len(treeNames) == 0 {
		// We must at least have one element for user to input.
		treeNames = []string{""}
	}

	ctx.Data["TreeNames"] = treeNames
	ctx.Data["TreePaths"] = treePaths
	ctx.Data["BranchLink"] = ctx.Repo.RepoLink + "/src/" + ctx.Repo.BranchName
	ctx.Data["commit_summary"] = ""
	ctx.Data["commit_message"] = ""
	ctx.Data["commit_choice"] = "direct"
	ctx.Data["new_branch_name"] = ""

	ctx.HTML(200, UPLOAD_FILE)
}

func UploadFilePost(ctx *context.Context, f form.UploadRepoFile) {
	ctx.Data["PageIsUpload"] = true
	renderUploadSettings(ctx)

	oldBranchName := ctx.Repo.BranchName
	branchName := oldBranchName

	if f.IsNewBrnach() {
		branchName = f.NewBranchName
	}

	f.TreePath = strings.Trim(f.TreePath, " /")
	treeNames, treePaths := getParentTreeFields(f.TreePath)
	if len(treeNames) == 0 {
		// We must at least have one element for user to input.
		treeNames = []string{""}
	}

	ctx.Data["TreePath"] = f.TreePath
	ctx.Data["TreeNames"] = treeNames
	ctx.Data["TreePaths"] = treePaths
	ctx.Data["BranchLink"] = ctx.Repo.RepoLink + "/src/" + branchName
	ctx.Data["commit_summary"] = f.CommitSummary
	ctx.Data["commit_message"] = f.CommitMessage
	ctx.Data["commit_choice"] = f.CommitChoice
	ctx.Data["new_branch_name"] = branchName

	if ctx.HasError() {
		ctx.HTML(200, UPLOAD_FILE)
		return
	}

	if oldBranchName != branchName {
		if _, err := ctx.Repo.Repository.GetBranch(branchName); err == nil {
			ctx.Data["Err_NewBranchName"] = true
			ctx.RenderWithErr(ctx.Tr("repo.editor.branch_already_exists", branchName), UPLOAD_FILE, &f)
			return
		}
	}

	var newTreePath string
	for _, part := range treeNames {
		newTreePath = path.Join(newTreePath, part)
		entry, err := ctx.Repo.Commit.GetTreeEntryByPath(newTreePath)
		if err != nil {
			if git.IsErrNotExist(err) {
				// Means there is no item with that name, so we're good
				break
			}

			ctx.Handle(500, "Repo.Commit.GetTreeEntryByPath", err)
			return
		}

		// User can only upload files to a directory.
		if !entry.IsDir() {
			ctx.Data["Err_TreePath"] = true
			ctx.RenderWithErr(ctx.Tr("repo.editor.directory_is_a_file", part), UPLOAD_FILE, &f)
			return
		}
	}

	message := strings.TrimSpace(f.CommitSummary)
	if len(message) == 0 {
		message = ctx.Tr("repo.editor.upload_files_to_dir", f.TreePath)
	}

	f.CommitMessage = strings.TrimSpace(f.CommitMessage)
	if len(f.CommitMessage) > 0 {
		message += "\n\n" + f.CommitMessage
	}

	if err := ctx.Repo.Repository.UploadRepoFiles(ctx.User, models.UploadRepoFileOptions{
		LastCommitID: ctx.Repo.CommitID,
		OldBranch:    oldBranchName,
		NewBranch:    branchName,
		TreePath:     f.TreePath,
		Message:      message,
		Files:        f.Files,
	}); err != nil {
		ctx.Data["Err_TreePath"] = true
		ctx.RenderWithErr(ctx.Tr("repo.editor.unable_to_upload_files", f.TreePath, err), UPLOAD_FILE, &f)
		return
	}

	if f.IsNewBrnach() && ctx.Repo.PullRequest.Allowed {
		ctx.Redirect(ctx.Repo.PullRequestURL(oldBranchName, f.NewBranchName))
	} else {
		ctx.Redirect(ctx.Repo.RepoLink + "/src/" + branchName + "/" + f.TreePath)
	}
}

func UploadFileToServer(ctx *context.Context) {
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

	if len(setting.Repository.Upload.AllowedTypes) > 0 {
		allowed := false
		for _, t := range setting.Repository.Upload.AllowedTypes {
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
	}

	upload, err := models.NewUpload(header.Filename, buf, file)
	if err != nil {
		ctx.Error(500, fmt.Sprintf("NewUpload: %v", err))
		return
	}

	log.Trace("New file uploaded: %s", upload.UUID)
	ctx.JSON(200, map[string]string{
		"uuid": upload.UUID,
	})
}

func RemoveUploadFileFromServer(ctx *context.Context, f form.RemoveUploadFile) {
	if len(f.File) == 0 {
		ctx.Status(204)
		return
	}

	if err := models.DeleteUploadByUUID(f.File); err != nil {
		ctx.Error(500, fmt.Sprintf("DeleteUploadByUUID: %v", err))
		return
	}

	log.Trace("Upload file removed: %s", f.File)
	ctx.Status(204)
}
