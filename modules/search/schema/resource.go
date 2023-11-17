package search

const RESOURCE_MODEL_NAME = "resources"

type Resource struct {
	ID           uint   `gorm:"primary_key" json:"id"`
	Name         string `json:"name" gorm:"column:name" validate:"required"`
	Description  string `json:"desc" gorm:"column:desc" validate:""`
	ResourceID   uint   `json:"rId" gorm:"column:rId" validate:"required"`
	ResourceType string `json:"rType" gorm:"column:rType" validate:"required"`
}

func (Resource) TableName() string {
	return RESOURCE_MODEL_NAME
}

// Not a model but a helper struct for the search module
type ResourceIndex struct {
	NameKey        string
	DescriptionKey string
	DisplayUrl     string
}
