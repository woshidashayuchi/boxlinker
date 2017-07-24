// Copyright 2014 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package user

import (
	"fmt"
	"io/ioutil"
	"strings"

	"github.com/Unknwon/com"
	log "gopkg.in/clog.v1"

	"github.com/cabernety/boxlinker-git/models"
	"github.com/cabernety/boxlinker-git/models/errors"
	"github.com/cabernety/boxlinker-git/modules/base"
	"github.com/cabernety/boxlinker-git/modules/context"
	"github.com/cabernety/boxlinker-git/modules/form"
	"github.com/cabernety/boxlinker-git/modules/mailer"
	"github.com/cabernety/boxlinker-git/modules/setting"
)

const (
	SETTINGS_PROFILE       base.TplName = "user/settings/profile"
	SETTINGS_AVATAR        base.TplName = "user/settings/avatar"
	SETTINGS_PASSWORD      base.TplName = "user/settings/password"
	SETTINGS_EMAILS        base.TplName = "user/settings/email"
	SETTINGS_SSH_KEYS      base.TplName = "user/settings/sshkeys"
	SETTINGS_SOCIAL        base.TplName = "user/settings/social"
	SETTINGS_APPLICATIONS  base.TplName = "user/settings/applications"
	SETTINGS_ORGANIZATIONS base.TplName = "user/settings/organizations"
	SETTINGS_REPOSITORIES  base.TplName = "user/settings/repositories"
	SETTINGS_DELETE        base.TplName = "user/settings/delete"
	NOTIFICATION           base.TplName = "user/notification"
	SECURITY               base.TplName = "user/security"
)

func Settings(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("settings")
	ctx.Data["PageIsSettingsProfile"] = true
	ctx.HTML(200, SETTINGS_PROFILE)
}

func handleUsernameChange(ctx *context.Context, newName string) {
	// Non-local users are not allowed to change their username.
	if len(newName) == 0 || !ctx.User.IsLocal() {
		return
	}

	// Check if user name has been changed
	if ctx.User.LowerName != strings.ToLower(newName) {
		if err := models.ChangeUserName(ctx.User, newName); err != nil {
			switch {
			case models.IsErrUserAlreadyExist(err):
				ctx.Flash.Error(ctx.Tr("newName_been_taken"))
				ctx.Redirect(setting.AppSubUrl + "/user/settings")
			case models.IsErrEmailAlreadyUsed(err):
				ctx.Flash.Error(ctx.Tr("form.email_been_used"))
				ctx.Redirect(setting.AppSubUrl + "/user/settings")
			case models.IsErrNameReserved(err):
				ctx.Flash.Error(ctx.Tr("user.newName_reserved"))
				ctx.Redirect(setting.AppSubUrl + "/user/settings")
			case models.IsErrNamePatternNotAllowed(err):
				ctx.Flash.Error(ctx.Tr("user.newName_pattern_not_allowed"))
				ctx.Redirect(setting.AppSubUrl + "/user/settings")
			default:
				ctx.Handle(500, "ChangeUserName", err)
			}
			return
		}
		log.Trace("User name changed: %s -> %s", ctx.User.Name, newName)
	}

	// In case it's just a case change
	ctx.User.Name = newName
	ctx.User.LowerName = strings.ToLower(newName)
}

func SettingsPost(ctx *context.Context, f form.UpdateProfile) {
	ctx.Data["Title"] = ctx.Tr("settings")
	ctx.Data["PageIsSettingsProfile"] = true

	if ctx.HasError() {
		ctx.HTML(200, SETTINGS_PROFILE)
		return
	}

	handleUsernameChange(ctx, f.Name)
	if ctx.Written() {
		return
	}

	ctx.User.FullName = f.FullName
	ctx.User.Email = f.Email
	ctx.User.Website = f.Website
	ctx.User.Location = f.Location
	if err := models.UpdateUser(ctx.User); err != nil {
		ctx.Handle(500, "UpdateUser", err)
		return
	}

	log.Trace("User settings updated: %s", ctx.User.Name)
	ctx.Flash.Success(ctx.Tr("settings.update_profile_success"))
	ctx.Redirect(setting.AppSubUrl + "/user/settings")
}

