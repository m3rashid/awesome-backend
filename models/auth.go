package models

import "github.com/m3rashid/awesome/db"

const USER_MODEL_NAME = "users"
const PROFILE_MODEL_NAME = "profiles"
const USER_GROUP_MODEL_NAME = "usergroups"

type User struct {
	db.BaseModel
	Name        string  `json:"name" gorm:"column:name;not null" validate:"required"`
	Email       string  `json:"email" gorm:"column:email;unique;not null" validate:"required,email"`
	Phone       string  `json:"phone,omitempty" gorm:"column:phone" validate:""`
	Avatar      string  `json:"avatar,omitempty" gorm:"column:avatar" validate:""`
	Deactivated bool    `json:"deactivated" gorm:"column:deactivated" validate:""`
	Password    string  `json:"password" gorm:"column:password;not null" validate:"required"`
	ProfileID   Profile `json:"profileId" gorm:"foreignKey:id" validate:""`
}

type Profile struct {
	db.BaseModel
}

type UserGroup struct {
	db.BaseModel
	GroupName   string `json:"groupName" gorm:"column:groupName;not null;unique" validate:"required"`
	Description string `json:"description" gorm:"column:description" validate:""`
	Users       []User `json:"users" gorm:"many2many:roleusers" validate:""`
}

var UserTableSchemaMap = map[string]string{
	"name":        "string",
	"email":       "string",
	"phone":       "string",
	"avatar":      "string",
	"deactivated": "boolean",
	"password":    "string",
}
var ProfileTableSchemaMap = map[string]string{}

func (*User) TableName() string {
	return USER_MODEL_NAME
}

func (*Profile) TableName() string {
	return PROFILE_MODEL_NAME
}

func (*UserGroup) TableName() string {
	return USER_GROUP_MODEL_NAME
}

func GenerateFakeUsers(count int) []User {
	users := make([]User, count)
	for i := 0; i < count; i++ {
		// TODO: generate fake users from faker
	}
	return users
}
