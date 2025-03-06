//เป็นการสร้าง api เพื่อให้ผู้อื่นสามารถยิงเข้ามาแล้วนำไปใช้ได้
const url = 'http://localhost:8085'; // อนาคตอาจจะใช้จาก .env

export const GET = async() => {
    const res = await fetch(`${url}/projects`);
    const data = await res.json();
    return Response.json(data);
}