// FIXME: limit size.
func UpdateAvatarSetting(ctx *context.Context, f form.Avatar, ctxUser *models.User) error {
	ctxUser.UseCustomAvatar = f.Source == form.AVATAR_LOCAL
	if len(f.Gravatar) > 0 {
		ctxUser.Avatar = base.EncodeMD5(f.Gravatar)
		ctxUser.AvatarEmail = f.Gravatar
	}

	if f.Avatar != nil {
		fr, err := f.Avatar.Open()
		if err != nil {
			return fmt.Errorf("Avatar.Open: %v", err)
		}
		defer fr.Close()

		data, err := ioutil.ReadAll(fr)
		if err != nil {
			return fmt.Errorf("ioutil.ReadAll: %v", err)
		}
		if !base.IsImageFile(data) {
			return errors.New(ctx.Tr("settings.uploaded_avatar_not_a_image"))
		}
		if err = ctxUser.UploadAvatar(data); err != nil {
			return fmt.Errorf("UploadAvatar: %v", err)
		}
	} else {
		// No avatar is uploaded but setting has been changed to enable,
		// generate a random one when needed.
		if ctxUser.UseCustomAvatar && !com.IsFile(ctxUser.CustomAvatarPath()) {
			if err := ctxUser.GenerateRandomAvatar(); err != nil {
				log.Error(4, "GenerateRandomAvatar[%d]: %v", ctxUser.ID, err)
			}
		}
	}

	if err := models.UpdateUser(ctxUser); err != nil {
		return fmt.Errorf("UpdateUser: %v", err)
	}

	return nil
}

func SettingsAvatar(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("settings")
	ctx.Data["PageIsSettingsAvatar"] = true
	ctx.HTML(200, SETTINGS_AVATAR)
}

func SettingsAvatarPost(ctx *context.Context, f form.Avatar) {
	if err := UpdateAvatarSetting(ctx, f, ctx.User); err != nil {
		ctx.Flash.Error(err.Error())
	} else {
		ctx.Flash.Success(ctx.Tr("settings.update_avatar_success"))
	}

	ctx.Redirect(setting.AppSubUrl + "/user/settings/avatar")
}

func SettingsDeleteAvatar(ctx *context.Context) {
	if err := ctx.User.DeleteAvatar(); err != nil {
		ctx.Flash.Error(err.Error())
	}

	ctx.Redirect(setting.AppSubUrl + "/user/settings/avatar")
}

func SettingsPassword(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("settings")
	ctx.Data["PageIsSettingsPassword"] = true
	ctx.HTML(200, SETTINGS_PASSWORD)
}

func SettingsPasswordPost(ctx *context.Context, f form.ChangePassword) {
	ctx.Data["Title"] = ctx.Tr("settings")
	ctx.Data["PageIsSettingsPassword"] = true

	if ctx.HasError() {
		ctx.HTML(200, SETTINGS_PASSWORD)
		return
	}

	if !ctx.User.ValidatePassword(f.OldPassword) {
		ctx.Flash.Error(ctx.Tr("settings.password_incorrect"))
	} else if f.Password != f.Retype {
		ctx.Flash.Error(ctx.Tr("form.password_not_match"))
	} else {
		ctx.User.Passwd = f.Password
		var err error
		if ctx.User.Salt, err = models.GetUserSalt(); err != nil {
			ctx.Handle(500, "UpdateUser", err)
			return
		}
		ctx.User.EncodePasswd()
		if err := models.UpdateUser(ctx.User); err != nil {
			ctx.Handle(500, "UpdateUser", err)
			return
		}
		log.Trace("User password updated: %s", ctx.User.Name)
		ctx.Flash.Success(ctx.Tr("settings.change_password_success"))
	}

	ctx.Redirect(setting.AppSubUrl + "/user/settings/password")
}

