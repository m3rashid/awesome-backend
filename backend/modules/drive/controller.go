package drive

import (
	"awesome/utils"
	"fmt"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
)

type SignedUrlForPutReqBody struct {
	FileName string `json:"fileName" validate:"required"`
}

func GetSignedUrlForPut(ctx *fiber.Ctx) error {
	reqBody := SignedUrlForPutReqBody{}
	err := ctx.BodyParser(&reqBody)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	if reqBody.FileName == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "fileName is required"})
	}

	presigner := utils.NewPresigner()
	objectKey := fmt.Sprint(time.Now().UnixNano()) + "-" + reqBody.FileName
	httrReq, err := presigner.PutObject(os.Getenv("AWS_S3_BUCKET_NAME"), objectKey, 60)
	if err != nil {
		return err
	}

	return ctx.JSON(fiber.Map{"url": httrReq.URL, "objectKey": objectKey})
}

func GetSignedUrlForGet(ctx *fiber.Ctx) error {
	return nil
}

func GetSignedUrlForDelete(ctx *fiber.Ctx) error {
	return nil
}
