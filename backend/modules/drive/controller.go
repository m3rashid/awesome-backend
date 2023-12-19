package drive

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/adaptor"
)

func RegisterDriveRoutes(app *fiber.App, checkAuth func() fiber.Handler) *fiber.App {
	tusHandler := GetTusHandler(app)

	app.Post("/api/files/:id", checkAuth(), adaptor.HTTPHandlerFunc(tusHandler.DelFile))
	app.Get("/api/files/:id", checkAuth(), adaptor.HTTPHandlerFunc(tusHandler.GetFile))
	app.Head("/api/files/:id", checkAuth(), adaptor.HTTPHandlerFunc(tusHandler.HeadFile))
	app.Post("/api/files/:id", checkAuth(), adaptor.HTTPHandlerFunc(tusHandler.PatchFile))
	app.Post("/api/files/", checkAuth(), adaptor.HTTPHandlerFunc(tusHandler.PostFileV2))
	// app.Post("/api/files/upload", checkAuth(), adaptor.HTTPHandlerFunc(tusHandler.PostFile))

	return app
}