func SettingsEmails(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("settings")
	ctx.Data["PageIsSettingsEmails"] = true

	emails, err := models.GetEmailAddresses(ctx.User.ID)
	if err != nil {
		ctx.Handle(500, "GetEmailAddresses", err)
		return
	}
	ctx.Data["Emails"] = emails

	ctx.HTML(200, SETTINGS_EMAILS)
}

func SettingsEmailPost(ctx *context.Context, f form.AddEmail) {
	ctx.Data["Title"] = ctx.Tr("settings")
	ctx.Data["PageIsSettingsEmails"] = true

	// Make emailaddress primary.
	if ctx.Query("_method") == "PRIMARY" {
		if err := models.MakeEmailPrimary(&models.EmailAddress{ID: ctx.QueryInt64("id")}); err != nil {
			ctx.Handle(500, "MakeEmailPrimary", err)
			return
		}

		log.Trace("Email made primary: %s", ctx.User.Name)
		ctx.Redirect(setting.AppSubUrl + "/user/settings/email")
		return
	}

	// Add Email address.
	emails, err := models.GetEmailAddresses(ctx.User.ID)
	if err != nil {
		ctx.Handle(500, "GetEmailAddresses", err)
		return
	}
	ctx.Data["Emails"] = emails

	if ctx.HasError() {
		ctx.HTML(200, SETTINGS_EMAILS)
		return
	}

	email := &models.EmailAddress{
		UID:         ctx.User.ID,
		Email:       f.Email,
		IsActivated: !setting.Service.RegisterEmailConfirm,
	}
	if err := models.AddEmailAddress(email); err != nil {
		if models.IsErrEmailAlreadyUsed(err) {
			ctx.RenderWithErr(ctx.Tr("form.email_been_used"), SETTINGS_EMAILS, &f)
			return
		}
		ctx.Handle(500, "AddEmailAddress", err)
		return
	}

	// Send confirmation email
	if setting.Service.RegisterEmailConfirm {
		mailer.SendActivateEmailMail(ctx.Context, models.NewMailerUser(ctx.User), email.Email)

		if err := ctx.Cache.Put("MailResendLimit_"+ctx.User.LowerName, ctx.User.LowerName, 180); err != nil {
			log.Error(4, "Set cache(MailResendLimit) fail: %v", err)
		}
		ctx.Flash.Info(ctx.Tr("settings.add_email_confirmation_sent", email.Email, setting.Service.ActiveCodeLives/60))
	} else {
		ctx.Flash.Success(ctx.Tr("settings.add_email_success"))
	}

	log.Trace("Email address added: %s", email.Email)
	ctx.Redirect(setting.AppSubUrl + "/user/settings/email")
}

func DeleteEmail(ctx *context.Context) {
	if err := models.DeleteEmailAddress(&models.EmailAddress{
		ID:  ctx.QueryInt64("id"),
		UID: ctx.User.ID,
	}); err != nil {
		ctx.Handle(500, "DeleteEmail", err)
		return
	}
	log.Trace("Email address deleted: %s", ctx.User.Name)

	ctx.Flash.Success(ctx.Tr("settings.email_deletion_success"))
	ctx.JSON(200, map[string]interface{}{
		"redirect": setting.AppSubUrl + "/user/settings/email",
	})
}

func SettingsSSHKeys(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("settings")
	ctx.Data["PageIsSettingsSSHKeys"] = true

	keys, err := models.ListPublicKeys(ctx.User.ID)
	if err != nil {
		ctx.Handle(500, "ListPublicKeys", err)
		return
	}
	ctx.Data["Keys"] = keys

	ctx.HTML(200, SETTINGS_SSH_KEYS)
}

