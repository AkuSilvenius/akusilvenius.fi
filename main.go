package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./client/build", true)))
	router.Run(":5000")
}
