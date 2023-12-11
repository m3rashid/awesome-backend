package models

const WORKFLOW_MODEL_NAME = "workflows"
const WORKFLOW_STEP_MODEL_NAME = "workflow_steps"

type TriggerAction = string

const (
	CreateAction TriggerAction = "create"
	UpdateAction TriggerAction = "update"
	DeleteAction TriggerAction = "delete"
)

type Workflow struct {
	BaseModel
	Name          string         `json:"name" gorm:"column:name;not null" validate:"required"`
	Description   string         `json:"description" gorm:"column:description" validate:""`
	TriggerModel  string         `json:"triggerModel" gorm:"column:triggerModel;not null" validate:"required"`
	TriggerAction TriggerAction  `json:"triggerAction" gorm:"column:triggerAction;not null" validate:"required"`
	Steps         []WorkflowStep `json:"steps" gorm:"foreignKey:workflowId" validate:""`
	// Steps         []*WorkflowStep `json:"steps" gorm:"many2many:workflowsteprelation" validate:""`
}

type WorkflowStep struct {
	BaseModel
	WorkflowID  uint   `json:"workflowId" gorm:"column:workflowId;not null" validate:"required"`
	Name        string `json:"name" gorm:"column:name;not null" validate:"required"`
	Description string `json:"description" gorm:"column:description" validate:""`

	// Workflow    *Workflow `json:"workflow" gorm:"column:workflowId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	// ActionType  string    `json:"actionType" gorm:"column:actionType;not null" validate:"required"`
}

func (*Workflow) TableName() string {
	return WORKFLOW_MODEL_NAME
}

func (*WorkflowStep) TableName() string {
	return WORKFLOW_STEP_MODEL_NAME
}
