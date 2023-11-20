package emails

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/models"
	"github.com/m3rashid/awesome/modules"
)

var EmailModule = modules.Module{
	Name: "emails",
	Models: []interface{}{
		&models.Email{},
	},
	Resources: []modules.Resource{
		{
			Name:         "email",
			ResourceType: models.EMAIL_MODEL_NAME,
			Permissions:  modules.ResourcePermissions{},
		},
	},
	ProtectedRoutes: modules.ProtectedRouteConfig{
		"/": {
			Description: "List all emails",
			Controller:  controller.List[models.Email](models.EMAIL_MODEL_NAME),
			Tests:       []modules.TestRoute{},
		},
	},
	AnonymousRoutes: modules.AnonymousRouteConfig{},
}
