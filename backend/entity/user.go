// backend/entity/user.go
package entity

// User struct ที่ใช้กับ GORM
type User struct {
	ID    uint   `gorm:"primaryKey"`
	Name  string `gorm:"size:100"`
	Email string `gorm:"size:100"`
}
