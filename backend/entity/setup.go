package entity

import (
	"fmt"
	"log"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	// ถ้าใช้ mysql ใน เครื่องเปิดด้านล่างนี้ dsn นี้ตัวเดียว
	dsn := "root:my-secret-pw@tcp(localhost:3306)/TestGo?charset=utf8mb4&parseTime=True&loc=Local"

	// ถ้าใช้ docker compose ให้เปิดด้านล่างนี้แล้วปิด dsn ด้านบน (เหมาะกับ Deploy) เนื่องจากทดสอบแล้วว่า dogo ใน Docker ช้าไม่เหมาะ Dev
	// dbUser := os.Getenv("DB_USER")
	// dbPassword := os.Getenv("DB_PASSWORD")
	// dbHost := os.Getenv("DB_HOST") // ใช้ service name ใน docker-compose
	// dbPort := os.Getenv("DB_PORT")
	// dbName := os.Getenv("DB_NAME")

	// dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
	// 	dbUser, dbPassword, dbHost, dbPort, dbName)
	////////////////////////////////////////////

	// Retry จนกว่าจะเชื่อมต่อสำเร็จ
	var err error
	for i := 0; i < 5; i++ { // ลอง 5 ครั้ง
		db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err == nil {
			fmt.Println("✅ Connected to Database!")
			break
		}
		fmt.Println("⏳ Waiting for Database to be ready... Retrying in 5 seconds...")
		time.Sleep(5 * time.Second)
	}

	if err != nil {
		log.Fatal("❌ Failed to connect to database:", err)
	}

	// อัปเดตฐานข้อมูล
	err = db.AutoMigrate(
		&User{},
		&Project{},
	)
	if err != nil {
		log.Fatal("❌ Failed to migrate database:", err)
	}

	// เพิ่มข้อมูลใหม่
	db.Create(&User{Name: "John Doe", Email: "john@example.com"})
	db.Create(&Project{Name: "โปรเจคทดลอง", Description: "ทดสอบโปรเจค"})
}
