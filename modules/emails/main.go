package emails

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/modules"
)

var EmailModule = modules.Module{
	Name: "emails",
	Models: []interface{}{
		&Email{},
	},
	Resources: []modules.Resource{
		{
			Name:         "email",
			ResourceType: EMAIL_MODEL_NAME,
		},
	},
	ProtectedRoutes: modules.RouteConfig{
		"/": {
			Description: "List all emails",
			Controller:  controller.List[Email](EMAIL_MODEL_NAME),
			Tests:       []modules.TestRoute{},
		},
	},
	AnonymousRoutes: modules.RouteConfig{},
}
