package utils

import (
	"awesome/models"
	"log"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

// TOO MUCH REPEATS, make this better
// DRY for this file

type AuthControllerOptions struct {
	IsTenant bool
}

func Login(options AuthControllerOptions) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		loginBody := struct {
			Email    string `json:"email" validate:"required,email"`
			Password string `json:"password" validate:"required"`
		}{}

		err := ctx.BodyParser(&loginBody)
		if err != nil {
			return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{
				"message": "Bad Request",
			})
		}

		validate := validator.New()
		err = validate.Struct(loginBody)
		if err != nil {
			return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{
				"message": "Validation Error",
			})
		}

		if options.IsTenant {
			db, err := GetDbFromRequestOrigin(ctx)
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"message": "Could not login",
				})
			}

			var user models.User
			err = db.Where("email = ?", loginBody.Email).First(&user).Error
			if err != nil {
				log.Println(err)
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"message": "Could not find user",
				})
			}

			passwordsMatched := VerifyPassword(user.Password, loginBody.Password)
			if !passwordsMatched {
				return ctx.Status(http.StatusUnauthorized).JSON(fiber.Map{
					"message": "Credentials did not match",
				})
			}

			token, err := GenerateJWT(user.ID, user.Email)
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"message": "Could not generate token",
				})
			}

			return ctx.Status(http.StatusOK).JSON(fiber.Map{
				"user":  user,
				"token": token,
			})
		} else {
			db := GetHostDB()
			var user models.TenantOwner
			err = db.Where("email = ?", loginBody.Email).First(&user).Error

			if err != nil {
				log.Println(err)
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"message": "Could not find user",
				})
			}

			passwordsMatched := VerifyPassword(user.Password, loginBody.Password)
			if !passwordsMatched {
				return ctx.Status(http.StatusUnauthorized).JSON(fiber.Map{
					"message": "Credentials did not match",
				})
			}

			token, err := GenerateJWT(user.ID, user.Email)
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"message": "Could not generate token",
				})
			}

			return ctx.Status(http.StatusOK).JSON(fiber.Map{
				"user":  user,
				"token": token,
			})
		}
	}
}

func Register(options AuthControllerOptions) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		if options.IsTenant {
			newUser := models.User{}
			err := ctx.BodyParser(&newUser)
			if err != nil {
				log.Println(err)
				return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{
					"message": "Bad Request, not a user",
				})
			}

			newUser.Deactivated = false
			newUser.Deleted = false

			validator := validator.New()
			err = validator.Struct(newUser)
			if err != nil {
				log.Println(err)
				return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{
					"message": "Bad Request, validation failed",
				})
			}

			password := HashPassword(newUser.Password)
			newUser.Password = password

			db, err = GetDbFromRequestOrigin(ctx)
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"message": "Could not register",
				})
			}

			result := db.Create(&newUser)
			if result.Error != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"message": "Could Not Register User, Please try again later",
				})
			}

			newResource := models.Resource{
				Name:         newUser.Name,
				ResourceType: "users",
				ResourceID:   newUser.ID,
			}
			err = db.Create(&newResource).Error
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"message": "User registered, could not index user",
				})
			}
		} else {
			newUser := models.TenantOwner{}
			err := ctx.BodyParser(&newUser)
			if err != nil {
				log.Println(err)
				return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{
					"message": "Bad Request",
				})
			}

			validator := validator.New()
			err = validator.Struct(newUser)
			if err != nil {
				return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{
					"message": "Bad Request",
				})
			}

			password := HashPassword(newUser.Password)
			newUser.Password = password

			db = GetHostDB()
			result := db.Create(&newUser)
			if result.Error != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"message": "Could Not Register User, Please try again later",
				})
			}
		}

		return ctx.Status(http.StatusCreated).JSON(fiber.Map{
			"message": "User Registered Successfully",
		})
	}
}

func GetInitialUser(options AuthControllerOptions) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		if ctx.Locals("authorized") == nil || ctx.Locals("userId") == nil || ctx.Locals("email") == nil {
			return ctx.Status(http.StatusUnauthorized).JSON(fiber.Map{
				"message": "Unauthorized",
			})
		}

		if options.IsTenant {
			db, err := GetDbFromRequestOrigin(ctx)
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"message": "Could not login",
				})
			}

			var user models.User
			err = db.Where("id = ?", ctx.Locals("userId")).First(&user).Error
			if err != nil {
				log.Println(err)
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"message": "Could not find user",
				})
			}

			token, err := GenerateJWT(user.ID, user.Email)
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"message": "Could not generate token",
				})
			}

			return ctx.Status(http.StatusOK).JSON(fiber.Map{
				"user":  user,
				"token": token,
			})
		} else {
			db := GetHostDB()
			var user models.TenantOwner
			err := db.Where("id = ?", ctx.Locals("userId")).First(&user).Error
			if err != nil {
				log.Println(err)
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"message": "Could not find user",
				})
			}

			token, err := GenerateJWT(user.ID, user.Email)
			if err != nil {
				return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"message": "Could not generate token",
				})
			}

			return ctx.Status(http.StatusOK).JSON(fiber.Map{
				"user":  user,
				"token": token,
			})
		}
	}
}
