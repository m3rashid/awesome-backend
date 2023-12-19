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
	ProtectedRoutes: utils.ProtectedRouteConfig{
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
	AnonymousRoutes: utils.AnonymousRouteConfig{},
}
