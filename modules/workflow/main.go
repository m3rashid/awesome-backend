package workflow

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/module"
)

var WorkflowModule = module.Module{
	Name: "workflow",
	Models: []interface{}{
		&models.Workflow{},
		&models.WorkflowStep{},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{
		"/list": {
			Description: "List all workflows",
			Controller:  controller.List[models.Workflow](models.WORKFLOW_MODEL_NAME),
		},
		"/create": {
			Description: "Create a workflow",
			Controller:  controller.Create[models.Workflow](),
		},
		"/update": {
			Description: "Update a workflow",
			Controller:  controller.Update[models.Workflow](models.WORKFLOW_MODEL_NAME),
		},
		"/get": {
			Description: "Get a workflow",
			Controller:  controller.Get[models.Workflow](),
		},
		"/step/create": {
			Description: "Create a workflow step",
			Controller:  controller.Create[models.WorkflowStep](),
		},
		"/step/update": {
			Description: "Update a workflow step",
			Controller:  controller.Update[models.WorkflowStep](models.WORKFLOW_STEP_MODEL_NAME),
		},
	},
	AnonymousRoutes: module.AnonymousRouteConfig{},
}
