package handlers

import (
	"ogani-backend/repositories"

	"github.com/gin-gonic/gin"
	"net/http"
)

type registerRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type registerHandler struct {
	repo repositories.UserRegister
}

func NewRegisterHandler(repo repositories.UserRegister) *registerHandler {
	return &registerHandler{
		repo: repo,
	}
}

func (h *registerHandler) Register(c *gin.Context) {
	var req registerRequest

	if err := c.ShouldBindJSON(&req); err != nil || req.Username == "" || req.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input!!!",
		})
		return
	}

	user, err := h.repo.CheckUsername(req.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}
	if user != nil {
		// username tồn tại
		c.JSON(http.StatusConflict, gin.H{
			"message": "Username already exists!",
		})
		return
	}

	user, err = h.repo.CreateUser(req.Username, req.Password, req.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Cannot register!",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Registered successful!!!",
		"user":    user,
	})
}
