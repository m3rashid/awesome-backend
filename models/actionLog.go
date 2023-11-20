package models

import "time"

const ACTION_LOG_MODEL_NAME = "actionlogs"

type Action string

const (
	Create Action = "create"
	Update Action = "update"
	Delete Action = "delete"
)

type ActionLog struct {
	ID       uint      `json:"id,omitempty" gorm:"id,omitempty"`
	Time     time.Time `json:"time,omitempty" gorm:"time,omitempty"`
	UserID   uint      `json:"userId,omitempty" gorm:"userId;not null"`
	Action   Action    `json:"action,omitempty" gorm:"action;not null"`
	ObjectID uint      `json:"objectId,omitempty" gorm:"objectId;not null"`
}

func (ActionLog) TableName() string {
	return ACTION_LOG_MODEL_NAME
}
