package auth

import "github.com/m3rashid/awesome/db"

const USER_GROUP_MODEL_NAME = "usergroups"

type UserGroup struct {
	db.BaseModel
	GroupName   string `json:"groupName" gorm:"column:groupName" validate:"required"`
	Description string `json:"description" gorm:"column:description" validate:""`
	Users       []uint `json:"users" gorm:"column:users;type:integer[]" validate:""`
}

func (UserGroup) TableName() string {
	return USER_GROUP_MODEL_NAME
}
