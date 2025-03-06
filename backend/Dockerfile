# ใช้ base image ของ Golang
FROM golang:1.21.4

# ตั้งค่าตัวแปร ENV
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# กำหนด working directory
WORKDIR /app

# คัดลอก go mod และ sum files ก่อน
COPY . .

# ติดตั้ง dependencies
RUN go mod tidy

# รันโปรแกรม Go โดยตรง
CMD ["go", "run", "main.go"]
