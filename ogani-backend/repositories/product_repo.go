package repositories

import (
	"ogani-backend/config"
	"ogani-backend/models"

	"gorm.io/gorm"
)

type ProductRepository interface {
	GetByCategory(categoryID uint, page int, limit int) ([]models.Product, int64, error)
}

type productRepository struct {
	db *gorm.DB
}

func NewProductRepository() ProductRepository {
	return &productRepository{
		db: config.GetDB(),
	}
}

func (r *productRepository) GetByCategory(
	categoryID uint,
	page int,
	limit int,
) ([]models.Product, int64, error) {

	var products []models.Product
	var total int64

	offset := (page - 1) * limit

	// count total
	if err := r.db.
		Model(&models.Product{}).
		Where("category_id = ?", categoryID).
		Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// query data
	if err := r.db.
		Where("category_id = ?", categoryID).
		Limit(limit).
		Offset(offset).
		Find(&products).Error; err != nil {
		return nil, 0, err
	}

	return products, total, nil
}
