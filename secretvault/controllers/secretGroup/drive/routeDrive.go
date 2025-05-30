package drive

import (
	"github.com/gin-gonic/gin"
)

func RouteDrive(router *gin.RouterGroup) {
	secretGroup := router.Group("/drive")
	secretGroup.POST("connect", connectDriveHandler)
	secretGroup.GET("list", listDirectoriesDriveHandler)
}
