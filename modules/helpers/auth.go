package helpers

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

type Claims struct {
	Email  string `json:"email"`
	UserID string `json:"userId"`
	jwt.RegisteredClaims
}

func CheckAuth() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		clientToken := ctx.Get("Authorization")
		if clientToken == "" {
			return ctx.Status(fiber.StatusUnauthorized).SendString("No Authorization header provided")
		}

		clientToken = clientToken[7:]

		token, err := jwt.ParseWithClaims(clientToken, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})
		if err != nil {
			return ctx.Status(fiber.StatusUnauthorized).SendString(err.Error())
		}

		claims, ok := token.Claims.(*Claims)
		if !ok {
			return ctx.Status(fiber.StatusUnauthorized).SendString("The token is invalid")
		}

		ctx.Locals("email", claims.Email)
		ctx.Locals("userId", claims.UserID)
		ctx.Locals("authorized", true)

		return ctx.Next()
	}
}
