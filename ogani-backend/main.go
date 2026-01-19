package main

import (
	"ogani-backend/config"
	"ogani-backend/migrations"
	"ogani-backend/routes"
)

func main() {
	config.ConnectDB()
	migrations.Migrate()
	migrations.Seed(config.GetDB())
	routes.SetupRouter().Run(":8080")
}
