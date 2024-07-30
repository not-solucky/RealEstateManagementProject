package types

import (
	"time"
)

type UserStore interface {
	GetUserByEmail(email string) (*User, error)
	GetUserByID(id int) (*User, error)
	CreateUser(u *User) error
	GetAllUsers() ([]*User, error)
	UpdateUserName(id int, name string) error
	UpdateUserPhone(id int, phone string) error
	UpdateUserPassword(id int, password string) error
	UpdateUserImage(id int, image string) error
	UpdateUserEmail(id int, email string) error
	UpdateUserRole(id int, role string) error
	VerifyUser(id int) error
}

type PropertyStore interface {
	CreateHouse(payload PropertyHousePayload) error
	CreateApartment(payload PropertyApartmentPayload) error
	CreateCommercial(payload PropertyCommercialPayload) error
}

type ImageStore interface {
	SaveImageInfo(filename, filepath string) error
	GetImageInfo(filename string) (*Image, error)
}
type UserContext struct {
	ID       int
	Role     string
	Verified bool
}
type User struct {
	ID        int       `json:"user_id"`
	Name      string    `json:"username"`
	Email     string    `json:"email"`
	Password  string    `json:"-"`
	Phone     string    `json:"phone_number"`
	ImagePath string    `json:"image"`
	Role      string    `json:"role"`
	Verified  bool      `json:"is_verified"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
type RegisterUserPayload struct {
	Email    string `json:"email" validate:"required,email"`
	Name     string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required,min=6,max=100"`
	Phone    string `json:"phone" validate:"required"`
}
type LoginUserPayload struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}
type UpdateUserImagePayload struct {
	ID    int    `json:"id"`
	Image string `json:"image" validate:"required"`
}
type UpdateUserNamePayload struct {
	ID       int    `json:"id"`
	Name     string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}
