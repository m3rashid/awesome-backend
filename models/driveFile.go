package models

const DRIVE_FILE_MODEL_NAME = "drivefiles"

type DriveFile struct {
	BaseModel
	Name         string `json:"name" gorm:"column:name;not null" validate:"required"`
	Type         string `json:"type" gorm:"column:type;not null" validate:"required"`
	Parent       uint   `json:"parent" gorm:"column:parent;not null" validate:"required"`
	ResourceUrl  string `json:"resourceUrl" gorm:"column:resourceUrl;not null" validate:"required"`
	IsFolder     bool   `json:"isFolder" gorm:"column:isFolder;not null" validate:"required"`
	UploadedByID uint   `json:"uploadedById" gorm:"column:uploadedById;not null" validate:"required"`
	UploadedBy   *User  `json:"uploadedBy" gorm:"column:uploadedById;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
}

var DriveFileTableSchemaMap = map[string]string{
	"name":        "string",
	"type":        "string",
	"parent":      "number",
	"resourceUrl": "string",
	"isFolder":    "boolean",
}

func (*DriveFile) TableName() string {
	return DRIVE_FILE_MODEL_NAME
}
