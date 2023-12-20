package hosts

import (
	"awesome/controller"
	"awesome/models"
	"awesome/utils"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func CreateTenant(ctx *fiber.Ctx) error {
	return controller.Create[models.Tenant](
		models.TENANT_MODEL_NAME,
		controller.CreateOptions[models.Tenant]{
			GetDB: utils.GetHostDB,
			PreCreate: func(ctx *fiber.Ctx, db *gorm.DB, tenant *models.Tenant) error {
				newDatabase, err := utils.CreateDatabase(tenant.Name, db)
				if err != nil {
					return err
				}

				tenant.TenantDBConnectionString = newDatabase
				tenant.UserID = ctx.Locals("userId").(uint)
				return nil
			},
			PostCreate: func(ctx *fiber.Ctx, db *gorm.DB, tenant *models.Tenant) error {
				tenantDB, err := utils.GetTenantDB(tenant.TenantUrl)
				if err != nil {
					return err
				}

				err = utils.GormMigrate(tenantDB)
				if err != nil {
					return err
				}

				hostDB := utils.GetHostDB()
				var user models.User
				err = hostDB.First(&user, tenant.UserID).Error
				if err != nil {
					return err
				}

				tenantUser := models.User{
					Name:     user.Name,
					Password: user.Password,
					Email:    user.Email,
				}

				err = tenantDB.Create(&tenantUser).Error
				if err != nil {
					return err
				}

				return err
			},
		},
	)(ctx)
}
