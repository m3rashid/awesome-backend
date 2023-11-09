package auth

import "github.com/m3rashid/awesome/db"

const USER_GROUP_MODEL_NAME = "userGroups"

type UserGroup struct {
	db.BaseSchema `bson:",inline"`
	GroupName     string `json:"groupName" bson:"groupName" validate:"required"`
	Description   string `json:"description" bson:"description" validate:""`
	Users         []User `json:"users" bson:"users" validate:""`
}
