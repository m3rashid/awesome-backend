package models

const RESOURCE_MODEL_NAME = "resources"

type ResourceIndex struct {
	NameKey        string
	DescriptionKey string
	DisplayUrl     string
}

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
