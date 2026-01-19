package migrations

import (
	"errors"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"log"

	"ogani-backend/models"
)

func Seed(db *gorm.DB) error {
	// seed admin
	var admin models.User

	// Kiểm tra admin có tồn tại chưa
	result := db.First(&admin, "username = ?", "admin")

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		// Tạo password hash
		hashed, err := bcrypt.GenerateFromPassword([]byte("123456"), bcrypt.DefaultCost)
		if err != nil {
			return err
		}

		newAdmin := models.User{
			Username: "admin",
			Password: string(hashed),
			Role:     "admin",
		}

		db.Create(&newAdmin)
		log.Println("Admin default created: admin / 123456")
	} else {
		log.Println("Admin already exists — skip")
	}

	// seed categories
	categories := []string{
		"Vegetables",
		"Fresh Fruits",
		"Fresh Meat",
		"Dried Fruits",
		"Drink Fruits",
	}

	for _, name := range categories {
		db.FirstOrCreate(&models.Category{}, models.Category{Name: name})
	}

	return nil
}
