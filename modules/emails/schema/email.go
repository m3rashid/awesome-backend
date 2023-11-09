package emails

import (
	"errors"

	"github.com/m3rashid/awesome/db"
)

const EMAIL_MODEL_NAME = "emails"

type Attachment struct {
	Filename string `bson:"filename" json:"filename" validate:"required"`
	Content  string `bson:"content" json:"content" validate:"required"`
}

type Email struct {
	db.BaseSchema `bson:",inline"`
	From          string       `bson:"from" json:"from" validate:"required,email"`
	To            string       `bson:"to" json:"to" validate:"required,email"`
	Subject       string       `bson:"subject" json:"subject" validate:"required"`
	BodyText      string       `bson:"bodyText" json:"bodyText" validate:"required"`
	BodyHTML      string       `bson:"bodyHTML" json:"bodyHTML" validate:"required"`
	Attachments   []Attachment `bson:"attachments" json:"attachments" validate:""`
	ReplyTo       string       `bson:"replyTo" json:"replyTo" validate:"email"`
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
