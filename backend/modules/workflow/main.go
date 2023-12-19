package workflow

import (
	"awesome/controller"
	"awesome/models"
	"awesome/module"
)

var WorkflowModule = module.Module{
	Name: "workflow",
	Models: []interface{}{
		&models.Workflow{},
		&models.WorkflowStep{},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{
		"/": {
			Description: "List all workflows",
			Controller: controller.List[models.Workflow](
				models.WORKFLOW_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/create": {
			Description: "Create a workflow",
			Controller: controller.Create[models.Workflow](
				models.WORKFLOW_MODEL_NAME,
				controller.WorkflowOptions[models.Workflow]{},
			),
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
			Controller: controller.Create[models.WorkflowStep](
				models.WORKFLOW_STEP_MODEL_NAME,
				controller.WorkflowOptions[models.WorkflowStep]{},
			),
		},
		"/step/update": {
			Description: "Update a workflow step",
			Controller:  controller.Update[models.WorkflowStep](models.WORKFLOW_STEP_MODEL_NAME),
		},
	},
	AnonymousRoutes: module.AnonymousRouteConfig{},
}
