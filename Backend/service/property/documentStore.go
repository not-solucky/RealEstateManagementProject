package property

import (
	"learninggo/types"
	"learninggo/utils"
	"database/sql"
)

func (s *Store) SaveDocumentImage(Image string) (string, error) {
	dir := "./uploads/documents/property"
	fileName, err := utils.SaveImage(Image, dir)

	if err != nil {
		return "", err
	}
	return fileName, nil
}

func (s *Store) SubmitDocument(payload types.PropertyDocumentPayload) error {

	fileName, err := s.SaveDocumentImage(payload.Document)
	if err != nil {
		return err
	}
	_, err = s.DB.Exec("INSERT INTO propertydocuments (property_id, document_url, is_verified, status) VALUES (?,?, ?, ?)", payload.PropertyID, fileName, false, "pending")
	if err != nil {
		return err
	}
	return nil
}

// func (s *Store) UpdateDocument(payload types.PropertyDocumentPayload) error {
	
// 	fileName, err := s.SaveDocumentImage(payload.Document)
// 	if err != nil {
// 		return err
// 	}

// 	// current document_url
// 	var currentDocument string
// 	err = s.DB.QueryRow("SELECT document_url FROM propertydocuments WHERE property_id = ?", payload.PropertyID).Scan(&currentDocument)
// 	if err != nil {
// 		return err
// 	}
// 	dir := "./uploads/documents/property"
// 	// delete the current document
// 	err = utils.DeleteImage(currentDocument, dir)
// 	if err != nil {
// 		return err
// 	}
	
// 	_, err = s.DB.Exec("UPDATE propertydocuments SET document_url = ?, is_verified = ?, status = ? WHERE property_id = ?", fileName, false, "pending", payload.PropertyID)
// 	if err != nil {
// 		return err
// 	}
// 	return nil
// }
func (s *Store) UpdateDocument(payload types.PropertyDocumentPayload) error {
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
    err = tx.QueryRow("SELECT document_url FROM propertydocuments WHERE property_id = ?", payload.PropertyID).Scan(&currentDocument)
    if err != nil {
        return err
    }

    // Delete the current document
    dir := "./uploads/documents/property"
    err = utils.DeleteImage(currentDocument, dir)
    if err != nil {
        return err
    }

    // Update the database with the new document URL
    _, err = tx.Exec("UPDATE propertydocuments SET document_url = ?, is_verified = ?, status = ? WHERE property_id = ?", fileName, false, "pending", payload.PropertyID)
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
func (s *Store) GetDocumentID(propertyID int) (int, error) {
	var documentID int
	err := s.DB.QueryRow("SELECT document_id FROM propertydocuments WHERE property_id = ?", propertyID).Scan(&documentID)
	if err != nil {
		return 0, nil
	}
	return documentID, nil
}

func (s *Store) GetDocumentByID(id int) (*types.PropertyDocument, error) {
	rows, err := s.DB.Query("SELECT * FROM propertydocuments WHERE document_id = ?", id)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	document := new(types.PropertyDocument)

	if rows.Next() {
		document, err = s.PropertyDocumentScans(rows)
		if err != nil {
			return nil, err
		}

	}

	if document.DocumentID == 0 {
		return nil, sql.ErrNoRows
	}

	return document, nil
}

func (s *Store) VerifyProperty(payload types.PropertyVerifyPayload) error{
	
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
		_, err = tx.Exec("UPDATE propertydocuments SET is_verified = ?, status = ? WHERE property_id = ?", true, "completed", payload.PropertyID)

		if err != nil {
			return err
		}

		_, err = tx.Exec("UPDATE properties SET is_verified = ? WHERE property_id = ?", true, payload.PropertyID)

		if err != nil {
			return err
		}
	} else if payload.Status == "rejected" {

		_, err = tx.Exec("UPDATE propertydocuments SET is_verified = ?, status = ?, message = ? WHERE property_id = ?", false, "rejected", payload.Message, payload.PropertyID)

		if err != nil {
			return err
		}
	}

	return nil
}


func (s *Store) PropertyDocumentScans(row *sql.Rows) (*types.PropertyDocument, error) {
	document := new(types.PropertyDocument)

	var message sql.NullString
	
	err := row.Scan(
		&document.DocumentID,
		&document.PropertyID,
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