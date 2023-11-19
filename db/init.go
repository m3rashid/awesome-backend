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
	if os.Getenv("TESTING") == "true" {
		dsn = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Kolkata",
			os.Getenv("TEST_DB_HOST"),
			os.Getenv("TEST_DB_USER"),
			os.Getenv("TEST_DB_PASSWORD"),
			os.Getenv("TEST_DB_NAME"),
			os.Getenv("TEST_DB_PORT"),
		)
	} else {
		dsn = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Kolkata",
			os.Getenv("DB_HOST"),
			os.Getenv("DB_USER"),
			os.Getenv("DB_PASSWORD"),
			os.Getenv("DB_NAME"),
			os.Getenv("DB_PORT"),
		)
	}

	fmt.Println("Connecting to database...", dsn)

	sqlDB, err := sql.Open("pgx", dsn)
	if err != nil {
		panic(err)
	}
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	gormDB, err := gorm.Open(postgres.New(postgres.Config{
		Conn: sqlDB,
	}), &gorm.Config{})

	if err != nil {
		panic(err)
	}
	return gormDB
}

func GormMigrate(models ...interface{}) {
	fmt.Println("Migrating models...")
	db := GetDb()
	db.AutoMigrate(models...)
	fmt.Println("Migration completed, Migrated " + fmt.Sprint(len(models)) + " models")
}

func T() {

}
