package emails

import (
	"errors"

	"github.com/m3rashid/awesome/db"
)

const EMAIL_MODEL_NAME = "emails"

type Attachment struct {
	db.BaseModel
	Filename string `gorm:"column:filename;not null" json:"filename" validate:"required"`
	Content  string `gorm:"column:content;not null" json:"content" validate:"required"`
}

type Email struct {
	db.BaseModel
	From        string       `json:"from" gorm:"column:from;not null" validate:"required,email"`
	To          string       `json:"to" gorm:"column:to;not null" validate:"required,email"`
	Subject     string       `json:"subject" gorm:"column:subject;not null" validate:"required"`
	BodyText    string       `json:"bodyText" gorm:"column:bodyText;not null" validate:"required"`
	BodyHTML    string       `json:"bodyHTML" gorm:"column:bodyHTML;not null" validate:"required"`
	Attachments []Attachment `json:"attachments,omitempty" gorm:"column:attachments;type:jsonb" validate:""`
	ReplyTo     string       `json:"replyTo" gorm:"column:replyTo" validate:"email"`
}

func (Email) TableName() string {
	return EMAIL_MODEL_NAME
}

func NewEmail(from string, to string, subject string, bodyText string, bodyHtml string, replyTo string, attachments []Attachment) (*Email, error) {
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
		attachments = []Attachment{}
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
