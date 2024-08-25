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

func (s *Store) GetAllUsers() ([]*types.User, error) {
	rows, err := s.DB.Query("SELECT u.user_id, u.username, u.email, u.password, u.phone_number, u.image, u.role, u.is_verified, u.created_at, u.updated_at, d.document_id, d.status FROM users u LEFT JOIN userdocuments d ON u.user_id = d.user_id")
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

func (s *Store) GetUserByEmail(email string) (*types.Usershort, error) {
	rows, err := s.DB.Query("SELECT * FROM users where email = ?", email)
	if err != nil {
		log.Println("Error querying user")
		return nil, err
	}

	u := new(types.Usershort)

	for rows.Next() {
		u, err = scanRowtoUsershort(rows)
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
	rows, err := s.DB.Query("SELECT u.user_id, u.username, u.email, u.password, u.phone_number, u.image, u.role, u.is_verified, u.created_at, u.updated_at, d.document_id, d.status  FROM users u LEFT JOIN userdocuments d ON u.user_id = d.user_id WHERE u.user_id = ?", id)

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

func (s *Store) GetAllPendingUsers(page int) ([]*types.User, int, error) {

	offset := (page - 1) * 15
	var totalCount int


	err := s.DB.QueryRow("SELECT COUNT(*) FROM userdocuments WHERE status = 'pending'").Scan(&totalCount)
	if err != nil {
		return nil,0, err
	}

	rows, err := s.DB.Query("SELECT u.user_id, u.username, u.email, u.password, u.phone_number, u.image, u.role, u.is_verified, u.created_at, u.updated_at, d.document_id, d.status FROM users u LEFT JOIN userdocuments d ON u.user_id = d.user_id WHERE d.status = 'pending' LIMIT 15 OFFSET ?", offset)
	if err != nil {
		return nil, 0, err
	}

	users := make([]*types.User, 0)

	for rows.Next() {
		u, err := scanRowtoUser(rows)
		if err != nil {
			return nil,0, err
		}
		users = append(users, u)
	}
	return users,totalCount, nil
}

func scanRowtoUser(rows *sql.Rows) (*types.User, error) {
	user := new(types.User)
	var documentID sql.NullInt32
	var status sql.NullString

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
		&documentID,
		&status,
	)
	if err != nil {
		return nil, err
	}

	if documentID.Valid {
		user.DocumentID = new(int)
		*user.DocumentID = int(documentID.Int32)
	} else {
		user.DocumentID = nil
	}

	if status.Valid {
		user.Status = new(string)
		*user.Status = status.String
	} else {
		user.Status = nil
	}

	return user, nil
}

func scanRowtoUsershort(rows *sql.Rows) (*types.Usershort, error) {
	user := new(types.Usershort)

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