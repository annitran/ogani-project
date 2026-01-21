package repositories

import (
	"ogani-backend/config"
	"ogani-backend/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	FindByUsername(username string) (*models.User, error)
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository() UserRepository {
	return &userRepository{
		db: config.GetDB(),
	}
}

func (r *userRepository) FindByUsername(username string) (*models.User, error) {
	var user models.User

	if err := r.db.Where("username = ?", username).First(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}
