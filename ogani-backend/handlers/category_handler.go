package handlers

import (
	"net/http"
	"ogani-backend/repositories"

	"github.com/gin-gonic/gin"
	"strconv"
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

func (h *categoryHandler) GetCategoryDetail(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 64)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid category id",
		})
		return
	}

	category, err := h.repo.GetDetail(uint(id))

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Category not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"category": category,
	})
}
