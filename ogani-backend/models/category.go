package models

import (
	"time"
)

type Category struct {
	ID        uint       `json:"id" gorm:"primaryKey"`
	Name      string     `json:"name" gorm:"unique"`
	ImageUrl  string     `json:"image_url"`
	CreatedAt *time.Time `json:"created_at"`
	UpdatedAt *time.Time `json:"updated_at"`

	Products []Product `gorm:"foreignKey:CategoryID"`
}
