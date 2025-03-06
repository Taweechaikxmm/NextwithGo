package entity

// Project struct ที่ใช้กับ GORM
type Project struct {
	ID          uint   `gorm:"primaryKey"`
	Name        string `gorm:"size:100"`
	Description string `gorm:"size:100"`
}
