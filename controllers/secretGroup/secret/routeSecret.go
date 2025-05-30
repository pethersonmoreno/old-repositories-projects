package secret

import (
	"github.com/gin-gonic/gin"
)

func RouteSecret(router *gin.RouterGroup) {
	secretGroup := router.Group("/secret")
	secretGroup.GET("", getAllSecretsHandler)
	secretGroup.POST("", createSecretHandler)
	secretGroup.GET("/:secretId", getSecretByIdHandler)
	secretGroup.PATCH("/:secretId", partialUpdateSecretByIdHandler)
	secretGroup.DELETE("/:secretId", deleteSecretByIdHandler)
}
