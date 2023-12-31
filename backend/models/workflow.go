package models

const WORKFLOW_TEMPLATE_MODEL_NAME = "workflow_templates"
const WORKFLOW_STEP_MODEL_NAME = "workflow_steps"

type TriggerAction = string

const (
	CreateAction TriggerAction = "create"
	UpdateAction TriggerAction = "update"
	// DeleteAction TriggerAction = "delete"
)

type WorkflowAction struct {
	TriggerModel  string
	TriggerAction TriggerAction
	TenantUrl     string
	RetryIndex    uint
	ObjectID      uint
}

var Flows = make(chan WorkflowAction)

type Workflow struct {
	BaseModel
	TemplateID uint                   `json:"templateId" gorm:"column:templateId;not null" validate:"required"`
	Template   *WorkflowTemplate      `json:"template" gorm:"column:templateId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
	Data       map[string]interface{} `json:"-" gorm:"-" validate:""`
}

var WorkflowTableSchemaMap = map[string]string{
	"templateId": "number",
	"createdAt":  "time",
}

type WorkflowTemplate struct {
	BaseModel
	Name          string         `json:"name" gorm:"column:name;not null" validate:"required"`
	Description   string         `json:"description" gorm:"column:description" validate:""`
	TriggerModel  string         `json:"triggerModel" gorm:"column:triggerModel;not null" validate:"required"`
	TriggerAction TriggerAction  `json:"triggerAction" gorm:"column:triggerAction;not null" validate:"required"`
	Steps         []WorkflowStep `json:"steps" gorm:"foreignKey:workflowId" validate:""` // make it JSONB
}

var WorkflowTemplateTableSchemaMap = map[string]string{
	"name":          "string",
	"triggerModel":  "string",
	"triggerAction": "string",
	"createdAt":     "time",
}

type WorkflowStep struct {
	BaseModel
	Name       string `json:"name" gorm:"column:name;not null" validate:"required"`
	WorkflowID uint   `json:"workflowId" gorm:"column:workflowId;not null" validate:"required"`
}

func (*WorkflowTemplate) TableName() string {
	return WORKFLOW_TEMPLATE_MODEL_NAME
}

func (*WorkflowStep) TableName() string {
	return WORKFLOW_STEP_MODEL_NAME
}
