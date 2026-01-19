package models

import (
	"time"
)

type User struct {
	ID          uint     `json:"id" gorm:"primaryKey"`
	DisplayName string     `json:"display_name"`
	Username    string     `json:"username" gorm:"unique"`
	Password    string     `json:"-"`
	AvatarUrl   string     `json:"avatar_url"`
	Role        string     `json:"role"`
	CreatedAt   *time.Time `json:"created_at"`
	UpdatedAt   *time.Time `json:"updated_at"`
}
