package handlers

import (
	"net/http"
	"ogani-backend/repositories"

	"github.com/gin-gonic/gin"
)

type categoryHandler struct {
	repo repositories.CategoryRepository
}

func NewCategoryHandler(repo repositories.CategoryRepository) *categoryHandler {
	return &categoryHandler{
		repo: repo,
	}
}

func (h *categoryHandler) GetAllCategories(c *gin.Context) {
	categories, err := h.repo.GetList()

	if err != nil {
		c.JSON(500, gin.H{"message": "Failed to get categories"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"categories": categories,
	})
}
