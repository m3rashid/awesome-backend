package utils

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

func CheckAuth(tokenString string) (*Claims, error) {
	if len(tokenString) < 7 {
		return &Claims{}, nil
	}

	clientToken := tokenString[7:]
	token, err := jwt.ParseWithClaims(
		clientToken,
		&Claims{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		},
	)

	if err != nil {
		return &Claims{}, err
	}

	claims, ok := token.Claims.(*Claims)
	if !ok {
		return &Claims{}, err
	}
	return claims, nil
}

func CheckAuthMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		clientToken := c.Get("Authorization")
		if clientToken == "" {
			return c.Status(fiber.StatusUnauthorized).SendString("No Authorization header provided")
		}

		claims, err := CheckAuth(clientToken)
		if err != nil {
			c.Status(fiber.StatusUnauthorized).SendString(err.Error())
		}

		c.Locals("email", claims.Email)
		c.Locals("userId", claims.UserID)
		c.Locals("authorized", true)

		return c.Next()
	}
}
