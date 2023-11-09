package emails

import (
	"github.com/m3rashid/awesome/controller"
	"github.com/m3rashid/awesome/modules"
	emails "github.com/m3rashid/awesome/modules/emails/schema"
)

var EmailModule = modules.Module{
	Name: "emails",
	Resources: []modules.Resource{
		{
			Name:         "email",
			ResourceType: emails.EMAIL_MODEL_NAME,
		},
	},
	ProtectedRoutes: modules.Controller{
		"/":    controller.List[emails.Email](emails.EMAIL_MODEL_NAME),
		"/add": controller.Create[emails.Email](emails.EMAIL_MODEL_NAME, map[string]interface{}{}),
	},
	AnonymousRoutes: modules.Controller{},
}
