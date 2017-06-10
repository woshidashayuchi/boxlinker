package dbmodel

import (
	"github.com/jmoiron/sqlx"
)


func InsertNamed(db *sqlx.DB, query string, arg interface{}) (error) {

	_, err := db.NamedExec(query, arg)
	return err
}

func InsertExec(db *sqlx.DB, query string, args ...interface{}) (error) {
	_, err := db.Exec(query, args)
	return err
}
