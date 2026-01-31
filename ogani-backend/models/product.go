package models

import (
	"time"
)

type Product struct {
	ID          uint       `json:"id" gorm:"primaryKey"`
	Name        string     `json:"name" gorm:"unique;not null"`
	ImageUrl    string     `json:"image_url"`
	Price       float64    `json:"price" gorm:"type:decimal(10,2);not null"`
	Quantity    uint       `json:"quantity" gorm:"not null"`
	Description string     `json:"description"`
	CategoryID  uint       `json:"category_id" gorm:"not null"`
	CreatedAt   *time.Time `json:"created_at"`
	UpdatedAt   *time.Time `json:"updated_at"`

	Category Category `gorm:"foreignKey:CategoryID;references:ID"`
}
