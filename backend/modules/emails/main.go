package emails

import (
	"awesome/controller"
	"awesome/models"
	"awesome/module"
)

var EmailModule = module.Module{
	Name: "emails",
	Models: []interface{}{
		&models.Email{},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{
		"/all": {
			Description: "List all emails",
			Controller:  controller.List[models.Email](models.EMAIL_MODEL_NAME, controller.ListOptions{}),
			Permissions: module.RoutePermissions{
				"email": module.LIST,
			},
		},
	},
	AnonymousRoutes: module.AnonymousRouteConfig{},
}
