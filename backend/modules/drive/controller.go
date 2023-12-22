package drive

import (
	"awesome/utils"
	"log"

	"github.com/gofiber/fiber/v2"
)

func GetSignedUrlForPut(*fiber.Ctx) error {
	presigner := utils.NewPresigner()
	log.Println(presigner)

	return nil
}

func GetSignedUrlForGet(*fiber.Ctx) error {
	return nil
}

func GetSignedUrlForDelete(*fiber.Ctx) error {
	return nil
}
