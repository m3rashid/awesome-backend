package workflow

import (
	"awesome/controller"
	"awesome/models"
	"awesome/utils"
)

var WorkflowModule = utils.Module{
	Name: "workflow",
	Models: []interface{}{
		&models.WorkflowTemplate{},
		&models.WorkflowStep{},
	},
	SchemaMap: utils.SchemaMap{
		models.WORKFLOW_TEMPLATE_MODEL_NAME: models.WorkflowTableSchemaMap,
	},
	ProtectedRoutes: utils.ProtectedRoutes{
		"/templates": {
			Description: "List all workflow templates",
			Controller: controller.List[models.WorkflowTemplate](
				models.WORKFLOW_TEMPLATE_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/templates/create": {
			Description: "Create a workflow templaet",
			Controller: controller.Create[models.WorkflowTemplate](
				models.WORKFLOW_TEMPLATE_MODEL_NAME,
				controller.CreateOptions[models.WorkflowTemplate]{},
			),
		},
		"/templates/update": {
			Description: "Update a workflow template",
			Controller: controller.Update[models.WorkflowTemplate](
				models.WORKFLOW_TEMPLATE_MODEL_NAME,
				controller.UpdateOptions[models.WorkflowTemplate]{},
			),
		},
		"/templates/get": {
			Description: "Get a workflow template",
			Controller: controller.Get[models.WorkflowTemplate](
				controller.GetOptions[models.WorkflowTemplate]{},
			),
		},
		"/templates/steps/create": {
			Description: "Create a workflow step",
			Controller: controller.Create[models.WorkflowStep](
				models.WORKFLOW_STEP_MODEL_NAME,
				controller.CreateOptions[models.WorkflowStep]{},
			),
		},
		"/templates/steps/update": {
			Description: "Update a workflow step",
			Controller: controller.Update[models.WorkflowStep](
				models.WORKFLOW_STEP_MODEL_NAME,
				controller.UpdateOptions[models.WorkflowStep]{},
			),
		},
	},
	AnonymousRoutes: utils.AnonymousRoutes{},
}
