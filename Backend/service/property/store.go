package property

import (
	"database/sql"
	"fmt"

	"learninggo/types"
	"learninggo/utils"
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
func (s *Store) UploadPropertyImage(propertyID int64, Image string) error {

	dir := "./uploads/property"

	fileName, err := utils.SaveImage(Image, dir)
	if err != nil {
		return err
	}
	_, err = s.DB.Exec("INSERT INTO propertyphotos (property_id, photo_url) VALUES (?,?)", propertyID, fileName)
	if err != nil {
		return err
	}
	return nil
}

func (s *Store) CreateHouse(payload types.PropertyHousePayload) error {

	result, err := s.DB.Exec("INSERT INTO properties (owner_id, title, description, price, property_type, property_category, state, city, postal_code,street_no, street_name, house_no, room_count, bathroom_count, size, balcony_count, parking_facility, floor_count) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", payload.Owner, payload.Title, payload.Description, payload.Price, payload.PropertyType, payload.PropertyCategory, payload.State, payload.City, payload.Postal, payload.StreetNo, payload.StreetName, payload.HouseNo, payload.RoomCount, payload.BathroomCount, payload.Size, payload.BalconyCount, payload.ParkingFacility, payload.FloorCount)

	if err != nil {
		return err
	}

	propertyId, err := result.LastInsertId()

	if err != nil {
		return err
	}

	for _, image := range payload.Image {
		err := s.UploadPropertyImage(propertyId, image)
		if err != nil {
			return err
		}
	}
	return nil
}
func (s *Store) CreateApartment(payload types.PropertyApartmentPayload) error {

	result, err := s.DB.Exec("INSERT INTO properties (owner_id, title, description, price, property_type, property_category, state, city, postal_code,street_no, street_name, house_no, room_count, bathroom_count, size, balcony_count, parking_facility, floor_no) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", payload.Owner, payload.Title, payload.Description, payload.Price, payload.PropertyType, payload.PropertyCategory, payload.State, payload.City, payload.Postal, payload.StreetNo, payload.StreetName, payload.HouseNo, payload.RoomCount, payload.BathroomCount, payload.Size, payload.BalconyCount, payload.ParkingFacility, payload.FloorNo)

	if err != nil {
		return err
	}

	propertyId, err := result.LastInsertId()

	if err != nil {
		return err
	}

	for _, image := range payload.Image {
		err := s.UploadPropertyImage(propertyId, image)
		if err != nil {
			return err
		}
	}
	return nil
}

func (s *Store) CreateCommercial(payload types.PropertyCommercialPayload) error {

	result, err := s.DB.Exec("INSERT INTO properties (owner_id, title, description, price, property_type, property_category, state, city, postal_code,street_no, street_name, house_no, size, parking_facility, floor_count) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", payload.Owner, payload.Title, payload.Description, payload.Price, payload.PropertyType, payload.PropertyCategory, payload.State, payload.City, payload.Postal, payload.StreetNo, payload.StreetName, payload.HouseNo, payload.Size, payload.ParkingFacility, payload.FloorNo)

	if err != nil {
		return err
	}

	propertyId, err := result.LastInsertId()

	if err != nil {
		return err
	}

	for _, image := range payload.Image {
		err := s.UploadPropertyImage(propertyId, image)
		if err != nil {
			return err
		}
	}
	return nil
}

func (s *Store) GetAllProperty(filters types.PropertyFilters, ptype string) ([]*types.Property,int, error) {
	offset := (filters.Page - 1) * filters.Limit
	query := `SELECT p.property_id, p.owner_id, p.title, p.description, p.price, p.property_type, p.property_category, p.state, p.city, p.status, p.is_verified, pp.photo_url
	          FROM properties p
	          LEFT JOIN (
	              SELECT property_id, MIN(photo_url) as photo_url
	              FROM propertyphotos
	              GROUP BY property_id
	          ) pp ON p.property_id = pp.property_id
	          WHERE p.status = 'available' AND p.is_verified = true`

	countQuery := `SELECT COUNT(*) FROM properties p WHERE p.status = 'available' AND p.is_verified = true`

	if ptype == "rent" {
		query += " AND p.property_type = 'rent'"
		countQuery += " AND p.property_type = 'rent'"
	} else {
		query += " AND p.property_type = 'sale'"
		countQuery += " AND p.property_type = 'sale'"
	}

	args := []interface{}{}
	countArgs := []interface{}{}
	if filters.Category != "" && filters.Category != "all" {
		query += " AND property_category = ?"
		countQuery += " AND property_category = ?"
		args = append(args, filters.Category)
		countArgs = append(countArgs, filters.Category)

	}

	if filters.State != "" {
		query += " AND state = ?"
		countQuery += " AND state = ?"
		args = append(args, filters.State)
		countArgs = append(countArgs, filters.State)

	}

	if filters.City != "" {
		query += " AND city = ?"
		countQuery += " AND city = ?"
		args = append(args, filters.City)
		countArgs = append(countArgs, filters.City)

	}

	if filters.PriceMin > 0 {
		query += " AND price >= ?"
		countQuery += " AND price >= ?"
		args = append(args, filters.PriceMin)
		countArgs = append(countArgs, filters.PriceMin)

	}

	if filters.PriceMax > 0 {
		query += " AND price <= ?"
		countQuery += " AND price <= ?"
		args = append(args, filters.PriceMax)
		countArgs = append(countArgs, filters.PriceMax)

	}

	if filters.Search != "" {
		query += " AND (title LIKE ? OR description LIKE ?)"
		countQuery += " AND (title LIKE ? OR description LIKE ?)"
		searchTerm := "%" + filters.Search + "%"
		args = append(args, searchTerm, searchTerm)
		countArgs = append(countArgs, searchTerm, searchTerm)

	}

	query += " ORDER BY property_id LIMIT ? OFFSET ?"

	args = append(args, filters.Limit, offset)
	rows, err := s.DB.Query(query, args...)
	if err != nil {
		return nil, 0, err
	}

	properties := make([]*types.Property, 0)

	for rows.Next() {
		p, err := s.ScanRowToProperty(rows)
		if err != nil {
			return nil, 0, err
		}
		properties = append(properties, p)
	}

	countRow := s.DB.QueryRow(countQuery, countArgs...)
	var count int
	err = countRow.Scan(&count)

	if err != nil {
		return nil, 0, err
	}
	fmt.Print(count)
	return properties, count, nil

}

func (s *Store) ScanRowToProperty(row *sql.Rows) (*types.Property, error) {
	p := new(types.Property)
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
	return p, nil
}
