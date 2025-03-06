// backend/main.go
package main

import (
	"backend/controller"
	"backend/entity"

	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	r.GET("/users", controller.GetUsers)
	r.POST("/users", controller.CreateUser)
	r.PUT("/users/:id", controller.UpdateUser)
	r.DELETE("/users/:id", controller.DeleteUser)

	r.GET("/projects", controller.GetProjects)
	r.POST("/projects", controller.CreateProject)
	r.PUT("/projects/:id", controller.UpdateProject)
	r.DELETE("/projects/:id", controller.DeleteProject)

	r.Run(":8085")
}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()

	}

}
