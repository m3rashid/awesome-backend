package models

import "github.com/m3rashid/awesome/db"

const TOXICITY_MODEL_NAME = "toxicities"

type Toxicity struct {
	db.BaseModel
}

func (*Toxicity) TableName() string {
	return TOXICITY_MODEL_NAME
}
