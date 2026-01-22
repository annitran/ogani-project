package routes

import (
	"ogani-backend/handlers"
	"ogani-backend/middlewares"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.GET("/", handlers.Home)

	auth := router.Group("/api/v1")
	auth.Use(middlewares.AuthToken())
	{
		auth.GET("/profile", handlers.GetUser)
	}

	return router
}
