package models

const TOXICITY_MODEL_NAME = "toxicities"

type Toxicity struct {
	BaseModel
}

func (*Toxicity) TableName() string {
	return TOXICITY_MODEL_NAME
}
