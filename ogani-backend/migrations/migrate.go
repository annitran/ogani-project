package migrations

import (
	"log"
	"ogani-backend/config"
	"ogani-backend/models"
)

func Migrate() {
	err := config.GetDB().AutoMigrate(
		models.User{},
		models.Category{},
	)

	if err != nil {
		log.Fatal("AutoMigrate failed: ", err)
	}

	log.Println("Database migrated successfully!")
}
