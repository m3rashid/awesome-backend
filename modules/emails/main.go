package emails

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/module"
)

var EmailModule = module.Module{
	Name: "emails",
	Models: []interface{}{
		&models.Email{},
	},
	Resources: module.Resources{
		models.EMAIL_MODEL_NAME: models.ResourceIndex{},
	},
	ProtectedRoutes: module.ProtectedRouteConfig{
		"/all": {
			Description: "List all emails",
			Controller:  controller.List[models.Email](models.EMAIL_MODEL_NAME),
			Permissions: module.RoutePermissions{
				"email": module.LIST,
			},
		},
	},
	AnonymousRoutes: module.AnonymousRouteConfig{},
}
