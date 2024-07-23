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
type ImageStore interface {
	SaveImageInfo(filename, filepath string) error
	GetImageInfo(filename string) (*Image, error)
}
type UserContext struct {
	ID   int
	Role string
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

type HouseProperty struct {
	ID               int    `json:"property_id"`
	OwnerID          int    `json:"owner_id"`
	Title            string `json:"title"`
	Description      string `json:"description"`
	Price            int    `json:"price"`
	PropertyType     string `json:"property_type"`
	PropertyCategory string `json:"property_category"`
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
	State 			 string  `json:"state"`
	City			 string  `json:"city"`
	Status 			 string  `json:"status"`
	Verified 		 bool 	 `json:"is_verified"`
}
type PropertyHouse struct {
	ID               int     `json:"property_id"`
	Owner            int     `json:"owner_id"`
	Title            string  `json:"title"`
	Description      string  `json:"description"`
	Price            float64 `json:"price"`
	PropertyType     string  `json:"property_type"`
	PropertyCategory string  `json:"property_category"`
	State 			 string  `json:"state"`
	City			 string  `json:"city"`
	Postal			 string  `json:"postal_code"`
	StreetNo 		 int	 `json:"street_no"`
	StreetName		 string	 `json:"street_name"`  
	HouseNo			 int 	 `json:"house_no"`

	RoomCount		 int 	 `json:"room_count"`
	BathroomCount	 int 	 `json:"bathroom_count"`
	BalconyCount	 int 	 `json:"balcony_count"`
	Status 			 string  `json:"status"`
	Verified 		 bool 	 `json:"is_verified"`
}
type PropertyCommercial struct {
	ID               int     `json:"property_id"`
	Owner            int     `json:"owner_id"`
	Title            string  `json:"title"`
	Description      string  `json:"description"`
	Price            float64 `json:"price"`
	PropertyType     string  `json:"property_type"`
	PropertyCategory string  `json:"property_category"`

	State 			 string  `json:"state"`
	City			 string  `json:"city"`
	Postal			 string  `json:"postal_code"`
	StreetNo 		 int	 `json:"street_no"`
	StreetName		 string	 `json:"street_name"`  
	HouseNo			 int 	 `json:"house_no"`

	Status 			 string  `json:"status"`
	Verified 		 bool 	 `json:"is_verified"`
}
type PropertyApartment struct {
	ID               int     `json:"property_id"`
	Owner            int     `json:"owner_id"`
	Title            string  `json:"title"`
	Description      string  `json:"description"`
	Price            float64 `json:"price"`
	PropertyType     string  `json:"property_type"`
	PropertyCategory string  `json:"property_category"`

	State 			 string  `json:"state"`
	City			 string  `json:"city"`
	Postal			 string  `json:"postal_code"`
	StreetNo 		 int	 `json:"street_no"`
	StreetName		 string	 `json:"street_name"`  
	HouseNo			 int 	 `json:"house_no"`

	Status 			 string  `json:"status"`
	Verified 		 bool 	 `json:"is_verified"`
}

// Define Image type
type Image struct {
	ID        int       `json:"id"`
	Filename  string    `json:"filename"`
	Filepath  string    `json:"filepath"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
