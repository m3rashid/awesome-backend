package models

import "github.com/m3rashid/awesome/db"

const USER_GROUP_MODEL_NAME = "usergroups"

type UserGroup struct {
	db.BaseModel
	GroupName   string `json:"groupName" gorm:"column:groupName;not null;unique" validate:"required"`
	Description string `json:"description" gorm:"column:description" validate:""`
	Users       []User `json:"users" gorm:"many2many:roleusers" validate:""`
}

func (UserGroup) TableName() string {
	return USER_GROUP_MODEL_NAME
}
