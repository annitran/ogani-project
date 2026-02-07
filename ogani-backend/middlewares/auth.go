package middlewares

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"ogani-backend/repositories"
)

func AuthToken(repo repositories.UserRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		// 1. Get Authorization header
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "missing authorization header",
			})
			return
		}

		// 2. Expect: Bearer <token>
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "invalid authorization format",
			})
			return
		}

		tokenString := parts[1]

		// 3. Verify token
		claims, err := VerifyToken(tokenString)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "invalid or expired token",
			})
			return
		}

		// 4. Query user từ DB
		user, err := repo.FindByUsername(claims.Username)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "User not found",
			})
			return
		}

		// 5. Set user info to context
		c.Set("user", user)
		c.Set("role", user.Role)

		c.Next()
	}
}

func RequireAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		role := c.GetString("role")

		if role != "admin" {
			c.AbortWithStatusJSON(403, gin.H{
				"message": "Admin only",
			})
			return
		}

		c.Next()
	}
}
