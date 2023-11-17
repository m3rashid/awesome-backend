package drive

import "github.com/m3rashid/awesome/db"

const FILE_MODEL_NAME = "files"

type File struct {
	db.BaseSchema `bson:",inline"`
	Name          string `json:"name" bson:"name" validate:"required"`
	Type          string `json:"type" bson:"type" validate:"required"`
	Parent        string `json:"parent" bson:"parent" validate:"required"`
	ResourceUrl   string `json:"resourceUrl" bson:"resourceUrl" validate:"required"`
	IsFolder      bool   `json:"isFolder" bson:"isFolder" validate:"required"`
}
