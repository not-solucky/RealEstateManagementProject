package image


import (
	"database/sql"
	
)

type Store struct {
	DB *sql.DB
}

func NewStore(db *sql.DB) *Store {
	return &Store{
		DB: db,
	}
}

func (s *Store) UpdateUserImage(userID int, imagePath string) error {
	_, err := s.DB.Exec("UPDATE users SET image_path = ? WHERE user_id = ?", imagePath, userID)
	if err != nil {
		return err
	}
	return nil
}

func (s *Store) UploadUserDocument(userID int, documentPath string) error {
	_, err := s.DB.Exec("UPDATE users SET document_path = ? WHERE user_id = ?", documentPath, userID)
	if err != nil {
		return err
	}
	return nil
}


