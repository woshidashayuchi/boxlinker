package manager

import (
	"github.com/go-xorm/xorm"
	"github.com/cabernety/boxlinker/controller/models"

	"fmt"
	mAuth "github.com/cabernety/boxlinker/auth"
	"errors"
	settings "github.com/cabernety/boxlinker/settings/user"
	"github.com/cabernety/boxlinker"
	log "github.com/Sirupsen/logrus"
)

type Manager interface {
	VerifyAuthToken(token string) error
	VerifyUsernamePassword(username, password, hash string) (bool, error)
	GenerateToken(uid string, username string) (string, error)

	// user
	CheckAdminUser() error
	GetUserByName(username string) (*models.User)
	GetUserById(id string) (*models.User)
	GetUsers(pageConfig boxlinker.PageConfig) ([]*models.User, error)
	SaveUser(user *models.User) error
	IsUserExists(username string) (bool, error)
	IsEmailExists(email string) (bool, error)
	UpdatePassword(id string, password string) (bool, error)
}

type DefaultManager struct {
	authenticator mAuth.Authenticator
	engine *xorm.Engine
}

type ManagerOptions struct {
	Authenticator mAuth.Authenticator
	DBUser string
	DBPassword string
	DBName string
	DBHost string
	DBPort int
}

func NewManager(config ManagerOptions) (Manager, error) {

	dbOptions := models.DBOptions{
		User: config.DBUser,
		Password: config.DBPassword,
		Name: config.DBName,
		Host: config.DBHost,
		Port: config.DBPort,
	}

	engine, err := models.NewEngine(dbOptions)
	if err != nil {
		return nil, err
	}

	return &DefaultManager{
		authenticator: config.Authenticator,
		engine: engine,
	}, nil
}

func (m DefaultManager) VerifyUsernamePassword(username, password, hash string) (bool, error) {
	//hash, err := mAuth.Hash(password)
	//if err != nil {
	//	return false, err
	//}
	return m.authenticator.Authenticate(username, password, hash)
}

func (m DefaultManager) GenerateToken(uid string, username string) (string, error) {
	return m.authenticator.GenerateToken(uid, username)
}

func (m DefaultManager) SaveUser(user *models.User) error {
	sess := m.engine.NewSession()
	defer sess.Close()

	if err := sess.Begin(); err != nil {
		return err
	}
	if _, err := sess.Insert(user); err != nil {
		sess.Rollback()
		return err
	}
	return sess.Commit()
}

func (m DefaultManager) VerifyAuthToken(token string) error {
	errFailed := errors.New("Token 解析失败")
	success, data, err := mAuth.AuthToken(token)
	if err != nil {
		return err
	}
	_username := data["username"]
	if _username == nil {
		return errFailed
	}
	username := _username.(string)
	u := m.GetUserByName(username)
	if u == nil {
		return fmt.Errorf("未找到用户: %s", username)
	}

	if !success {
		return errFailed
	}
	return nil
}

func (m DefaultManager) CheckAdminUser() error {
	sess := m.engine.NewSession()
	defer sess.Close()
	adminUser := &models.User{
		Name: "admin",
	}
	if has, _ := sess.Get(adminUser); !has {
		pass, err := mAuth.Hash(settings.ADMIN_PASSWORD)
		if err != nil{
			return err
		}
		u := &models.User{
			Name: settings.ADMIN_NAME,
			Password: pass,
			Email: settings.ADMIN_EMAIL,
		}
		if _, err := sess.Insert(u); err != nil {
			sess.Rollback()
			return err
		} else {
			log.Infof("Add admin user: %s", u.Id)
		}
	} else {
		log.Infof("Admin user exists: %s", adminUser.Id)
	}
	return sess.Commit()
}

func (m DefaultManager) GetUsers(pageConfig boxlinker.PageConfig) (users []*models.User, err error) {
	fmt.Printf("pageConfig:> %+v", pageConfig)
	err = m.engine.Desc("created_unix").Limit(pageConfig.Limit(), pageConfig.Offset()).Find(&users)
	return
}

func (m DefaultManager) GetUserByName(username string) (*models.User) {
	u := &models.User{
		Name: username,
	}
	if found, _ := m.engine.Get(u); found {
		return u
	}
	return nil
}

func (m DefaultManager) GetUserById(id string) (*models.User) {
	u := &models.User{}
	if found, _ := m.engine.Id(id).Get(u); found {
		return u
	}
	return nil
}



func (m DefaultManager) IsUserExists(username string) (bool, error) {
	u := &models.User{
		Name: username,
	}
	if found, err := m.engine.Cols("name").Get(u); err != nil {
		return false, err
	} else if found {
		return true, nil
	} else {
		return false, nil
	}
}

func (m DefaultManager) IsEmailExists(email string) (bool, error) {
	u := &models.User{
		Email: email,
	}
	if found, err := m.engine.Cols("email").Get(u); err != nil {
		return false, err
	} else if found {
		return true, nil
	} else {
		return false, nil
	}
}

func (m DefaultManager) UpdatePassword(id string, password string) (bool, error) {
	sess := m.engine.NewSession()
	defer sess.Close()
	u := &models.User{
		Password: password,
	}
	_, err := m.engine.Id(id).Update(u)
	if err != nil {
		sess.Rollback()
		return false, err
	}
	return true, sess.Commit()
}

