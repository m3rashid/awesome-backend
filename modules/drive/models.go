package drive

import "github.com/m3rashid/awesome/db"

const FILE_MODEL_NAME = "files"

type File struct {
	db.BaseModel
	Name        string `json:"name" gorm:"column:name;not null" validate:"required"`
	Type        string `json:"type" gorm:"column:type;not null" validate:"required"`
	Parent      uint   `json:"parent" gorm:"column:parent;not null" validate:"required"`
	ResourceUrl string `json:"resourceUrl" gorm:"column:resourceUrl;not null" validate:"required"`
	IsFolder    bool   `json:"isFolder" gorm:"column:isFolder;not null" validate:"required"`
}

func (File) TableName() string {
	return FILE_MODEL_NAME
}
