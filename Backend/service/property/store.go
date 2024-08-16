package property

import (
	"database/sql"
	"learninggo/types"
	"learninggo/utils"
	"strings"
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

func (s *Store) DashGetPropertyVerified(id int)([]*types.DashPropertyVerified, error) {
	rows, err := s.DB.Query(`SELECT p.property_id, p.title, p.description, p.price, p.property_type, p.property_category, p.state, p.city, GROUP_CONCAT(pp.photo_url) AS photo_urls, p.is_verified FROM 
    properties p JOIN propertyphotos pp ON p.property_id = pp.property_id WHERE p.is_verified = 1 AND p.owner_id = ? GROUP BY p.property_id ORDER BY 
        p.property_id DESC`, id)

	if err != nil {
		return nil , err
	}
	
	properties := make([]*types.DashPropertyVerified, 0)
	for rows.Next(){
		p, err := s.ScanRowToDashPropertyVerified(rows)

		if err != nil {
			return nil, err
		}
		properties = append(properties, p)
	}
	return properties, nil
}

func (s *Store) DashGetPropertyNotVerified(id int) ([]*types.DashPropertyNotVerified, error){
	rows, err := s.DB.Query(`SELECT p.property_id, p.title, p.description, p.price, p.property_type, p.property_category, p.state, p.city, GROUP_CONCAT(pp.photo_url) AS photo_urls, p.is_verified,pd.document_id, pd.status FROM properties p LEFT JOIN propertyphotos pp ON p.property_id = pp.property_id LEFT JOIN propertydocuments pd ON p.property_id = pd.property_id WHERE 
    p.is_verified = 0 AND p.owner_id = ? GROUP BY p.property_id, pd.document_id, pd.status ORDER BY 
        p.property_id DESC;`, id)
	if err != nil {
		return nil , err
	}

	properties := make([]*types.DashPropertyNotVerified, 0)

	for rows.Next(){
		p, err := s.ScanRowToDashPropertyNotVerified(rows)
		if err != nil {
			return nil, err
		}
		properties = append(properties, p)
	}
	return properties, nil
}