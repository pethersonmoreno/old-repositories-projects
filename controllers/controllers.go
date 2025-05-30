package controllers

import (
	"secretvault/controllers/docs"
	"secretvault/controllers/key"
	"secretvault/controllers/secretGroup"

	"github.com/gin-gonic/gin"
)

func homePage(ctx *gin.Context) {
	ctx.Writer.WriteString("Welcome to Secret Vault API")
}

func AddControllers(router *gin.Engine) {
	docs.RouteDocs(router)
	secretGroup.RouteSecretGroup(router)
	key.RouteKey(router)
	router.GET("/", homePage)
}
