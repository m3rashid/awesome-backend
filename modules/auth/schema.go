package auth

import "github.com/m3rashid/awesome/db"

const PROFILE_MODEL_NAME = "profiles"

type Profile struct {
	db.BaseModel
}

func (Profile) TableName() string {
	return PROFILE_MODEL_NAME
}

const USER_MODEL_NAME = "users"

type User struct {
	db.BaseModel
	Name        string `json:"name" gorm:"column:name;not null" validate:"required"`
	Email       string `json:"email" gorm:"column:email;unique;not null" validate:"required,email"`
	Phone       string `json:"phone,omitempty" gorm:"column:phone;unique" validate:""`
	Avatar      string `json:"avatar,omitempty" gorm:"column:avatar" validate:""`
	Deactivated bool   `json:"deactivated" gorm:"column:deactivated" validate:""`
	Password    string `json:"password" gorm:"column:password;not null" validate:"required"`
	Profile     uint   `json:"profile,omitempty" gorm:"column:profile" validate:""`
	Roles       []uint `json:"roles,omitempty" gorm:"column:roles;type:integer[]" validate:""`
}

func (User) TableName() string {
	return USER_MODEL_NAME
}

const USER_GROUP_MODEL_NAME = "usergroups"

type UserGroup struct {
	db.BaseModel
	GroupName   string `json:"groupName" gorm:"column:groupName;not null;unique" validate:"required"`
	Description string `json:"description" gorm:"column:description" validate:""`
	Users       []uint `json:"users" gorm:"column:users;type:integer[]" validate:""`
}

func (UserGroup) TableName() string {
	return USER_GROUP_MODEL_NAME
}
