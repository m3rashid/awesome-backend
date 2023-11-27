package models

import "github.com/m3rashid/awesome/db"

const LEAD_MODEL_NAME = "leads"
const LEAD_TASK_MODEL_NAME = "leadtasks"
const LEAD_TIMELINE_EVENT_MODEL_NAME = "leadtimelineevents"
const CAMPAIGN_MODEL_NAME = "campaigns"
const REFERRAL_MODEL_NAME = "referrals"

type LeadStatus string
type LeadTaskStatus string
type CallType string

type Lead struct {
	db.BaseModel
	Name     string               `json:"name" gorm:"column:name;not null" validate:"required"`
	Email    string               `json:"email" gorm:"column:email;unique;not null" validate:"required,email"`
	Phone    string               `json:"phone,omitempty" gorm:"column:phone" validate:""`
	Address  string               `json:"address,omitempty" gorm:"column:address" validate:""`
	Notes    string               `json:"notes,omitempty" gorm:"column:note" validate:""`
	Tasks    []*LeadTask          `json:"tasks,omitempty" gorm:"references:leadId" validate:""`
	TimeLine []*LeadTimelineEvent `json:"timeLine,omitempty" gorm:"references:leadId" validate:""`
	Status   LeadStatus           `json:"status,omitempty" gorm:"column:status;not null" validate:"required"`
}

type LeadTask struct {
	db.BaseModel
	LeadID uint           `json:"leadId" gorm:"column:leadId;not null" validate:"required"`
	Time   string         `json:"time" gorm:"column:time;not null" validate:"required"`
	Note   string         `json:"note,omitempty" gorm:"column:note" validate:""`
	Status LeadTaskStatus `json:"status" gorm:"column:status;not null" validate:"required"`
}

type LeadTimelineEvent struct {
	db.BaseModel
	LeadID              uint     `json:"leadId" gorm:"column:leadId;not null" validate:"required"`
	Time                string   `json:"time" gorm:"column:time;not null" validate:"required"`
	Notes               string   `json:"notes,omitempty" gorm:"column:note" validate:""`
	NextConnectDateTime string   `json:"nextConnectDateTime" gorm:"column:nextConnectDateTime" validate:""`
	CallType            CallType `json:"callType" gorm:"column:callType" validate:""`
	AttendedBy          *User    `json:"attendedBy" gorm:"references:id" validate:""`
}

type Campaign struct {
	db.BaseModel
	Name        string      `json:"name" gorm:"column:name;not null" validate:"required"`
	Description string      `json:"description" gorm:"column:description" validate:""`
	ValidTill   string      `json:"validTill" gorm:"column:validTill" validate:""`
	ValidFrom   string      `json:"validFrom" gorm:"column:validFrom" validate:""`
	Referrals   []*Referral `json:"referrals" gorm:"references:campaignId" validate:""`
}

type Referral struct {
	db.BaseModel
	CampaignID  uint    `json:"campaignId" gorm:"column:campaignId" validate:"required"`
	Referrer    *User   `json:"referrer" gorm:"references:id" validate:""`
	Description string  `json:"description" gorm:"column:description" validate:""`
	Code        string  `json:"code" gorm:"column:code;not null" validate:"required"`
	Active      bool    `json:"active" gorm:"column:active;not null" validate:"required"`
	Discount    float64 `json:"discount" gorm:"column:discount;not null" validate:"required"`
}

func (*Lead) TableName() string {
	return LEAD_MODEL_NAME
}

func (*LeadTask) TableName() string {
	return LEAD_TASK_MODEL_NAME
}

func (*LeadTimelineEvent) TableName() string {
	return LEAD_TIMELINE_EVENT_MODEL_NAME
}

func (*Campaign) TableName() string {
	return CAMPAIGN_MODEL_NAME
}

func (*Referral) TableName() string {
	return REFERRAL_MODEL_NAME
}