func SettingsSSHKeysPost(ctx *context.Context, f form.AddSSHKey) {
	ctx.Data["Title"] = ctx.Tr("settings")
	ctx.Data["PageIsSettingsSSHKeys"] = true

	keys, err := models.ListPublicKeys(ctx.User.ID)
	if err != nil {
		ctx.Handle(500, "ListPublicKeys", err)
		return
	}
	ctx.Data["Keys"] = keys

	if ctx.HasError() {
		ctx.HTML(200, SETTINGS_SSH_KEYS)
		return
	}

	content, err := models.CheckPublicKeyString(f.Content)
	if err != nil {
		if models.IsErrKeyUnableVerify(err) {
			ctx.Flash.Info(ctx.Tr("form.unable_verify_ssh_key"))
		} else {
			ctx.Flash.Error(ctx.Tr("form.invalid_ssh_key", err.Error()))
			ctx.Redirect(setting.AppSubUrl + "/user/settings/ssh")
			return
		}
	}

	if _, err = models.AddPublicKey(ctx.User.ID, f.Title, content); err != nil {
		ctx.Data["HasError"] = true
		switch {
		case models.IsErrKeyAlreadyExist(err):
			ctx.Data["Err_Content"] = true
			ctx.RenderWithErr(ctx.Tr("settings.ssh_key_been_used"), SETTINGS_SSH_KEYS, &f)
		case models.IsErrKeyNameAlreadyUsed(err):
			ctx.Data["Err_Title"] = true
			ctx.RenderWithErr(ctx.Tr("settings.ssh_key_name_used"), SETTINGS_SSH_KEYS, &f)
		default:
			ctx.Handle(500, "AddPublicKey", err)
		}
		return
	}

	ctx.Flash.Success(ctx.Tr("settings.add_key_success", f.Title))
	ctx.Redirect(setting.AppSubUrl + "/user/settings/ssh")
}

func DeleteSSHKey(ctx *context.Context) {
	if err := models.DeletePublicKey(ctx.User, ctx.QueryInt64("id")); err != nil {
		ctx.Flash.Error("DeletePublicKey: " + err.Error())
	} else {
		ctx.Flash.Success(ctx.Tr("settings.ssh_key_deletion_success"))
	}

	ctx.JSON(200, map[string]interface{}{
		"redirect": setting.AppSubUrl + "/user/settings/ssh",
	})
}

func SettingsApplications(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("settings")
	ctx.Data["PageIsSettingsApplications"] = true

	tokens, err := models.ListAccessTokens(ctx.User.ID)
	if err != nil {
		ctx.Handle(500, "ListAccessTokens", err)
		return
	}
	ctx.Data["Tokens"] = tokens

	ctx.HTML(200, SETTINGS_APPLICATIONS)
}

func SettingsApplicationsPost(ctx *context.Context, f form.NewAccessToken) {
	ctx.Data["Title"] = ctx.Tr("settings")
	ctx.Data["PageIsSettingsApplications"] = true

	if ctx.HasError() {
		tokens, err := models.ListAccessTokens(ctx.User.ID)
		if err != nil {
			ctx.Handle(500, "ListAccessTokens", err)
			return
		}
		ctx.Data["Tokens"] = tokens
		ctx.HTML(200, SETTINGS_APPLICATIONS)
		return
	}

	t := &models.AccessToken{
		UID:  ctx.User.ID,
		Name: f.Name,
	}
	if err := models.NewAccessToken(t); err != nil {
		ctx.Handle(500, "NewAccessToken", err)
		return
	}

	ctx.Flash.Success(ctx.Tr("settings.generate_token_succees"))
	ctx.Flash.Info(t.Sha1)

	ctx.Redirect(setting.AppSubUrl + "/user/settings/applications")
}

