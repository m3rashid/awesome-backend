package forms

import (
	"awesome/controller"
	"awesome/models"
	"awesome/utils"
)

var FormsModule = utils.Module{
	Name: "forms",
	Models: []interface{}{
		&models.Form{},
		&models.Response{},
	},
	SchemaMap: utils.SchemaMap{
		models.FORMS_MODEL_NAME:         models.FormTableSchemaMap,
		models.FORM_RESPONSE_MODEL_NAME: models.FormResponseTableSchemaMap,
	},
	ProtectedRoutes: utils.ProtectedRoutes{
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
				controller.CreateOptions[models.Form]{},
			),
			Permissions: utils.RoutePermissions{
				"user": utils.CREATE,
			},
		},
	},
	AnonymousRoutes: utils.AnonymousRoutes{
		"/get": {
			Description: "Get form by id",
			Controller: controller.Get[models.Form](
				controller.GetOptions[models.Form]{},
			),
		},
		"/response": {
			Description: "Create response",
			Controller: controller.Create[models.Response](
				models.FORM_RESPONSE_MODEL_NAME,
				controller.CreateOptions[models.Response]{},
			),
		},
	},
}
