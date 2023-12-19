package models

import (
	"encoding/json"

	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

const FORMS_MODEL_NAME = "forms"
const FORM_RESPONSE_MODEL_NAME = "form_responses"

type Form struct {
	BaseModel
	Title        string `json:"title" gorm:"column:title;not null" validate:"required"`
	Description  string `json:"description" gorm:"column:description" validate:""`
	JSONSchema   string `json:"jsonSchema" gorm:"column:jsonSchema;not null" validate:"required"`
	CreatedByID  uint   `json:"createdById" gorm:"column:createdById;not null" validate:"required"`
	CreatedBy    *User  `json:"createdBy" gorm:"column:createdById;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	AuthRequired bool   `json:"authRequired" gorm:"column:authRequired;not null" validate:"required"`
	Visits       uint   `json:"visits" gorm:"column:visits;default:0" validate:""`
	ShareID      string `json:"shareId" gorm:"column:shareId;not null" validate:""`
	Published    bool   `json:"published" gorm:"column:published;default:false" validate:""`
}

func (form *Form) BeforeCreate(tx *gorm.DB) (err error) {
	form.ShareID = uuid.NewString()
	return
}

type Response struct {
	BaseModel
	FormID       uint   `json:"formId" gorm:"column:formId;not null" validate:"required"`
	Form         *Form  `json:"form" gorm:"column:formId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	ResponseData string `json:"responseData" gorm:"column:responseData;not null" validate:"required"`
	UserID       *uint  `json:"userId" gorm:"column:userId" validate:""`
	User         *User  `json:"user" gorm:"column:userId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
}

func (Form) TableName() string {
	return FORMS_MODEL_NAME
}

func (Response) TableName() string {
	return FORM_RESPONSE_MODEL_NAME
}

// not a database table
type JsonSchema struct {
	Schema   Schema                 `json:"schema" validate:"required"`
	UISchema map[string]interface{} `json:"uiSchema" validate:"required"`
}

type Schema struct {
	Title       string              `json:"title" validate:"required"`
	Description string              `json:"description" validate:"required"`
	Type        string              `json:"type" validate:"required"`
	Required    []string            `json:"required" validate:"required"`
	Properties  map[string]Property `json:"properties" validate:"required"`
}

type Property struct {
	Type      string   `json:"type" validate:"required"`
	Title     string   `json:"title" validate:"required"`
	Default   string   `json:"default" validate:""`
	Enum      []string `json:"enum" validate:""`
	MinLength int      `json:"minLength" validate:""`
	MaxLength int      `json:"maxLength" validate:""`
	// ...
}

func (f *Form) ValidateJsonSchema() error {
	var formJsonSchema JsonSchema
	err := json.Unmarshal([]byte(f.JSONSchema), &formJsonSchema)
	if err != nil {
		return err
	}

	validate := validator.New()
	err = validate.Struct(formJsonSchema)
	if err != nil {
		return err
	}

	return nil
}
