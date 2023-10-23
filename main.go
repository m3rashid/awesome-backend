package main

import (
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/favicon"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"github.com/m3rashid/awesome/modules"
	"github.com/m3rashid/awesome/modules/auth"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	app := fiber.New(fiber.Config{
		CaseSensitive:  true,
		AppName:        os.Getenv("APP_NAME"),
		RequestMethods: []string{"GET", "POST", "HEAD", "OPTIONS"},
	})

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

	modules.RegisterRoutes(app, []modules.Module{
		auth.AuthModule,
	})

	log.Println("Server is running")
	app.Listen(":" + os.Getenv("SERVER_PORT"))
}
