package models

import "time"

const USER_MODEL_NAME = "users"
const PROFILE_MODEL_NAME = "profiles"
const USER_GROUP_MODEL_NAME = "user_groups"
const TENANT_MODEL_NAME = "tenants"

type Tenant struct {
	ID        uint      `gorm:"primary_key;column:id" json:"id"`
	Name      string    `gorm:"column:name;not null" json:"name" validate:"required"`
	TenantUrl string    `gorm:"column:slug;not null" json:"slug" validate:"required"`
	CreatedAt time.Time `gorm:"column:createdAt; default:current_timestamp" json:"createdAt"`
}

type User struct {
	BaseModel
	Name        string `json:"name" gorm:"column:name;not null" validate:"required"`
	Email       string `json:"email" gorm:"column:email;unique;not null" validate:"required,email"`
	Phone       string `json:"phone,omitempty" gorm:"column:phone" validate:""`
	Avatar      string `json:"avatar,omitempty" gorm:"column:avatar" validate:""`
	Deactivated bool   `json:"deactivated" gorm:"column:deactivated" validate:""`
	Password    string `json:"password" gorm:"column:password;not null" validate:"required"`
}

type Profile struct {
	BaseModel
	UserID uint  `json:"userId" gorm:"column:userId;not null" validate:"required"`
	User   *User `json:"user" gorm:"column:userId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
}

type UserGroup struct {
	BaseModel
	GroupName   string  `json:"groupName" gorm:"column:groupName;not null;unique" validate:"required"`
	Description string  `json:"description" gorm:"column:description" validate:""`
	Users       []*User `json:"users" gorm:"many2many:role_user_relation" validate:""`
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

func (*Tenant) TableName() string {
	return TENANT_MODEL_NAME
}

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
