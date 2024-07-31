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

func (s *Store) UpdateUserName(id int, name string) error {
	_, err := s.DB.Exec("UPDATE users SET username = ? WHERE user_id = ?", name, id)
	if err != nil {
		return err
	}
	return nil
}

func (s *Store) UpdateUserPhone(id int, phone string) error {
	_, err := s.DB.Exec("UPDATE users SET phone_number = ? WHERE user_id = ?", phone, id)
	if err != nil {
		return err
	}

	return nil
}

func (s *Store) UpdateUserPassword(id int, password string) error {
	_, err := s.DB.Exec("UPDATE users SET password = ? WHERE user_id = ?", password, id)
	if err != nil {
		return err
	}

	return nil
}

func (s *Store) UpdateUserImage(id int, image string) error {

	_, err := s.DB.Exec("UPDATE users SET image = ? WHERE user_id = ?", image, id)
	if err != nil {
		return err
	}
	return nil
}

func (s *Store) UpdateUserEmail(id int, email string) error {
	_, err := s.DB.Exec("UPDATE users SET email = ? WHERE user_id = ?", email, id)
	if err != nil {
		return err
	}
	return nil
}

func (s *Store) UpdateUserRole(id int, role string) error {
	_, err := s.DB.Exec("UPDATE users SET role = ? WHERE user_id = ?", role, id)
	if err != nil {
		return err
	}
	return nil
}

func (s *Store) VerifyUser(id int) error {
	_, err := s.DB.Exec("UPDATE users SET is_verified = true WHERE user_id = ?", id)
	if err != nil {
		return err
	}
	return nil
}

func (s *Store) GetAllUsers() ([]*types.User, error) {
	rows, err := s.DB.Query("SELECT * FROM users")
	if err != nil {
		log.Println("Error querying users")
		return nil, err
	}

	users := make([]*types.User, 0)

	for rows.Next() {
		u, err := scanRowtoUser(rows)
		if err != nil {
			log.Println("Error scanning row")
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}

func (s *Store) GetUserByEmail(email string) (*types.User, error) {
	rows, err := s.DB.Query("SELECT * FROM users where email = ?", email)
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
