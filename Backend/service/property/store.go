package property

import (
	"database/sql"
	// "fmt"
	// "learninggo/types"
	// "log"
)

type Store struct {
	DB *sql.DB
}

func NewStore(db *sql.DB) *Store {
	return &Store{
		DB: db,
	}
}
