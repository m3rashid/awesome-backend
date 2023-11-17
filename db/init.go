package db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func GetDb() *gorm.DB {
	dsn := "host=localhost user=genos password=genos dbname=awesome port=5432 sslmode=disable TimeZone=Asia/Kolkata"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	return db
}

func GormMigrate(models ...interface{}) {
	db := GetDb()
	db.AutoMigrate(models...)
}
