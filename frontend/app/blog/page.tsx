const Blog = async () => {
  await new Promise((resolve) => setInterval(resolve, 3000));

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center mb-6">
          <span className="text-gray-600">Template CRUD </span>
          <span className="text-blue-600">GO </span>
          <span className="text-gray-600">with </span>
          <span className="text-black"> Next.js 15!</span>
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed mb-4">
          ในบทความนี้เราจะพูดถึงโครงสร้างโปรเจค CRUD ที่ใช้{" "}
          <strong>Next.js 15</strong> สำหรับ <strong>Frontend</strong> และ{" "}
          <strong>Go</strong> สำหรับ <strong>Backend</strong> โดยใช้{" "}
          <strong>Gin</strong>, <strong>Gorm</strong>, และ <strong>Dogo</strong>{" "}
          รวมถึงฐานข้อมูล <strong>MySQL</strong>
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          ฟีเจอร์หลักในโปรเจคนี้:
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700">
          <li>
            <strong>Frontend:</strong> ใช้ <strong>Next.js 15</strong> ร่วมกับ{" "}
            <strong>TailwindCSS</strong> และ <strong>TypeScript</strong>{" "}
            เพื่อพัฒนา UI ที่ responsive และเสถียร
          </li>
          <li>
            <strong>Backend:</strong> ใช้ <strong>Go</strong> และ{" "}
            <strong>Gin framework</strong> สำหรับสร้าง API
          </li>
          <li>
            <strong>Database:</strong> ฐานข้อมูล <strong>MySQL</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Blog;
