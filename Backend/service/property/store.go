package property

import (
	"database/sql"
	"learninggo/types"
	"learninggo/utils"
	"strings"
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

func (s *Store) GetAllProperty(filters types.PropertyFilters, image bool) ([]*types.Property, int, error) {
	offset := (filters.Page - 1) * filters.Limit

	query := `SELECT p.property_id, p.owner_id, p.title, p.description, p.price, p.property_type, p.property_category, p.state, p.city, p.status, p.is_verified`
	if image {
		query += `, pp.photo_url`
	}

	query += ` FROM properties p`
	if image {
		query += ` LEFT JOIN (SELECT property_id, MIN(photo_url) as photo_url FROM propertyphotos GROUP BY property_id) pp ON p.property_id = pp.property_id`
	}

	countQuery := `SELECT COUNT(*) FROM properties p`
	if image {
		countQuery += ` LEFT JOIN (SELECT property_id, MIN(photo_url) as photo_url FROM propertyphotos GROUP BY property_id) pp ON p.property_id = pp.property_id`
	}

	var conditions []string
	var args []interface{}
	var countArgs []interface{}

	if filters.Type == "rent" {
		conditions = append(conditions, "p.property_type = 'rent'")
	} else if filters.Type == "sale" {
		conditions = append(conditions, "p.property_type = 'sale'")
	}

	if filters.Verified == "yes" {
		conditions = append(conditions, "p.is_verified = true")
	} else if filters.Verified == "no" {
		conditions = append(conditions, "p.is_verified = false")
	}

	if filters.Status != "" && filters.Status != "all" {
		conditions = append(conditions, "p.status = ?")
		args = append(args, filters.Status)
		countArgs = append(countArgs, filters.Status)
	}

	if filters.Category != "" && filters.Category != "all" {
		conditions = append(conditions, "p.property_category = ?")
		args = append(args, filters.Category)
		countArgs = append(countArgs, filters.Category)
	}

	if filters.State != "" {
		conditions = append(conditions, "p.state = ?")
		args = append(args, filters.State)
		countArgs = append(countArgs, filters.State)
	}

	if filters.City != "" {
		conditions = append(conditions, "p.city = ?")
		args = append(args, filters.City)
		countArgs = append(countArgs, filters.City)
	}

	if filters.PriceMin > 0 {
		conditions = append(conditions, "p.price >= ?")
		args = append(args, filters.PriceMin)
		countArgs = append(countArgs, filters.PriceMin)
	}

	if filters.PriceMax > 0 {
		conditions = append(conditions, "p.price <= ?")
		args = append(args, filters.PriceMax)
		countArgs = append(countArgs, filters.PriceMax)
	}

	if filters.Search != "" {
		conditions = append(conditions, "(p.title LIKE ? OR p.description LIKE ?)")
		searchTerm := "%" + filters.Search + "%"
		args = append(args, searchTerm, searchTerm)
		countArgs = append(countArgs, searchTerm, searchTerm)
	}

	if len(conditions) > 0 {
		query += " WHERE " + strings.Join(conditions, " AND ")
		countQuery += " WHERE " + strings.Join(conditions, " AND ")
	}

	query += " ORDER BY p.property_id LIMIT ? OFFSET ?"
	args = append(args, filters.Limit, offset)
	rows, err := s.DB.Query(query, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	properties := make([]*types.Property, 0)
	for rows.Next() {
		p, err := s.ScanRowToProperty(rows, image)
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

	return properties, count, nil
}

func (s *Store) GetPropertyByID(id int) (*types.PropertyFull, error) {
	rows, err := s.DB.Query("SELECT * FROM properties WHERE property_id = ?", id)
	if err != nil {
		return nil, err
	}

	p := new(types.PropertyFull)
	for rows.Next() {
		p, err = s.ScanRowToPropertyFull(rows)
		if err != nil {
			return nil, err
		}
	}

	if p.ID == 0 {
		return nil, nil
	}

	return p, nil
}
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

	return p, nil
}
