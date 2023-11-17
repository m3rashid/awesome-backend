package drive

import "github.com/m3rashid/awesome/db"

const FILE_MODEL_NAME = "files"

type File struct {
	db.BaseModel
	Name        string `json:"name" gorm:"column:name" validate:"required"`
	Type        string `json:"type" gorm:"column:type" validate:"required"`
	Parent      string `json:"parent" gorm:"column:parent" validate:"required"`
	ResourceUrl string `json:"resourceUrl" gorm:"column:resourceUrl" validate:"required"`
	IsFolder    bool   `json:"isFolder" gorm:"column:isFolder" validate:"required"`
}

func (File) TableName() string {
	return FILE_MODEL_NAME
}
