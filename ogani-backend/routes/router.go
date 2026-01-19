package routes

import (
	"ogani-backend/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.GET("/", handlers.Home)

	return router
}
