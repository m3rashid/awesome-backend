package models

import (
	"encoding/json"

	"github.com/go-playground/validator/v10"
)

const FORMS_MODEL_NAME = "forms"

type Form struct {
	BaseModel
	JSONSchema  string `json:"jsonSchema" gorm:"column:jsonSchema;not null" validate:"required"`
	CreatedByID uint   `json:"createdById" gorm:"column:createdById;not null" validate:"required"`
	CreatedBy   *User  `json:"createdBy" gorm:"column:createdById;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
}

func (Form) TableName() string {
	return FORMS_MODEL_NAME
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
