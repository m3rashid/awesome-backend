package hosts

import (
	"awesome/controller"
	"awesome/models"
	"awesome/utils"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

var HostModule = utils.Module{
	Name:   "host",
	Models: []interface{}{},
	ProtectedRoutes: utils.ProtectedRouteConfig{
		"/create": {
			Description: "Create a tenant",
			Controller: controller.Create[models.Tenant](
				models.TENANT_MODEL_NAME,
				controller.CreateOptions[models.Tenant]{
					GetDB: utils.GetHostDB,
					PreCreate: func(ctx *fiber.Ctx, db *gorm.DB, tenant *models.Tenant) error {
						newDatabase, err := utils.CreateDatabase(tenant.Name, db)
						if err != nil {
							return err
						}

						tenant.TenantDBConnectionString = newDatabase
						tenant.TenantOwnerID = ctx.Locals("userId").(uint)
						return nil
					},
					PostCreate: func(ctx *fiber.Ctx, db *gorm.DB, tenant *models.Tenant) error {
						tenantDB, err := utils.GetTenantDB(tenant.TenantUrl)
						if err != nil {
							return err
						}

						err = utils.GormMigrate(tenantDB)
						return err
					},
				},
			),
		},
	},
	AnonymousRoutes: utils.AnonymousRouteConfig{},
}
