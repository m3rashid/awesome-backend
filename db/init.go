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
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Kolkata",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)

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
