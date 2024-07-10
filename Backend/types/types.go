package types

import "time"

type UserStore interface {
	GetUserByEmail(email string) (*User, error)
	GetUserByID(id int) (*User, error)
	CreateUser(u *User) error
	GetAllUsers() ([]*User, error)
	UpdateUserName(id int , name string) error
	UpdateUserPhone(id int , phone string) error
	UpdateUserPassword(id int , password string) error
	UpdateUserRole(id int , role string) error
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

type UpdateUserNamePayload struct {
	ID   	 int   `json:"id"`
	Name 	 string `json:"username" validate:"required"`
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
	ID int `json:"id"`
}

// Define Image type
type Image struct {
	ID        int       `json:"id"`
	Filename  string    `json:"filename"`
	Filepath  string    `json:"filepath"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
