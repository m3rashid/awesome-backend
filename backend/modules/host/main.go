package host

import (
	"awesome/controller"
	"awesome/models"
	"awesome/utils"
)

var HostModule = utils.Module{
	Name:   "host",
	Models: []interface{}{
		// Tenant module is not listed here,
		// because we don't want to create tenant table in the tenant's database
	},
	ProtectedRoutes: utils.ProtectedRouteConfig{
		"/init": {
			Description: "Init automatic auth at refresh",
			Controller:  utils.GetInitialUser(utils.AuthControllerOptions{}),
		},
		"/create": {
			Description: "Create a tenant",
			Controller:  CreateTenant,
		},
		"/list": {
			Description: "List all tenants",
			Controller: controller.List[models.Tenant](
				models.TENANT_MODEL_NAME,
				controller.ListOptions{
					GetDB: utils.GetHostDB,
				},
			),
		},
		"/get": {
			Description: "Get a tenant by id",
			Controller: controller.Get[models.Tenant](
				controller.GetOptions[models.Tenant]{
					GetDB: utils.GetHostDB,
				},
			),
		},
		"/update": {
			Description: "Update a tenant by id",
			Controller: controller.Update[models.Tenant](
				models.TENANT_MODEL_NAME,
				controller.UpdateOptions[models.Tenant]{
					GetDB: utils.GetHostDB,
				},
			),
		},
	},
	AnonymousRoutes: utils.AnonymousRouteConfig{
		"/login": {
			Description: "Host Login",
			Controller:  utils.Login(utils.AuthControllerOptions{}),
		},
		"/register": {
			Description: "Host Register",
			Controller:  utils.Register(utils.AuthControllerOptions{}),
		},
	},
}
