package main

import (
	"secretvault/controllers"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	router := gin.Default()
	controllers.AddControllers(router)
	return router
}

func main() {
	router := setupRouter()
	router.Run(":3000")
}
