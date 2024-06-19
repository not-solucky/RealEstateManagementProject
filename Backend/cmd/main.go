package main

import (
	"database/sql"
	"learninggo/cmd/api"
	"learninggo/config"
	"learninggo/db"
	"log"

	"github.com/go-sql-driver/mysql"
)

func main() {

	db, err := db.NewMySQLStorage(mysql.Config{
		User:                 config.Envs.DBUser,
		Passwd:               config.Envs.DBPassword,
		Addr:                 config.Envs.DBAddress,
		DBName:               config.Envs.DBName,
		Net:                  "tcp",
		AllowNativePasswords: true,
		ParseTime:            true,
	})

	if err != nil {
		log.Fatal(err)
	}

	initStorage(db)

	server := api.NewAPIServer(":8080", db)

	log.Printf(`
  _____ ____    ___    ___   ____
 / ___// __ \  / _ |  / _ \ /  _/
/ (_ // /_/ / / __ | / ___/_/ /  
\___/ \____/ /_/ |_|/_/   /___/                             
   __       
  / /  __ __
 / _ \/ // /
/_.__/\_, / 
     /___/  
             __                  __            __        
  ___  ___  / /_ ____ ___ ___   / /__ __ ____ / /__ __ __
 / _ \/ _ \/ __//___/(_-</ _ \ / // // // __//  '_// // /
/_//_/\___/\__/     /___/\___//_/ \_,_/ \__//_/\_\ \_, / 
                                                  /___/
`)

	if err := server.Run(); err != nil {
		log.Fatal(err)
	}
}

func initStorage(db *sql.DB) {
	err := db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Database connected")
}

