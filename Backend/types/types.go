package types

import (
	"time"
)

type UserStore interface {
	GetUserByEmail(email string) (*Usershort, error)
	GetUserByID(id int) (*User, error)
	CreateUser(u *User) error
	GetAllUsers() ([]*User, error)
	UpdateUserName(id int, name string) error
	UpdateUserPhone(id int, phone string) error
	UpdateUserPassword(id int, password string) error
	UpdateUserImage(id int, image string) error
	UpdateUserEmail(id int, email string) error
	UpdateUserRole(id int, role string) error
	
	SubmitDocument(payload UserDocumentPayload) error
	UpdateDocument(payload UserDocumentPayload) error
	GetDocumentID(userID int) (int, error)
	GetDocumentByID(id int) (*UserDocument, error)
	VerifyUser(payload UserVerifyPayload) error
	GetAllPendingUsers(page int) ([]*User, int, error)
	
}

type PropertyStore interface {
	CreateHouse(payload PropertyHousePayload) error
	CreateApartment(payload PropertyApartmentPayload) error
	CreateCommercial(payload PropertyCommercialPayload) error
	GetAllProperty(payload PropertyFilters, image bool) ([]*Property, int, error)
	GetPropertyByID(id int) (*PropertyFull, error)
	// dashboardfuncs
	DashGetPropertyVerified(id int) ([]*DashPropertyVerified, error)
	DashGetPropertyNotVerified(id int) ([]*DashPropertyNotVerified, error)
	GetDocumentByID(id int) (*PropertyDocument, error)
	SubmitDocument(payload PropertyDocumentPayload) error
	UpdateDocument(payload PropertyDocumentPayload) error
	GetDocumentID(propertyID int) (int, error)
	GetAllPendingProperty(page int) ([]*DashPropertyNotVerified,int, error)
	VerifyProperty(payload PropertyVerifyPayload) error

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

// Define Prperty type

// Define Image type
type Image struct {
	ID        int       `json:"id"`
	Filename  string    `json:"filename"`
	Filepath  string    `json:"filepath"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
