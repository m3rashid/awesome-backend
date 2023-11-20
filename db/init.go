package db

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func GetDb() *gorm.DB {
	var dsn string

	if os.Getenv("SERVER_MODE") == "test" {
		dsn = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Kolkata",
			os.Getenv("TEST_DB_HOST"),
			os.Getenv("TEST_DB_USER"),
			os.Getenv("TEST_DB_PASSWORD"),
			os.Getenv("TEST_DB_NAME"),
			os.Getenv("TEST_DB_PORT"),
		)
	} else if os.Getenv("SERVER_MODE") == "dev" {
		dsn = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Kolkata",
			os.Getenv("DEV_DB_HOST"),
			os.Getenv("DEV_DB_USER"),
			os.Getenv("DEV_DB_PASSWORD"),
			os.Getenv("DEV_DB_NAME"),
			os.Getenv("DEV_DB_PORT"),
		)
	} else if os.Getenv("SERVER_MODE") == "prod" {
		dsn = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Kolkata",
			os.Getenv("PROD_DB_HOST"),
			os.Getenv("PROD_DB_USER"),
			os.Getenv("PROD_DB_PASSWORD"),
			os.Getenv("PROD_DB_NAME"),
			os.Getenv("PROD_DB_PORT"),
		)
	} else {
		panic("Invalid server mode")
	}

	fmt.Println("Connecting to database...", dsn)

	sqlDB, err := sql.Open("pgx", dsn)
	if err != nil {
		panic(err)
	}
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	gormDB, err := gorm.Open(postgres.New(postgres.Config{Conn: sqlDB}), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	return gormDB
}

func GormMigrate(models ...interface{}) {
	fmt.Println("Migrating models...")
	db := GetDb()
	err := db.AutoMigrate(models...)
	if err != nil {
		fmt.Printf("Error migrating models: %v", err)
		return
	}

	fmt.Println("Migration completed, Migrated " + fmt.Sprint(len(models)) + " models")
}
