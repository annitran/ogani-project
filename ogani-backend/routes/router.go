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
	categoryHandler := handlers.NewCategoryHandler(repositories.NewCategoryRepository())

	router.GET("/", handlers.Home)
	router.POST("/api/v1/register", registerHandler.Register)
	router.POST("/api/v1/login", loginHandler.Login)

	router.GET("/api/v1/categories", categoryHandler.GetAllCategories)

	// auth
	userRepo := repositories.NewUserRepository()
	auth := router.Group("/api/v1/auth", middlewares.AuthToken(userRepo))
	{
		auth.GET("/user", handlers.GetUser)
		auth.POST("/logout", handlers.Logout)
	}

	return router
}
