package drive

import (
	"net/http"
	"secretvault/googledrive"
	"secretvault/io"

	"github.com/gin-gonic/gin"
)

type GoogleDirectoryWithId struct {
	Id    string `json:"id"`
	Title string `json:"title"`
}

func listDirectoriesDriveHandler(ctx *gin.Context) {
	secretGroupId := ctx.Param("secretGroupId")
	_, hasIntermediateKey := ctx.Request.Header["Intermediate-Key"]
	if !hasIntermediateKey {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Header Intermediate-Key is required"})
		return
	}
	intermediateKey := ctx.Request.Header.Get("Intermediate-Key")
	secretGroup, err := io.ReadSecretGroupFile(secretGroupId, intermediateKey)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if secretGroup.GoogleToken == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Secret Group needs to be connected with Google Drive"})
		return

	}
	driveService, err := googledrive.GetDriveService(*secretGroup.GoogleToken)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	directories := []GoogleDirectoryWithId{}
	childList, err := driveService.Children.List("root").Do()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	for _, child := range childList.Items {
		file, err := driveService.Files.Get(child.Id).Do()
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if file.MimeType == "application/vnd.google-apps.folder" {
			directories = append(directories, GoogleDirectoryWithId{
				Id:    file.Id,
				Title: file.Title,
			})
		}
	}
	ctx.JSON(http.StatusOK, directories)
}
