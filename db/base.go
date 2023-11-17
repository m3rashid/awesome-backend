package db

import (
	"time"
)

type ActionLogModel struct {
	ID   uint      `json:"id,omitempty" gorm:"id,omitempty"`
	Time time.Time `json:"time,omitempty" gorm:"time,omitempty"`
}

type BaseModel struct {
	ID      uint `gorm:"primary_key" json:"id"`
	Deleted bool `gorm:"deleted" json:",omitempty" validate:""`
}
