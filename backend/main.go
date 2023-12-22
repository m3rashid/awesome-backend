package main

import (
	"log"
	"os"
	"time"

	"awesome/models"
	"awesome/modules/auth"
	"awesome/modules/community"
	"awesome/modules/crm"
	"awesome/modules/dashboard"
	"awesome/modules/drive"
	"awesome/modules/emails"
	"awesome/modules/forms"
	"awesome/modules/host"
	"awesome/modules/permissions"
	"awesome/modules/projects"
	"awesome/modules/search"
	"awesome/modules/workflow"
	"awesome/utils"
	"awesome/ws"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/favicon"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
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
			return ctx.Status(code).JSON(fiber.Map{"success": false, "message": err.Error()})
		},
	})

	app.Use(cors.New())

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

	casbin := permissions.InitCasbin()
	app.Use(func(c *fiber.Ctx) error {
		c.Locals("casbin", casbin)
		return c.Next()
	})

	allModules := []utils.Module{
		crm.CRMModule,
		auth.AuthModule,
		host.HostModule,
		drive.DriveModule,
		forms.FormsModule,
		emails.EmailModule,
		search.SearchModule,
		projects.ProjectModule,
		workflow.WorkflowModule,
		dashboard.DashboardModule,
		community.CommunityModule,
	}

	for _, module := range allModules {
		utils.Models = append(utils.Models, module.Models...)
	}

	go ws.RunHub()
	go workflow.RunWorkflowHub()
	ws.SetupWebsockets(app)
	utils.RegisterRoutes(app, allModules)

	db := utils.GetHostDB()
	db.AutoMigrate(&models.Tenant{}, &models.TenantOwner{})

	log.Println("Server is running")
	app.Listen(":" + os.Getenv("SERVER_PORT"))
}
