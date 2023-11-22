package drive

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/adaptor"
)

func RegisterDriveRoutes(app *fiber.App, checkAuth func() fiber.Handler) *fiber.App {
	tusHandler := GetTusHandler(app)

	app.Post("/api/files/stop", checkAuth(), adaptor.HTTPHandlerFunc(tusHandler.DelFile))
	app.Get("/api/files/download", checkAuth(), adaptor.HTTPHandlerFunc(tusHandler.GetFile))
	app.Head("/api/files/head", checkAuth(), adaptor.HTTPHandlerFunc(tusHandler.HeadFile))
	app.Post("/api/files/patch", checkAuth(), adaptor.HTTPHandlerFunc(tusHandler.PatchFile))
	app.Post("/api/files/upload", checkAuth(), adaptor.HTTPHandlerFunc(tusHandler.PostFile))
	app.Post("/api/files/upload-v2", checkAuth(), adaptor.HTTPHandlerFunc(tusHandler.PostFileV2))

	return app
}