type UpdateUserPhonePayload struct {
	ID       int    `json:"id"`
	Phone    string `json:"phone" validate:"required"`
	Password string `json:"password" validate:"required"`
}
type UpdateUserPasswordPayload struct {
	ID          int    `json:"id"`
	OldPassword string `json:"old_password" validate:"required"`
	NewPassword string `json:"new_password" validate:"required,min=6,max=100"`
}
type UpdateUserEmailPayload struct {
	ID       int    `json:"id"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

// admin user types
type UpdateUserRolePayload struct {
	ID   int    `json:"id"`
	Role string `json:"role" validate:"required"`
}
type VerifyUserPayload struct {
	ID int `json:"id"`
}

// Define Prperty type
type Property struct {
	ID               int     `json:"property_id"`
	Owner            int     `json:"owner_id"`
	Title            string  `json:"title"`
	Description      string  `json:"description"`
	Price            float64 `json:"price"`
	PropertyType     string  `json:"property_type"`
	PropertyCategory string  `json:"property_category"`
	State            string  `json:"state"`
	City             string  `json:"city"`
	Status           string  `json:"status"`
	Verified         bool    `json:"is_verified"`
}
type PropertyHouse struct {
	ID               int     `json:"property_id"`
	Owner            int     `json:"owner_id"`
	Title            string  `json:"title"`
	Description      string  `json:"description"`
	Price            float64 `json:"price"`
	PropertyType     string  `json:"property_type"`
	PropertyCategory string  `json:"property_category"`
	State            string  `json:"state"`
	City             string  `json:"city"`
	Postal           string  `json:"postal_code"`
	StreetNo         int     `json:"street_no"`
	StreetName       string  `json:"street_name"`
	HouseNo          int     `json:"house_no"`
	RoomCount        int     `json:"room_count"`
	BathroomCount    int     `json:"bathroom_count"`
	Size             int     `json:"size"`
	BalconyCount     int     `json:"balcony_count"`
	ParkingFacility  bool    `json:"parking"`
	FloorCount       int     `json:"floor_count"`
	Status           string  `json:"status"`
	Verified         bool    `json:"is_verified"`
}
type PropertyCommercial struct {
	ID               int     `json:"property_id"`
	Owner            int     `json:"owner_id"`
	Title            string  `json:"title"`
	Description      string  `json:"description"`
	Price            float64 `json:"price"`
	PropertyType     string  `json:"property_type"`
	PropertyCategory string  `json:"property_category"`
	State            string  `json:"state"`
	City             string  `json:"city"`
	Postal           string  `json:"postal_code"`
	StreetNo         int     `json:"street_no"`
	StreetName       string  `json:"street_name"`
	HouseNo          int     `json:"house_no"`
	Size             int     `json:"size"`
	ParkingFacility  bool    `json:"parking"`
	FloorNo          int     `json:"floor_no"`
	Status           string  `json:"status"`
	Verified         bool    `json:"is_verified"`
}
type PropertyApartment struct {
	ID               int     `json:"property_id"`
	Owner            int     `json:"owner_id"`
	Title            string  `json:"title"`
	Description      string  `json:"description"`
	Price            float64 `json:"price"`
	PropertyType     string  `json:"property_type"`
	PropertyCategory string  `json:"property_category"`
	State            string  `json:"state"`
	City             string  `json:"city"`
	Postal           string  `json:"postal_code"`
	StreetNo         int     `json:"street_no"`
	StreetName       string  `json:"street_name"`
	HouseNo          int     `json:"house_no"`
	RoomCount        int     `json:"room_count"`
	BathroomCount    int     `json:"bathroom_count"`
	Size             int     `json:"size"`
	BalconyCount     int     `json:"balcony_count"`
	ParkingFacility  bool    `json:"parking"`
	FloorNo          int     `json:"floor_no"`
	Status           string  `json:"status"`
	Verified         bool    `json:"is_verified"`
}
type PropertyHousePayload struct {
	Owner            int      `json:"owner_id"`
	Title            string   `json:"title" validate:"required"`
	Description      string   `json:"description" validate:"required"`
	Price            float64  `json:"price" validate:"required"`
	PropertyType     string   `json:"property_type" validate:"required"`
	PropertyCategory string   `json:"property_category" validate:"required"`
	State            string   `json:"state" validate:"required"`
	City             string   `json:"city" validate:"required"`
	Postal           string   `json:"postal_code" validate:"required"`
	StreetNo         int      `json:"street_no" validate:"required"`
	StreetName       string   `json:"street_name" validate:"required"`
	HouseNo          int      `json:"house_no" validate:"required"`
	RoomCount        int      `json:"room_count" validate:"required"`
	BathroomCount    int      `json:"bathroom_count" validate:"required"`
	Size             int      `json:"size" validate:"required"`
	BalconyCount     int      `json:"balcony_count" validate:"required"`
	ParkingFacility  bool     `json:"parking" validate:"required"`
	FloorCount       int      `json:"floor_count" validate:"required"`
	Image            []string `json:"image" validate:"required"`
}
type PropertyApartmentPayload struct {
	Owner            int      `json:"owner_id"`
	Title            string   `json:"title" validate:"required"`
	Description      string   `json:"description" validate:"required"`
	Price            float64  `json:"price" validate:"required"`
	PropertyType     string   `json:"property_type" validate:"required"`
	PropertyCategory string   `json:"property_category" validate:"required"`
	State            string   `json:"state" validate:"required"`
	City             string   `json:"city" validate:"required"`
	Postal           string   `json:"postal_code" validate:"required"`
	StreetNo         int      `json:"street_no" validate:"required"`
	StreetName       string   `json:"street_name" validate:"required"`
	HouseNo          int      `json:"house_no" validate:"required"`
	RoomCount        int      `json:"room_count" validate:"required"`
	BathroomCount    int      `json:"bathroom_count" validate:"required"`
	Size             int      `json:"size" validate:"required"`
	BalconyCount     int      `json:"balcony_count" validate:"required"`
	ParkingFacility  bool     `json:"parking" validate:"required"`
	FloorNo          int      `json:"floor_no" validate:"required"`
	Image            []string `json:"image" validate:"required"`
}
type PropertyCommercialPayload struct {
	Owner            int      `json:"owner_id"`
	Title            string   `json:"title" validate:"required"`
	Description      string   `json:"description" validate:"required"`
	Price            float64  `json:"price" validate:"required"`
	PropertyType     string   `json:"property_type" validate:"required"`
	PropertyCategory string   `json:"property_category" validate:"required"`
	State            string   `json:"state" validate:"required"`
	City             string   `json:"city" validate:"required"`
	Postal           string   `json:"postal_code" validate:"required"`
	StreetNo         int      `json:"street_no" validate:"required"`
	StreetName       string   `json:"street_name" validate:"required"`
	HouseNo          int      `json:"house_no" validate:"required"`
	Size             int      `json:"size" validate:"required"`
	ParkingFacility  bool     `json:"parking" validate:"required"`
	FloorNo          int      `json:"floor_no" validate:"required"`
	Image            []string `json:"image" validate:"required"`
}

// Define Image type
type Image struct {
	ID        int       `json:"id"`
	Filename  string    `json:"filename"`
	Filepath  string    `json:"filepath"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
