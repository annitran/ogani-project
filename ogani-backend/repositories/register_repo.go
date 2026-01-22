package repositories

import (
	"ogani-backend/config"
	"ogani-backend/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserRegister interface {
	CheckUsername(username string) (*models.User, error)
	CreateUser(display_name, username, password, role string) (*models.User, error)
}

type userRegister struct {
	db *gorm.DB
}

func NewUserRegister() UserRegister {
	return &userRegister{
		db: config.GetDB(),
	}
}

func (r *userRegister) CheckUsername(username string) (*models.User, error) {
	var existedUser models.User
	if err := r.db.Where("username = ?", username).First(&existedUser).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil // không có user, hợp lệ
		}
		return nil, err
	}
	return &existedUser, nil
}

func (r *userRegister) CreateUser(username, display_name, password, role string) (*models.User, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return nil, err
	}

	user := models.User{
		DisplayName: display_name,
		Username:    username,
		Password:    string(hashedPassword),
		Role:        "user",
	}

	if err := r.db.Create(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}
