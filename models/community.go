package models

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
	BaseModel
	Title      string     `json:"title" gorm:"column:title" validate:""`
	Body       string     `json:"body" gorm:"column:body;not null" validate:"required"`
	UserID     uint       `json:"userId" gorm:"column:userId;not null" validate:"required"`
	User       *User      `json:"user" gorm:"column:userId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	TopicID    *uint      `json:"topicId" gorm:"column:topicId;not null" validate:"required"`
	Topic      *Topic     `json:"topic" gorm:"column:topicId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	ToxicScore float64    `json:"toxicScore" gorm:"column:toxicScore" validate:""`
	Status     PostStatus `json:"status" gorm:"column:status;default:pending" validate:""`
}

type Topic struct {
	BaseModel
	Name string `json:"name" gorm:"column:name;not null;unique" validate:"required"`
}

type Comment struct {
	BaseModel
	PostID      uint          `json:"postId" gorm:"column:postId;not null" validate:"required"`
	Post        *Post         `json:"post" gorm:"column:postId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	Body        string        `json:"body" gorm:"column:body;not null" validate:"required"`
	UserID      uint          `json:"userId" gorm:"column:userId;not null" validate:"required"`
	User        *User         `json:"user" gorm:"column:userId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	RepliedToID uint          `json:"repliedToId" gorm:"column:repliedToId" validate:""`
	RepliedTo   *Comment      `json:"repliedTo" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	ToxicScore  float64       `json:"toxicScore" gorm:"column:toxicScore" validate:""`
	Status      CommentStatus `json:"status" gorm:"column:status;default:pending" validate:""`
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
