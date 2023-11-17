package permission

import (
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	permission "github.com/m3rashid/awesome/modules/permission/schema"
)

func CheckPermissionApi() fiber.Handler {
	return func(c *fiber.Ctx) error {
		checkBody := struct {
			UserId   uint                          `json:"userId" validate:"required"`
			ObjectId uint                          `json:"objectId" validate:"required"`
			Relation permission.PermissionRelation `json:"relation" validate:"required"`
		}{}

		err := c.BodyParser(&checkBody)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Missing required params")
		}

		validate := validator.New()
		err = validate.Struct(checkBody)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Validation Error")
		}

		check := CheckPermission(checkBody.UserId, checkBody.ObjectId, checkBody.Relation)
		return c.Status(http.StatusOK).JSON(fiber.Map{"allowed": check})
	}
}
