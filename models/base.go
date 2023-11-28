package models

type BaseModel struct {
	ID      uint `gorm:"primary_key;column:id" json:"id"`
	Deleted bool `gorm:"column:deleted;default:false" json:",omitempty" validate:""`
}
