package secretGroup

import (
	"secretvault/controllers/secretGroup/drive"
	"secretvault/controllers/secretGroup/secret"

	"github.com/gin-gonic/gin"
)

func RouteSecretGroup(router *gin.Engine) {
	secretGroup := router.Group("/secretGroup")
	secretGroup.GET("", getAllSecretGroupsHandler)
	secretGroup.POST("", createSecretGroupHandler)
	secretGroupItem := secretGroup.Group("/:secretGroupId")
	secret.RouteSecret(secretGroupItem)
	drive.RouteDrive(secretGroupItem)
}
