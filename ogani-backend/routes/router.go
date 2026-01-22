package routes

import (
	"ogani-backend/handlers"
	"ogani-backend/middlewares"
	"ogani-backend/repositories"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	registerHandler := handlers.NewRegisterHandler(repositories.NewUserRegister())

	router.GET("/", handlers.Home)
	router.POST("/api/v1/register", registerHandler.Create)

	auth := router.Group("/api/v1")
	auth.Use(middlewares.AuthToken())
	{
		auth.GET("/profile", handlers.GetUser)
	}

	return router
}
