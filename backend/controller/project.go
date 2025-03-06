// backend/controller/user.go
package controller

import (
	"backend/entity" // ปรับ path ให้ถูกต้อง
	"net/http"

	"github.com/gin-gonic/gin"
)

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ทั้งหมด
func GetProjects(c *gin.Context) {
	var projects []entity.Project
	// ดึงข้อมูลจากฐานข้อมูล
	if err := entity.DB().Find(&projects).Error; err != nil {
		// หากมีข้อผิดพลาดในการดึงข้อมูล ให้ส่งข้อความแสดงข้อผิดพลาด
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch projects",
		})
		return
	}

	// ส่งข้อมูลผู้ใช้ทั้งหมดกลับไปเป็น JSON
	c.JSON(http.StatusOK, projects)
}

func CreateProject(c *gin.Context) {
	var project entity.Project
	// Binding JSON จาก request body มาที่ struct User
	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data",
		})
		return
	}

	// สร้างผู้ใช้ใหม่ในฐานข้อมูล
	if err := entity.DB().Create(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create project",
		})
		return
	}

	// ส่งข้อมูลผู้ใช้ที่ถูกสร้างไป
	c.JSON(http.StatusCreated, project)
}

func UpdateProject(c *gin.Context) {
	var updateData entity.Project
	id := c.Param("id")

	// รับข้อมูลจาก request body
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	// ค้นหาผู้ใช้จาก ID
	var project entity.Project
	if err := entity.DB().First(&project, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "project not found"})
		return
	}

	// ป้องกันการเปลี่ยน ID โดยไม่ได้ตั้งใจ
	updateData.ID = project.ID

	// อัปเดตเฉพาะฟิลด์ที่ส่งมา
	if err := entity.DB().Model(&project).Select("Name", "Email").Updates(updateData).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, project)
}

func DeleteProject(c *gin.Context) {
	id := c.Param("id") // รับ ID จาก URL

	// ค้นหาผู้ใช้จาก ID
	var project entity.Project
	if err := entity.DB().Where("id = ?", id).First(&project).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Project not found",
		})
		return
	}

	// ลบผู้ใช้
	if err := entity.DB().Delete(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete project",
		})
		return
	}

	// ส่งข้อความยืนยันการลบ
	c.JSON(http.StatusOK, gin.H{
		"message": "Project deleted successfully",
	})
}
