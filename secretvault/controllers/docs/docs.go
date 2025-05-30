package docs

import (
	"net/http"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/haxii/go-swagger-ui/static"
)

const prefix = "docs"

const swaggerFile = "swagger.yaml"
const indexFile = "index.html"
const enableTopbar = true

func handler(ctx *gin.Context) {
	w := ctx.Writer
	r := ctx.Request
	source := r.URL.Path[1:]
	source = strings.TrimPrefix(source, prefix+"/")
	if source == swaggerFile {
		http.ServeFile(w, r, swaggerFile)
		return
	}
	if len(source) == 0 {
		source = indexFile
	}
	fileToServe := findFileToServe(source, w)
	if fileToServe == nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	setContentType(source, w)
	serveFile(w, fileToServe)
}

func findFileToServe(source string, w gin.ResponseWriter) []byte {
	staticFile, exists := static.Files[source]
	if !exists {
		return nil
	}
	fileToServe := staticFile
	if source == indexFile {
		fileToServe = replaceIndexToServe(fileToServe)
	}
	return fileToServe
}

func replaceIndexToServe(staticFile []byte) []byte {
	indexHTML := string(staticFile)
	indexHTML = strings.Replace(indexHTML, "https://petstore.swagger.io/v2/swagger.json", swaggerFile, -1)
	if enableTopbar {
		indexHTML = strings.Replace(indexHTML, "SwaggerUIBundle.plugins.DownloadUrl, HideTopbarPlugin", "SwaggerUIBundle.plugins.DownloadUrl", -1)
	}
	return []byte(indexHTML)
}

func setContentType(source string, w gin.ResponseWriter) {
	header := w.Header()
	switch filepath.Ext(source) {
	case ".html":
		header.Set("Content-Type", "text/html")
	case ".js":
		header.Set("Content-Type", "application/javascript")
	case ".css":
		header.Set("Content-Type", "text/css")
	default:
		header.Set("Content-Type", "application/octet-stream")
	}
}

func serveFile(w gin.ResponseWriter, staticFile []byte) {
	w.Header().Set("Content-Length", strconv.Itoa(len(staticFile)))
	w.Write(staticFile)
}

func RouteDocs(router *gin.Engine) {
	docsGroup := router.Group("/" + prefix)
	docsGroup.GET("/*any", handler)
}
