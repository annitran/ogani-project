package handlers

import (
	"ogani-backend/models"
	"ogani-backend/repositories"

	"github.com/gin-gonic/gin"
	"net/http"
)

type userHandler struct {
	repo repositories.UserRepository
}

func NewUserHandler(repo repositories.UserRepository) *userHandler {
	return &userHandler{repo: repo}
}

func GetUser(c *gin.Context) {
	userData, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "User not found!",
		})
		return
	}

	user := userData.(*models.User)

	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}
