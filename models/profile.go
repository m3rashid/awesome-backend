package models

import "github.com/m3rashid/awesome/db"

const PROFILE_MODEL_NAME = "profiles"

type Profile struct {
	db.BaseModel
}

func (Profile) TableName() string {
	return PROFILE_MODEL_NAME
}
