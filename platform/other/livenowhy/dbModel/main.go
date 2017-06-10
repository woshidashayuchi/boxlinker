package main

import (

    "github.com/jmoiron/sqlx"
    "log"
	//"fmt"
	_ "github.com/go-sql-driver/mysql"
    //"database/sql"
)


func main() {
    // this Pings the database trying to connect, panics on error
    // use sqlx.Open() for sql.Open() semantics
    db, err := sqlx.Connect("mysql", "root:root123admin@tcp(192.168.1.6:3306)/test?autocommit=true",)
    if err != nil {
        log.Fatalln(err)
    }

    tx := db.MustBegin()
    tx.MustExec("INSERT INTO person (first_name, last_name, email) VALUES (?, ?, ?)", "Jason", "Moiron", "jmoiron@jmoiron.net")
    tx.MustExec("INSERT INTO person (first_name, last_name, email) VALUES ($1, $2, $3)", "John", "Doe", "johndoeDNE@gmail.net")
    tx.MustExec("INSERT INTO place (country, city, telcode) VALUES ($1, $2, $3)", "United States", "New York", "1")
    tx.MustExec("INSERT INTO place (country, telcode) VALUES ($1, $2)", "Hong Kong", "852")
    tx.MustExec("INSERT INTO place (country, telcode) VALUES ($1, $2)", "Singapore", "65")
    // Named queries can use structs, so if you have an existing struct (i.e. person := &Person{}) that you have populated, you can pass it in as &person
    tx.NamedExec("INSERT INTO person (first_name, last_name, email) VALUES (:first_name, :last_name, :email)", &Person{"Jane", "Citizen", "jane.citzen@example.com"})
    tx.Commit()

}