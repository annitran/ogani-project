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

	// seed products
	var categories_list []models.Category
	db.Find(&categories_list)

	categoryMap := map[string]models.Category{}
	for _, c := range categories_list {
		categoryMap[c.Name] = c
	}

	if len(categoryMap) == 0 {
		log.Println("No categories found — skip product seeding")
		return nil
	}

	products := []models.Product{
		{
			Name:       "Tomato",
			Price:      2.5,
			Quantity:   2,
			CategoryID: categoryMap["Vegetables"].ID,
		},
		{
			Name:       "Banana",
			Price:      2.5,
			Quantity:   3,
			CategoryID: categoryMap["Fresh Fruits"].ID,
		},
		{
			Name:       "Beef",
			Price:      2.5,
			Quantity:   15,
			CategoryID: categoryMap["Fresh Meat"].ID,
		},
		{
			Name:       "Raisin",
			Price:      2.5,
			Quantity:   40,
			CategoryID: categoryMap["Dried Fruits"].ID,
		},
		{
			Name:       "Guava juice",
			Price:      2.5,
			Quantity:   0,
			CategoryID: categoryMap["Drink Fruits"].ID,
		},
	}

	for _, p := range products {
		db.Where("name = ?", p.Name).
			FirstOrCreate(&p)
	}

	return nil
}