func SettingsDeleteApplication(ctx *context.Context) {
	if err := models.DeleteAccessTokenOfUserByID(ctx.User.ID, ctx.QueryInt64("id")); err != nil {
		ctx.Flash.Error("DeleteAccessTokenByID: " + err.Error())
	} else {
		ctx.Flash.Success(ctx.Tr("settings.delete_token_success"))
	}

	ctx.JSON(200, map[string]interface{}{
		"redirect": setting.AppSubUrl + "/user/settings/applications",
	})
}

func SettingsOrganizations(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("settings")
	ctx.Data["PageIsSettingsOrganizations"] = true

	orgs, err := models.GetOrgsByUserID(ctx.User.ID, true)
	if err != nil {
		ctx.Handle(500, "GetOrgsByUserID", err)
		return
	}
	ctx.Data["Orgs"] = orgs

	ctx.HTML(200, SETTINGS_ORGANIZATIONS)
}

func SettingsLeaveOrganization(ctx *context.Context) {
	err := models.RemoveOrgUser(ctx.QueryInt64("id"), ctx.User.ID)
	if err != nil {
		if models.IsErrLastOrgOwner(err) {
			ctx.Flash.Error(ctx.Tr("form.last_org_owner"))
		} else {
			ctx.Handle(500, "RemoveOrgUser", err)
			return
		}
	}

	ctx.JSON(200, map[string]interface{}{
		"redirect": setting.AppSubUrl + "/user/settings/organizations",
	})
}

func SettingsRepos(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("settings")
	ctx.Data["PageIsSettingsRepositories"] = true

	repos, err := models.GetUserAndCollaborativeRepositories(ctx.User.ID)
	if err != nil {
		ctx.Handle(500, "GetUserAndCollaborativeRepositories", err)
		return
	}
	if err = models.RepositoryList(repos).LoadAttributes(); err != nil {
		ctx.Handle(500, "LoadAttributes", err)
		return
	}
	ctx.Data["Repos"] = repos

	ctx.HTML(200, SETTINGS_REPOSITORIES)
}

func SettingsLeaveRepo(ctx *context.Context) {
	repo, err := models.GetRepositoryByID(ctx.QueryInt64("id"))
	if err != nil {
		ctx.NotFoundOrServerError("GetRepositoryByID", errors.IsRepoNotExist, err)
		return
	}

	if err = repo.DeleteCollaboration(ctx.User.ID); err != nil {
		ctx.Handle(500, "DeleteCollaboration", err)
		return
	}

	ctx.Flash.Success(ctx.Tr("settings.repos.leave_success", repo.FullName()))
	ctx.JSON(200, map[string]interface{}{
		"redirect": setting.AppSubUrl + "/user/settings/repositories",
	})
}

func SettingsDelete(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("settings")
	ctx.Data["PageIsSettingsDelete"] = true

	if ctx.Req.Method == "POST" {
		if _, err := models.UserSignIn(ctx.User.Name, ctx.Query("password")); err != nil {
			if errors.IsUserNotExist(err) {
				ctx.RenderWithErr(ctx.Tr("form.enterred_invalid_password"), SETTINGS_DELETE, nil)
			} else {
				ctx.Handle(500, "UserSignIn", err)
			}
			return
		}

		if err := models.DeleteUser(ctx.User); err != nil {
			switch {
			case models.IsErrUserOwnRepos(err):
				ctx.Flash.Error(ctx.Tr("form.still_own_repo"))
				ctx.Redirect(setting.AppSubUrl + "/user/settings/delete")
			case models.IsErrUserHasOrgs(err):
				ctx.Flash.Error(ctx.Tr("form.still_has_org"))
				ctx.Redirect(setting.AppSubUrl + "/user/settings/delete")
			default:
				ctx.Handle(500, "DeleteUser", err)
			}
		} else {
			log.Trace("Account deleted: %s", ctx.User.Name)
			ctx.Redirect(setting.AppSubUrl + "/")
		}
		return
	}

	ctx.HTML(200, SETTINGS_DELETE)
}
