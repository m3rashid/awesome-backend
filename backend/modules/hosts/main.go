package hosts

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
	AnonymousRoutes: utils.AnonymousRouteConfig{},
}
