package handlers

import (
	"ogani-backend/middlewares"
	"ogani-backend/repositories"

	"github.com/gin-gonic/gin"
	"net/http"
)

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type loginHandler struct {
	repo repositories.UserLogin
}

func NewLoginHandler(repo repositories.UserLogin) *loginHandler {
	return &loginHandler{
		repo: repo,
	}
}

func (h *loginHandler) Login(c *gin.Context) {
	var req loginRequest

	if err := c.ShouldBindJSON(&req); err != nil || req.Username == "" || req.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	user, err := h.repo.AuthenticateUser(req.Username, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid username or password"})
		return
	}

	// generate JWT
	token, err := middlewares.GenerateToken(req.Username, req.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user": gin.H{
			"id":       user.ID,
			"username": user.Username,
		},
	})
}
