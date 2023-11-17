package auth

import (
	"github.com/m3rashid/awesome/db"
)

const USER_MODEL_NAME = "users"

type User struct {
	db.BaseModel
	Name        string `json:"name" gorm:"column:name" validate:"required"`
	Email       string `json:"email" gorm:"column:email" validate:"required,email"`
	Phone       string `json:"phone,omitempty" gorm:"column:phone" validate:""`
	Avatar      string `json:"avatar,omitempty" gorm:"column:avatar" validate:""`
	Deactivated bool   `json:"deactivated" gorm:"column:deactivated" validate:""`
	Password    string `json:"password" gorm:"column:password" validate:"required"`
	Profile     uint   `json:"profile,omitempty" gorm:"column:profile" validate:""`
	Roles       []uint `json:"roles,omitempty" gorm:"column:roles;type:integer[]" validate:""`
}

func (User) TableName() string {
	return USER_MODEL_NAME
}
