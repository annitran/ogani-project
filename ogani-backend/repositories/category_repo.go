package repositories

import (
	"ogani-backend/config"
	"ogani-backend/models"

	"gorm.io/gorm"
)

type CategoryRepository interface {
	GetList() ([]models.Category, error)
	GetDetail(id uint) (models.Category, error)
}

type categoryRepository struct {
	db *gorm.DB
}

func NewCategoryRepository() CategoryRepository {
	return &categoryRepository{
		db: config.GetDB(),
	}
}

func (r *categoryRepository) GetList() ([]models.Category, error) {
	var categories []models.Category

	if err := r.db.Find(&categories).Error; err != nil {
		return nil, err
	}

	return categories, nil
}

func (r *categoryRepository) GetDetail(id uint) (models.Category, error) {
	var category models.Category

	err := r.db.
		Preload("Products").
		First(&category, id).Error

	if err != nil {
		return models.Category{}, err
	}

	return category, nil
}
