package property

import (
	"database/sql"
	"fmt"
	"learninggo/types"
	"strings"
)

func (s *Store) ScanRowToProperty(row *sql.Rows, image bool) (*types.Property, error) {
	p := new(types.Property)

	if image {
		err := row.Scan(
			&p.ID,
			&p.Owner,
			&p.Title,
			&p.Description,
			&p.Price,
			&p.PropertyType,
			&p.PropertyCategory,
			&p.State,
			&p.City,
			&p.Status,
			&p.Verified,
			&p.Image,
		)
		if err != nil {
			return nil, err
		}
	} else {
		err := row.Scan(
			&p.ID,
			&p.Owner,
			&p.Title,
			&p.Description,
			&p.Price,
			&p.PropertyType,
			&p.PropertyCategory,
			&p.State,
			&p.City,
			&p.Status,
			&p.Verified,
		)
		if err != nil {
			return nil, err
		}
	}

	return p, nil
}

func (s *Store) ScanRowToPropertyFull(row *sql.Rows) (*types.PropertyFull, error) {
	p := new(types.PropertyFull)

	var houseNo sql.NullInt32
	var roomCount sql.NullInt32
	var bathroomCount sql.NullInt32
	var size sql.NullInt32
	var balconyCount sql.NullInt32
	var parkingFacility sql.NullBool
	var floorNo sql.NullInt32
	var floorCount sql.NullInt32
	var photoURLs string

	err := row.Scan(
		&p.ID,
		&p.Owner,
		&p.Title,
		&p.Description, // Description (nullable)
		&p.Price,
		&p.PropertyType,
		&p.PropertyCategory,
		&p.State,
		&p.City,
		&p.Postal,
		&p.StreetNo,
		&p.StreetName,
		&houseNo,         // HouseNo (nullable)
		&roomCount,       // RoomCount (nullable)
		&bathroomCount,   // BathroomCount (nullable)
		&size,            // Size (nullable)
		&balconyCount,    // BalconyCount (nullable)
		&parkingFacility, // ParkingFacility (nullable)
		&floorNo,         // FloorNo (nullable)
		&floorCount,      // FloorCount (nullable)
		&p.Status,
		&p.Verified,
		&p.CreatedAt,
		&p.UpdatedAt,
		&photoURLs,
	)
	if err != nil {
		return nil, err
	}

	// Assign nullable values to PropertyFull fields
	if houseNo.Valid {
		p.HouseNo = &houseNo.Int32
	} else {
		p.HouseNo = nil
	}
	if roomCount.Valid {
		p.RoomCount = &roomCount.Int32
	} else {
		p.RoomCount = nil
	}
	if bathroomCount.Valid {
		p.BathroomCount = &bathroomCount.Int32
	} else {
		p.BathroomCount = nil
	}
	if size.Valid {
		p.Size = &size.Int32
	} else {
		p.Size = nil
	}
	if balconyCount.Valid {
		p.BalconyCount = &balconyCount.Int32
	} else {
		p.BalconyCount = nil
	}
	if parkingFacility.Valid {
		p.ParkingFacility = &parkingFacility.Bool
	} else {
		p.ParkingFacility = nil
	}
	if floorNo.Valid {
		p.FloorNo = &floorNo.Int32
	} else {
		p.FloorNo = nil
	}
	if floorCount.Valid {
		p.FloorCount = &floorCount.Int32
	} else {
		p.FloorCount = nil
	}
	p.Image = strings.Split(photoURLs, ",")

	return p, nil
}

func (s *Store) ScanRowToDashPropertyVerified(row *sql.Rows) (*types.DashPropertyVerified, error) {
	var photoURLs string
	property := new(types.DashPropertyVerified)

	err := row.Scan(
		&property.PropertyID,
		&property.Title,
		&property.Description,
		&property.Price,
		&property.Type,
		&property.Category,
		&property.State,
		&property.City,
		&photoURLs,
		&property.IsVerified,
	)
	if err != nil {
		fmt.Print(err.Error())
		return nil, err
	}

	property.PhotoURLs = strings.Split(photoURLs, ",")

	return property, nil
}

func (s *Store) ScanRowToDashPropertyNotVerified(row *sql.Rows) (*types.DashPropertyNotVerified, error) {
	property := new(types.DashPropertyNotVerified)
	var photoURLs string
	var docID sql.NullInt64
	var docStatus sql.NullString

	err := row.Scan(
		&property.PropertyID,
		&property.Title,
		&property.Description,
		&property.Price,
		&property.Type,
		&property.Category,
		&property.State,
		&property.City,
		&photoURLs,
		&property.IsVerified,
		&docID,
		&docStatus,
	)
	if err != nil {
		return nil, err
	}

	// Split the concatenated photo URLs into a slice
	property.PhotoURLs = strings.Split(photoURLs, ",")

	// Convert sql.NullInt64 to *int64
	if docID.Valid {
		property.DocumentID = &docID.Int64
	} else {
		property.DocumentID = nil
	}

	// Convert sql.NullString to *string
	if docStatus.Valid {
		property.Status = &docStatus.String
	} else {
		property.Status = nil
	}

	return property, nil
}

