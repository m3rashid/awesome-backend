package models

const DASHBOARD_MODEL_NAME = "dashboards"
const DASHBOARD_WIDGET_MODEL_NAME = "dashboard_widgets"

type DashboardStatus string

const (
	DashboardStatusDraft     DashboardStatus = "draft"
	DashboardStatusPublished DashboardStatus = "published"
)

type DashboardWidget struct {
	BaseModel
	ModelName   string     `json:"modelName" gorm:"modelName" validate:"required"`
	Name        string     `json:"name" gorm:"column:name;not null" validate:"required"`
	XField      string     `json:"xField" gorm:"column:xField;not null" validate:"required"`
	YField      string     `json:"yField" gorm:"column:yField;not null" validate:"required"`
	XPosition   int        `json:"xPosition" gorm:"column:xPosition;not null" validate:"required"`
	YPosition   int        `json:"yPosition" gorm:"column:yPosition;not null" validate:"required"`
	Width       int        `json:"width" gorm:"column:width;not null" validate:"required"`
	Height      int        `json:"height" gorm:"column:height;not null" validate:"required"`
	ChartType   string     `json:"chartType" gorm:"column:chartType;not null" validate:"required"`
	DashboardID uint       `json:"dashboardId" gorm:"column:dashboardId;not null" validate:"required"`
	Dashboard   *Dashboard `json:"dashboard" gorm:"column:dashboardId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" validate:""`
}

type Dashboard struct {
	BaseModel
	Name        string          `json:"name" gorm:"column:name;not null" validate:"required"`
	Description string          `json:"description" gorm:"column:description" validate:""`
	Status      DashboardStatus `json:"status" gorm:"column:status;default:pending" validate:""`
}

func (*Dashboard) TableName() string {
	return DASHBOARD_MODEL_NAME
}

func (*DashboardWidget) TableName() string {
	return DASHBOARD_WIDGET_MODEL_NAME
}
