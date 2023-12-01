package db

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	"github.com/Pacific73/gorm-cache/cache"
	"github.com/Pacific73/gorm-cache/config"
	"github.com/go-redis/redis/v8"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func Init() error {
	sqlDB, err := sql.Open("pgx", fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Kolkata",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	))
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

	redisClient := redis.NewClient(&redis.Options{
		Addr: fmt.Sprintf("%s:%s", os.Getenv("REDIS_HOST"), os.Getenv("REDIS_PORT")),
	})

	cache, err := cache.NewGorm2Cache(&config.CacheConfig{
		CacheLevel:           config.CacheLevelAll,
		CacheStorage:         config.CacheStorageRedis,
		RedisConfig:          cache.NewRedisConfigWithClient(redisClient),
		InvalidateWhenUpdate: true,  // when you create/update/delete objects, invalidate cache
		CacheTTL:             10000, // 10s
		CacheMaxItemCnt:      20,    // if length of objects retrieved one single time exceeds this number, then don't cache
	})

	if err != nil {
		fmt.Println("Error creating caching layer: ", err)
		return err
	}

	err = gormDB.Use(cache)
	if err != nil {
		fmt.Println("Error using caching layer: ", err)
		return err
	}

	// cache.AttachToDB(db)
	db = gormDB
	return nil
}

func GetDb() *gorm.DB {
	return db
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
