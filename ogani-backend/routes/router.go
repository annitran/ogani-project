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
	loginHandler := handlers.NewLoginHandler(repositories.NewUserLogin())

	router.GET("/", handlers.Home)
	router.POST("/api/v1/register", registerHandler.Register)
	router.POST("/api/v1/login", loginHandler.Login)

	// auth
	userRepo := repositories.NewUserRepository()
	auth := router.Group("/api/v1/auth", middlewares.AuthToken(userRepo))
	{
		auth.GET("/profile", handlers.GetUser)
	}

	return router
}
