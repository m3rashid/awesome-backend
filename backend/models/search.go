package models

import "time"

const ACTION_LOG_MODEL_NAME = "action_logs"
const RESOURCE_MODEL_NAME = "resources"

type ActionType string

const (
	Create ActionType = "create"
	Update ActionType = "update"
	Delete ActionType = "delete"
)

type ActionLog struct {
	ID       uint       `json:"id,omitempty" gorm:"id,omitempty"`
	Time     time.Time  `json:"time,omitempty" gorm:"time,omitempty"`
	UserID   uint       `json:"userId,omitempty" gorm:"userId;not null"`
	Action   ActionType `json:"action,omitempty" gorm:"action;not null"`
	ObjectID uint       `json:"objectId,omitempty" gorm:"objectId;not null"`
}

type Resource struct {
	ID           uint   `gorm:"primary_key" json:"id"`
	Name         string `json:"name" gorm:"column:name;not null" validate:"required"`
	Description  string `json:"description" gorm:"column:description" validate:""`
	ResourceID   uint   `json:"resourceId" gorm:"column:resourceId;not null" validate:"required"`
	ResourceType string `json:"resourceType" gorm:"column:resourceType;not null" validate:"required"`
}

var ActionLogTableSchemaMap = map[string]string{
	"time":     "time",
	"userId":   "number",
	"action":   "string",
	"objectId": "number",
}

func (*ActionLog) TableName() string {
	return ACTION_LOG_MODEL_NAME
}

func (*Resource) TableName() string {
	return RESOURCE_MODEL_NAME
}
