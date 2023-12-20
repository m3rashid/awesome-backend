package models

import "time"

const TENANT_MODEL_NAME = "tenants"
const TENANT_CREATOR_MODEL_NAME = "tenant_creators"

type Tenant struct {
	ID                       uint      `gorm:"primary_key;column:id" json:"id"`
	Name                     string    `gorm:"column:name;not null" json:"name" validate:"required"`
	TenantUrl                string    `gorm:"column:tenantUrl;not null" json:"tenantUrl" validate:"required"`
	CreatedAt                time.Time `gorm:"column:createdAt; default:current_timestamp" json:"createdAt"`
	TenantDBConnectionString string    `gorm:"column:tenantDBConnectionString;not null;unique" json:"tenantDBConnectionString" validate:"required"`
	UserID                   uint      `json:"userId" gorm:"column:userId;not null" validate:"required"`
	User                     *User     `json:"user" gorm:"column:userId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
}

func (*Tenant) TableName() string {
	return TENANT_MODEL_NAME
}
