package property

import (
	"database/sql"

	// "fmt"
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

