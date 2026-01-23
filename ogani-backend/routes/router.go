package routes

import (
	"ogani-backend/handlers"
	"ogani-backend/middlewares"
	"ogani-backend/repositories"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173",
		},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

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
