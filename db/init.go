package db

import (
	"database/sql"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func GetDb() *gorm.DB {
	dsn := "host=localhost user=genos password=genos dbname=awesome port=5432 sslmode=disable TimeZone=Asia/Kolkata"
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
	db := GetDb()
	db.AutoMigrate(models...)
}

func T() {

}
