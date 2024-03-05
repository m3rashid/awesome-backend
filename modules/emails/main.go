package emails

import (
	"awesome/controller"
	"awesome/models"
	"awesome/utils"
)

var EmailModule = utils.Module{
	Name: "emails",
	Models: []interface{}{
		&models.Email{},
	},
	SchemaMap: utils.SchemaMap{
		models.EMAIL_MODEL_NAME: models.EmailTableSchemaMap,
	},
	ProtectedRoutes: utils.ProtectedRoutes{
		"/all": {
			Description: "List all emails",
			Controller: controller.List[models.Email](
				models.EMAIL_MODEL_NAME, controller.ListOptions{},
			),
			Permissions: utils.RoutePermissions{
				"email": utils.LIST,
			},
		},
	},
	AnonymousRoutes: utils.AnonymousRoutes{},
}
