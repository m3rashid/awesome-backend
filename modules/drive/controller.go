package drive

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/adaptor"
)

func RegisterDriveRoutes(app *fiber.App, checkAuth fiber.Handler) *fiber.App {
	tusHandler := GetTusHandler(app)

	app.Delete("/stop", checkAuth, adaptor.HTTPHandlerFunc(tusHandler.DelFile))
	app.Get("/download", checkAuth, adaptor.HTTPHandlerFunc(tusHandler.GetFile))
	app.Head("/head", checkAuth, adaptor.HTTPHandlerFunc(tusHandler.HeadFile))
	app.Patch("/patch", checkAuth, adaptor.HTTPHandlerFunc(tusHandler.PatchFile))
	app.Post("/upload", checkAuth, adaptor.HTTPHandlerFunc(tusHandler.PostFile))
	app.Post("/upload-v2", checkAuth, adaptor.HTTPHandlerFunc(tusHandler.PostFileV2))

	return app
}
