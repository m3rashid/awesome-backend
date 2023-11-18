package helpers

import "time"

const PERMISSION_MODEL_NAME = "permissions"

type PermissionRelation int64

const (
	READ   PermissionRelation = 1
	WRITE  PermissionRelation = 2
	UPDATE PermissionRelation = 4
	OWNER  PermissionRelation = 8
)

type Permission struct {
	ID            uint   `gorm:"primary_key" json:"id"`
	User          uint   `json:"user" gorm:"column:user;not null" validate:"required"`
	Relation      int64  `json:"relation" gorm:"column:relation;not null" validate:"required"`
	Object        string `json:"object" gorm:"column:object;not null" validate:"required"` // object (_id) or group
	IsUserGroup   bool   `json:"isUserGroup" gorm:"column:isUserGroup;not null;default:false" validate:"required"`
	IsObjectGroup bool   `json:"isObjectGroup" gorm:"column:isObjectGroup;not null;default:false" validate:"required"`
}

func (Permission) TableName() string {
	return PERMISSION_MODEL_NAME
}

const RESOURCE_MODEL_NAME = "resources"

type Resource struct {
	ID           uint   `gorm:"primary_key" json:"id"`
	Name         string `json:"name" gorm:"column:name;not null" validate:"required"`
	Description  string `json:"description" gorm:"column:description" validate:""`
	ResourceID   uint   `json:"resourceId" gorm:"column:resourceId;not null" validate:"required"`
	ResourceType string `json:"resourceType" gorm:"column:resourceType;not null" validate:"required"`
}

func (Resource) TableName() string {
	return RESOURCE_MODEL_NAME
}

type ResourceIndex struct {
	NameKey        string
	DescriptionKey string
	DisplayUrl     string
}

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
