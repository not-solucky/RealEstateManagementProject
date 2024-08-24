package user

import (
	"learninggo/types"
	"learninggo/utils"
	"database/sql"
)

func (s *Store) SaveDocumentImage(Image string) (string, error) {
	dir := "./uploads/documents/user"
	fileName, err := utils.SaveImage(Image, dir)

	if err != nil {
		return "", err
	}
	return fileName, nil
}

func (s *Store) SubmitDocument(payload types.UserDocumentPayload) error {

	fileName, err := s.SaveDocumentImage(payload.Document)
	if err != nil {
		return err
	}
	_, err = s.DB.Exec("INSERT INTO userdocuments (user_id, document_url, is_verified, status) VALUES (?,?, ?, ?)", payload.UserID, fileName, false, "pending")
	if err != nil {
		return err
	}
	return nil
}
func (s *Store) UpdateDocument(payload types.UserDocumentPayload) error {
    // Start a new transaction
    tx, err := s.DB.Begin()
    if err != nil {
        return err
    }

    // Defer a rollback in case anything fails
    defer func() {
        if err != nil {
            tx.Rollback()
        }
    }()

    // Save the new document image
    fileName, err := s.SaveDocumentImage(payload.Document)
    if err != nil {
        return err
    }

    // Get the current document URL
    var currentDocument string
    err = tx.QueryRow("SELECT document_url FROM userdocuments WHERE user_id = ?", payload.UserID).Scan(&currentDocument)
    if err != nil {
        return err
    }

    // Delete the current document
    dir := "./uploads/documents/user"
    err = utils.DeleteImage(currentDocument, dir)
    if err != nil {
        return err
    }

    // Update the database with the new document URL
    _, err = tx.Exec("UPDATE userdocuments SET document_url = ?, is_verified = ?, status = ? WHERE user_id = ?", fileName, false, "pending", payload.UserID)
    if err != nil {
        return err
    }

    // Commit the transaction if everything succeeded
    err = tx.Commit()
    if err != nil {
        return err
    }

    return nil
}
func (s *Store) GetDocumentID(userID int) (int, error) {
	var documentID int
	err := s.DB.QueryRow("SELECT document_id FROM userdocuments WHERE user_id = ?", userID).Scan(&documentID)
	if err != nil {
		return 0, nil
	}
	return documentID, nil
}
func (s *Store) GetDocumentByID(id int) (*types.UserDocument, error) {
	rows, err := s.DB.Query("SELECT * FROM userdocuments WHERE document_id = ?", id)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	document := new(types.UserDocument)

	if rows.Next() {
		document, err = s.UserDocumentScans(rows)
		if err != nil {
			return nil, err
		}

	}

	if document.DocumentID == 0 {
		return nil, sql.ErrNoRows
	}

	return document, nil
}
func (s *Store) VerifyUser(payload types.UserVerifyPayload) error{
	
	tx, err := s.DB.Begin()

	if err != nil {
		return err
	}

	defer func() {
		if err != nil {
			tx.Rollback()
		} else {
			tx.Commit()
		}
	}()

	if payload.Status == "approved" {
		_, err = tx.Exec("UPDATE userdocuments SET is_verified = ?, status = ? WHERE user_id = ?", true, "completed", payload.UserID)

		if err != nil {
			return err
		}

		_, err = tx.Exec("UPDATE users SET is_verified = ? WHERE user_id = ?", true, payload.UserID)

		if err != nil {
			return err
		}
	} else if payload.Status == "rejected" {

		_, err = tx.Exec("UPDATE userdocuments SET is_verified = ?, status = ?, message = ? WHERE user_id = ?", false, "rejected", payload.Message, payload.UserID)

		if err != nil {
			return err
		}
	}

	return nil
}

func (s *Store) UserDocumentScans(row *sql.Rows) (*types.UserDocument, error) {
	document := new(types.UserDocument)

	var message sql.NullString
	
	err := row.Scan(
		&document.DocumentID,
		&document.UserID,
		&document.Document,
		&document.Verified,
		&document.Status,
		&message,
		&document.Submitted,
	)
	if err != nil {
		return nil, err
	}

	if message.Valid {
		document.Message = &message.String
	} else {
		document.Message = nil
	}

	return document, nil
}