package workflow

import (
	"awesome/controller"
	"awesome/models"
	"awesome/utils"
)

var WorkflowModule = utils.Module{
	Name: "workflow",
	Models: []interface{}{
		&models.Workflow{},
		&models.WorkflowStep{},
	},
	ProtectedRoutes: utils.ProtectedRouteConfig{
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
				controller.CreateOptions[models.Workflow]{},
			),
		},
		"/update": {
			Description: "Update a workflow",
			Controller: controller.Update[models.Workflow](
				models.WORKFLOW_MODEL_NAME,
				controller.UpdateOptions[models.Workflow]{},
			),
		},
		"/get": {
			Description: "Get a workflow",
			Controller: controller.Get[models.Workflow](
				controller.GetOptions[models.Workflow]{},
			),
		},
		"/step/create": {
			Description: "Create a workflow step",
			Controller: controller.Create[models.WorkflowStep](
				models.WORKFLOW_STEP_MODEL_NAME,
				controller.CreateOptions[models.WorkflowStep]{},
			),
		},
		"/step/update": {
			Description: "Update a workflow step",
			Controller: controller.Update[models.WorkflowStep](
				models.WORKFLOW_STEP_MODEL_NAME,
				controller.UpdateOptions[models.WorkflowStep]{},
			),
		},
	},
	AnonymousRoutes: utils.AnonymousRouteConfig{},
}
