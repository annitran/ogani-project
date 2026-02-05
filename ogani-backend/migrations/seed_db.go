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
			Name:       "Cranberry Lime Sparkling Water",
			Price:      1.5,
			Quantity:   62,
			CategoryID: 5,
		}, {
			Name:       "Peanut Butter Pretzel Bites",
			Price:      4.19,
			Quantity:   99,
			CategoryID: 2,
		}, {
			Name:       "Bamboo Bathtub Caddy",
			Price:      34.99,
			Quantity:   70,
			CategoryID: 5,
		}, {
			Name:       "Suction Cup Hooks",
			Price:      9.99,
			Quantity:   31,
			CategoryID: 2,
		}, {
			Name:       "Pepperoni Pizza Rolls",
			Price:      6.99,
			Quantity:   1,
			CategoryID: 1,
		}, {
			Name:       "Kale Caesar Salad Kit",
			Price:      5.99,
			Quantity:   81,
			CategoryID: 4,
		}, {
			Name:       "Pet Carrier Backpack",
			Price:      39.99,
			Quantity:   81,
			CategoryID: 5,
		}, {
			Name:       "Digital Thermostat",
			Price:      59.99,
			Quantity:   20,
			CategoryID: 1,
		}, {
			Name:       "Baby Safety Corner Guards",
			Price:      9.99,
			Quantity:   99,
			CategoryID: 2,
		}, {
			Name:       "Personalized Keychain",
			Price:      10.99,
			Quantity:   60,
			CategoryID: 2,
		}, {
			Name:       "Fridge Magnet Set",
			Price:      15.99,
			Quantity:   41,
			CategoryID: 1,
		}, {
			Name:       "Teriyaki Chicken Wings",
			Price:      10.99,
			Quantity:   39,
			CategoryID: 5,
		}, {
			Name:       "Carrot Sticks",
			Price:      2.49,
			Quantity:   32,
			CategoryID: 1,
		}, {
			Name:       "Eco-Friendly Disposable Plates",
			Price:      22.99,
			Quantity:   93,
			CategoryID: 2,
		}, {
			Name:       "Watercolor Set",
			Price:      19.99,
			Quantity:   49,
			CategoryID: 5,
		},
	}

	for _, p := range products {
		db.Where("name = ?", p.Name).
			FirstOrCreate(&p)
	}

	return nil
}
