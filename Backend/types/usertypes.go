package types

import (
	"time"
)


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
	DocumentID *int	    `json:"document_id"`
	Status	   *string   `json:"document_status"`

}

type Usershort struct {
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

type UserVerifyPayload struct {
	UserID 	   int 				`json:"user_id"`
	Status     string			`json:"status"`
	Message    string			`json:"message"`
}
