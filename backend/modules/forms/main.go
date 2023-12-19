package forms

import (
	"awesome/controller"
	"awesome/models"
	"awesome/module"
)

var FormsModule = module.Module{
	Name: "forms",
	Models: []interface{}{
		&models.Form{},
		&models.Response{},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{
		"": {
			Description: "List all forms",
			Controller: controller.List[models.Form](
				models.FORMS_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/responses": {
			Description: "List all responses of a form",
			Controller: controller.List[models.Response](
				models.FORM_RESPONSE_MODEL_NAME,
				controller.ListOptions{},
			),
		},
		"/create": {
			Description: "Create form",
			Controller: controller.Create[models.Form](
				models.FORM_RESPONSE_MODEL_NAME,
				controller.WorkflowOptions[models.Form]{},
			),
			Permissions: module.RoutePermissions{
				"user": module.CREATE,
			},
		},
	},
	AnonymousRoutes: module.AnonymousRouteConfig{
		"/get": {
			Description: "Get form by id",
			Controller:  controller.Get[models.Form](),
		},
		"/response": {
			Description: "Create response",
			Controller: controller.Create[models.Response](
				models.FORM_RESPONSE_MODEL_NAME,
				controller.WorkflowOptions[models.Response]{},
			),
		},
	},
}
