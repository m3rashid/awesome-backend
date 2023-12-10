package models

const POST_MODEL_NAME = "posts"
const COMMENT_MODEL_NAME = "comments"
const FRIENDSHIP_MODEL_NAME = "friendships"
const FRIEND_REQUEST_MODEL_NAME = "friendrequests"

type PostStatus string
type CommentStatus string
type FriendRequestStatus string

const (
	PostStatusPending PostStatus = "pending"
	PostStatusActive  PostStatus = "active"
)

const (
	CommentStatusPending CommentStatus = "pending"
	CommentStatusActive  CommentStatus = "active"
)

const (
	FriendRequestStatusPending   FriendRequestStatus = "pending"
	FriendRequestStatusConfirmed FriendRequestStatus = "confirmed"
)

type Post struct {
	BaseModel
	Body       string     `json:"body" gorm:"column:body;not null" validate:"required"`
	UserID     uint       `json:"userId" gorm:"column:userId;not null" validate:"required"`
	User       *User      `json:"user" gorm:"column:userId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	ToxicScore float64    `json:"toxicScore" gorm:"column:toxicScore" validate:""`
	Status     PostStatus `json:"status" gorm:"column:status;default:pending" validate:""`
}

type Comment struct {
	BaseModel
	PostID      uint          `json:"postId" gorm:"column:postId;not null" validate:"required"`
	Post        *Post         `json:"post" gorm:"column:postId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	Body        string        `json:"body" gorm:"column:body;not null" validate:"required"`
	UserID      uint          `json:"userId" gorm:"column:userId;not null" validate:"required"`
	User        *User         `json:"user" gorm:"column:userId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	RepliedToID uint          `json:"repliedToId" gorm:"column:repliedToId;default:null" validate:""`
	RepliedTo   *Comment      `json:"repliedTo" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	ToxicScore  float64       `json:"toxicScore" gorm:"column:toxicScore" validate:""`
	Status      CommentStatus `json:"status" gorm:"column:status;default:pending" validate:""`
}

type Friendship struct {
	BaseModel
	UserID   uint  `json:"userId" gorm:"column:userId;not null" validate:"required"`
	User     *User `json:"user" gorm:"column:userId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	FriendID uint  `json:"friendId" gorm:"column:friendId;not null" validate:"required"`
	Friend   *User `json:"friend" gorm:"column:friendId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
}

type FriendRequest struct {
	BaseModel
	FromID uint                `json:"fromId" gorm:"column:fromId;not null" validate:"required"`
	From   *User               `json:"from" gorm:"column:fromId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	ToID   uint                `json:"toId" gorm:"column:toId;not null" validate:"required"`
	To     *User               `json:"to" gorm:"column:toId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	Status FriendRequestStatus `json:"status" gorm:"column:status;default:pending" validate:""`
}

func (*Post) TableName() string {
	return POST_MODEL_NAME
}

func (*Comment) TableName() string {
	return COMMENT_MODEL_NAME
}

func (*Friendship) TableName() string {
	return FRIENDSHIP_MODEL_NAME
}

func (*FriendRequest) TableName() string {
	return FRIEND_REQUEST_MODEL_NAME
}
