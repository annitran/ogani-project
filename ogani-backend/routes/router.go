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
	categoryHandler := handlers.NewCategoryHandler(
		repositories.NewCategoryRepository(),
		repositories.NewProductRepository(),
	)

	router.POST("/api/v1/register", registerHandler.Register)
	router.POST("/api/v1/login", loginHandler.Login)

	router.GET("/api/v1/categories", categoryHandler.GetAllCategories)
	router.GET("/api/v1/categories/:id", categoryHandler.GetCategoryDetail)
	router.GET("/api/v1/categories/:id/products", categoryHandler.GetCategoryProducts)

	// user
	userRepo := repositories.NewUserRepository()
	auth := router.Group("/api/v1/auth", middlewares.AuthToken(userRepo))
	{
		auth.GET("/user", handlers.GetUser)
		auth.POST("/logout", handlers.Logout)
	}

	// admin
	internal := router.Group("/api/v1/auth/internal-user", middlewares.AuthToken(userRepo), middlewares.RequireAdmin())
	{
		internal.GET("/categories", categoryHandler.GetAllCategories)
		internal.POST("/categories", categoryHandler.CreateCategory)
		internal.DELETE("/categories/:id", categoryHandler.DeleteCategory)
	}

	return router
}
