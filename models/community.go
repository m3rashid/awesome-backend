package models

import "github.com/m3rashid/awesome/db"

const POST_MODEL_NAME = "posts"
const TOPIC_MODEL_NAME = "topics"
const COMMENT_MODEL_NAME = "comments"

type PostStatus string
type CommentStatus string

const (
	PostStatusPending PostStatus = "pending"
	PostStatusActive  PostStatus = "active"
)

const (
	CommentStatusPending CommentStatus = "pending"
	CommentStatusActive  CommentStatus = "active"
)

type Post struct {
	db.BaseModel
	Title      string     `json:"title" gorm:"column:title" validate:""`
	Body       string     `json:"body" gorm:"column:body;not null" validate:"required"`
	User       User       `json:"user" gorm:"foreignKey:id" validate:"required"`
	Topic      Topic      `json:"topic" gorm:"foreignKey:id" validate:"required"`
	Comments   []Comment  `json:"comments" gorm:"foreignKey:postId"`
	ToxicScore float64    `json:"toxicScore" gorm:"column:toxicScore" validate:""`
	Status     PostStatus `json:"status" gorm:"column:status;default:pending" validate:""`
}

type Topic struct {
	db.BaseModel
	Name string `json:"name" gorm:"column:name;not null" validate:"required"`
}

type Comment struct {
	db.BaseModel
	PostID     uint          `json:"post_id" gorm:"column:postId;not null" validate:"required"`
	Body       string        `json:"body" gorm:"column:body;not null" validate:"required"`
	User       User          `json:"user" gorm:"foreignKey:id" validate:"required"`
	RepliedTo  *Comment      `json:"repliedTo" gorm:"foreignKey:id"`
	ToxicScore float64       `json:"toxicScore" gorm:"column:toxicScore" validate:""`
	Status     CommentStatus `json:"status" gorm:"column:status;default:pending" validate:""`
}

func (*Post) TableName() string {
	return POST_MODEL_NAME
}

func (*Topic) TableName() string {
	return TOPIC_MODEL_NAME
}

func (*Comment) TableName() string {
	return COMMENT_MODEL_NAME
}
