package models

import (
	"errors"

	"github.com/m3rashid/awesome/db"
)

const EMAIL_MODEL_NAME = "emails"

type Email struct {
	db.BaseModel
	From        string      `json:"from" gorm:"column:from;not null" validate:"required,email"`
	To          string      `json:"to" gorm:"column:to;not null" validate:"required,email"`
	Subject     string      `json:"subject" gorm:"column:subject;not null" validate:"required"`
	BodyText    string      `json:"bodyText" gorm:"column:bodyText;not null" validate:"required"`
	BodyHTML    string      `json:"bodyHTML" gorm:"column:bodyHTML;not null" validate:"required"`
	Attachments []DriveFile `json:"attachments,omitempty" gorm:"many2many:emailattachments" validate:""`
	ReplyTo     string      `json:"replyTo" gorm:"column:replyTo" validate:"email"`
}

var EmailTableSchemaMap = map[string]string{
	"from":     "string",
	"to":       "string",
	"subject":  "string",
	"bodyText": "string",
	"bodyHTML": "string",
	"replyTo":  "string",
}

func (*Email) TableName() string {
	return EMAIL_MODEL_NAME
}

func NewEmail(from string, to string, subject string, bodyText string, bodyHtml string, replyTo string, attachments []DriveFile) (*Email, error) {
	if from == "" || to == "" || subject == "" || bodyText == "" {
		return nil, errors.New("missing required parameters")
	}

	if bodyHtml == "" {
		bodyHtml = bodyText
	}

	if replyTo == "" {
		replyTo = from
	}

	if attachments == nil {
		attachments = []DriveFile{}
	}

	return &Email{
		From:        from,
		To:          to,
		Subject:     subject,
		BodyText:    bodyText,
		BodyHTML:    bodyHtml,
		ReplyTo:     replyTo,
		Attachments: attachments,
	}, nil
}
