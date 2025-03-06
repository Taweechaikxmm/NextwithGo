// backend/controller/user.go
package controller

import (
	"backend/entity" // ปรับ path ให้ถูกต้อง
	"net/http"

	"github.com/gin-gonic/gin"
)

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ทั้งหมด
func GetUsers(c *gin.Context) {
	var users []entity.User
	// ดึงข้อมูลจากฐานข้อมูล
	if err := entity.DB().Find(&users).Error; err != nil {
		// หากมีข้อผิดพลาดในการดึงข้อมูล ให้ส่งข้อความแสดงข้อผิดพลาด
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch users",
		})
		return
	}

	// ส่งข้อมูลผู้ใช้ทั้งหมดกลับไปเป็น JSON
	c.JSON(http.StatusOK, users)
}

func CreateUser(c *gin.Context) {
	var user entity.User
	// Binding JSON จาก request body มาที่ struct User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data",
		})
		return
	}

	// สร้างผู้ใช้ใหม่ในฐานข้อมูล
	if err := entity.DB().Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create user",
		})
		return
	}

	// ส่งข้อมูลผู้ใช้ที่ถูกสร้างไป
	c.JSON(http.StatusCreated, user)
}

func UpdateUser(c *gin.Context) {
	var updateData entity.User
	id := c.Param("id")

	// รับข้อมูลจาก request body
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	// ค้นหาผู้ใช้จาก ID
	var user entity.User
	if err := entity.DB().First(&user, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// ป้องกันการเปลี่ยน ID โดยไม่ได้ตั้งใจ
	updateData.ID = user.ID

	// อัปเดตเฉพาะฟิลด์ที่ส่งมา
	if err := entity.DB().Model(&user).Select("Name", "Email").Updates(updateData).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func DeleteUser(c *gin.Context) {
	id := c.Param("id") // รับ ID จาก URL

	// ค้นหาผู้ใช้จาก ID
	var user entity.User
	if err := entity.DB().Where("id = ?", id).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	// ลบผู้ใช้
	if err := entity.DB().Delete(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete user",
		})
		return
	}

	// ส่งข้อความยืนยันการลบ
	c.JSON(http.StatusOK, gin.H{
		"message": "User deleted successfully",
	})
}
