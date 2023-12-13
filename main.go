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
	"github.com/m3rashid/awesome/cmd"
	"github.com/m3rashid/awesome/db"
	"github.com/m3rashid/awesome/module"
	"github.com/m3rashid/awesome/modules/auth"
	"github.com/m3rashid/awesome/modules/community"
	"github.com/m3rashid/awesome/modules/crm"
	"github.com/m3rashid/awesome/modules/dashboard"
	"github.com/m3rashid/awesome/modules/drive"
	"github.com/m3rashid/awesome/modules/emails"
	"github.com/m3rashid/awesome/modules/forms"
	"github.com/m3rashid/awesome/modules/permissions"
	"github.com/m3rashid/awesome/modules/projects"
	"github.com/m3rashid/awesome/modules/search"
	"github.com/m3rashid/awesome/modules/workflow"
	"github.com/m3rashid/awesome/utils"
	"github.com/m3rashid/awesome/ws"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	app := fiber.New(fiber.Config{
		CaseSensitive:         true,
		PassLocalsToViews:     true,
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

	err = db.Init()
	if err != nil {
		log.Fatal("Error connecting to database")
	}

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

	if os.Getenv("SERVER_MODE") == "production" {
		app.Use(limiter.New(limiter.Config{
			Max:               100,
			Expiration:        1 * time.Minute,
			LimiterMiddleware: limiter.SlidingWindow{},
		}))
	}

	if os.Getenv("SERVER_MODE") == "development" {
		app.Use(logger.New(logger.Config{
			Format: "${time} ${status} ${latency} ${method} ${path} ${body} ${query}\n",
		}))
	}

	allModules := []module.Module{
		crm.CRMModule,
		auth.AuthModule,
		drive.DriveModule,
		forms.FormsModule,
		emails.EmailModule,
		search.SearchModule,
		projects.ProjectModule,
		workflow.WorkflowModule,
		dashboard.DashboardModule,
		community.CommunityModule,
	}

	go ws.RunHub()
	ws.SetupWebsockets(app)
	module.RegisterRoutes(app, allModules)
	drive.RegisterDriveRoutes(app, utils.CheckAuthMiddleware)

	appShutDown := cmd.HandleCmdArgs(app, allModules, casbin)
	if appShutDown {
		fmt.Println("Server is gracefully shutting down")
		app.ShutdownWithTimeout(time.Millisecond * 100)
		return
	}

	log.Println("Server is running")
	app.Listen(":" + os.Getenv("SERVER_PORT"))
}
