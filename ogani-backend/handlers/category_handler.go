package handlers

import (
	"net/http"
	"ogani-backend/repositories"

	"github.com/gin-gonic/gin"
	"math"
	"strconv"
)

type categoryHandler struct {
	categoryRepo repositories.CategoryRepository
	productRepo  repositories.ProductRepository
}

type CreateCategoryInput struct {
	Name string `json:"name" binding:"required"`
}

func NewCategoryHandler(categoryRepo repositories.CategoryRepository, productRepo repositories.ProductRepository) *categoryHandler {
	return &categoryHandler{
		categoryRepo: categoryRepo,
		productRepo:  productRepo,
	}
}

func (h *categoryHandler) GetAllCategories(c *gin.Context) {
	categories, err := h.categoryRepo.GetList()

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

	category, err := h.categoryRepo.GetDetail(uint(id))

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

func (h *categoryHandler) GetCategoryProducts(c *gin.Context) {
	categoryID, _ := strconv.Atoi(c.Param("id"))

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "9"))

	if page < 1 {
		page = 1
	}

	products, total, err := h.productRepo.GetByCategory(
		uint(categoryID),
		page,
		limit,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to get products",
		})
		return
	}

	totalPages := int(math.Ceil(float64(total) / float64(limit)))

	c.JSON(http.StatusOK, gin.H{
		"data": products,
		"pagination": gin.H{
			"page":       page,
			"limit":      limit,
			"totalItems": total,
			"totalPages": totalPages,
		},
	})
}

// admin
func (h *categoryHandler) CreateCategory(c *gin.Context) {
	var input CreateCategoryInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input",
		})
		return
	}

	category, err := h.categoryRepo.Create(input.Name)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to create category",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"category": category,
	})
}

func (h *categoryHandler) DeleteCategory(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	err := h.categoryRepo.Delete(uint(id))
	if err != nil {
		c.JSON(500, gin.H{"message": "Delete failed"})
		return
	}

	c.JSON(200, gin.H{"message": "Deleted"})
}
