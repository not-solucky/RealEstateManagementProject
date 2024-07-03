package user

import (
	"database/sql"
	"fmt"
	"learninggo/types"
	"log"
)

type Store struct {
	DB *sql.DB
}

func NewStore(db *sql.DB) *Store {
	return &Store{
		DB: db,
	}
}

func (s *Store) GetUserByEmail(email string) (*types.User, error) {
	rows, err := s.DB.Query("SELECT * FROM users WHERE email = ?", email)
	log.Println("Querying user")

	if err != nil {
		log.Println("Error querying user")
		return nil, err
	}

	u := new(types.User)

	for rows.Next() {
		u, err = scanRowtoUser(rows)
		if err != nil {
			log.Println("Error scanning row")
			return nil, err
		}
	}
	log.Println("User", u)
	if u.ID == 0 {
		return nil, fmt.Errorf("user not found")
	}
	return u, nil
}

func (s *Store) GetUserByID(id int) (*types.User, error) {
	rows, err := s.DB.Query("SELECT * FROM users WHERE user_id = ?", id)

	if err != nil {
		return nil, err
	}

	u := new(types.User)

	for rows.Next() {
		u, err = scanRowtoUser(rows)
		if err != nil {
			return nil, err
		}
	}
	if u.ID == 0 {
		return nil, fmt.Errorf("user not found")
	}

	return u, nil
}

func (s *Store) CreateUser(user *types.User) error {
	log.Printf("Creating user")
	_, err := s.DB.Exec("INSERT INTO users (email, username, password, role, phone_number, image) VALUES (?, ?, ?, ?, ?, ?)", user.Email, user.Name, user.Password, user.Role, user.Phone, user.ImagePath)
	if err != nil {
		return err
	}
	return nil
}

func scanRowtoUser(rows *sql.Rows) (*types.User, error) {
	user := new(types.User)
	err := rows.Scan(
		&user.ID,
		&user.Name,
		&user.Email,
		&user.Password,
		&user.Phone,
		&user.ImagePath,
		&user.Role,
		&user.Verified,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return user, nil
}
