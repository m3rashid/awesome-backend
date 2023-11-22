package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/favicon"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"github.com/m3rashid/awesome/module"
	"github.com/m3rashid/awesome/modules/auth"
	"github.com/m3rashid/awesome/modules/drive"
	"github.com/m3rashid/awesome/modules/emails"
	"github.com/m3rashid/awesome/modules/helpers"
	"github.com/m3rashid/awesome/modules/permissions"
	"github.com/m3rashid/awesome/modules/search"
	"github.com/m3rashid/awesome/utils"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	app := fiber.New(fiber.Config{
		CaseSensitive:         true,
		AppName:               os.Getenv("APP_NAME"),
		RequestMethods:        []string{"GET", "POST", "HEAD", "OPTIONS"},
		Concurrency:           256 * 1024 * 1024,
		ServerHeader:          os.Getenv("APP_NAME"),
		DisableStartupMessage: true,
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
			}
			return ctx.Status(code).JSON(fiber.Map{
				"success": false,
				"message": err.Error(),
			})
		},
	})

	casbin := permissions.InitCasbin()
	app.Use(func(c *fiber.Ctx) error {
		c.Locals("casbin", casbin)
		return c.Next()
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowCredentials: true,
	}))

	app.Static("/public", "./public", fiber.Static{
		MaxAge:        3600,
		CacheDuration: 10 * time.Second,
	})

	app.Use(favicon.New(favicon.Config{
		File: "./public/icons/favicon.ico",
		URL:  "/favicon.ico",
	}))

	app.Use(limiter.New(limiter.Config{
		Max:               60,
		Expiration:        1 * time.Minute,
		LimiterMiddleware: limiter.SlidingWindow{},
	}))

	app.Use(logger.New())

	allModules := []module.Module{
		auth.AuthModule,
		drive.DriveModule,
		emails.EmailModule,
		search.SearchModule,
	}

	module.RegisterRoutes(app, allModules)
	drive.RegisterDriveRoutes(app, helpers.CheckAuth)

	appShutDown := utils.HandleCmdArgs(app, allModules, casbin)
	if appShutDown {
		fmt.Println("Server is gracefully shutting down")
		app.ShutdownWithTimeout(time.Millisecond * 100)
		return
	}

	log.Println("Server is running")
	app.Listen(":" + os.Getenv("SERVER_PORT"))
}
