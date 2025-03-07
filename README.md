# Template CRUD GO with Next.js 15 !
This project is built using **[Next.js 15](https://nextjs.org/)** for the frontend, which includes **[TailwindCSS](https://tailwindcss.com/)**, **[ESLint](https://eslint.org/)**, and **[TypeScript](https://www.typescriptlang.org/)**. On the backend, **[Go](https://golang.org/)** is used with the **[Gin](https://gin-gonic.com/)** framework, **[Gorm](https://gorm.io/)**, and **[Dogo](https://github.com/liudng/dogo)**. The database used is **[MySQL](https://www.mysql.com/)**. The CRUD functionality has already been set up as the initial groundwork.

## Start Project
### Run 2 Termial for starting
Please see file **[setup.go](./backend/entity/setup.go)** for setup database
- Terminal frontend
```tsx
cd frondend
npm run dev
```
- Terminal backend
```tsx
cd backend
dogo
```

**If you would like to debug. Create launch.json in folder .vscode**

**launch.json**
```tsx
{
    //For Debugger only
    "version": "0.2.0",
    "configurations": [

        {
            "name": "Launch Package",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${workspaceFolder}/backend",
            "output": "${workspaceFolder}/backend/debug/__debug_bin"
        }
    ]
}
```

## Step 1 Install (frontend คือชื่อโฟลเดอร์)

```sh
npx create-next-app@latest frontend
```
### Routing

```plaintext
/app
  /api
    /projectdata
      route.ts         # http://localhost:3000/api/projectdata
  /blog
    /page.tsx          # http://localhost:3000/blog
    /error.tsx         # ถูกเรียนอัตโนมัติเมื่อมีการกดเข้าที่หน้า blog แล้ว error ใช้เฉพาะของหน้านี้
    /loading.tsx       # ถูกเรียนอัตโนมัติเมื่อมีการกดเข้าที่หน้า blog เป็น loading เฉพาะของหน้านี้
  /lib
    /project
      /actions.ts      #แหล่งรวม Controller สำหรับ frontend ใช้ในการติดต่อไป backend
  /project
    /page.tsx          # http://localhost:3000/project
          [id]         # [id] params folder
            /page.tsx  # http://localhost:3000/info/{id} ใช้สำหรับ Dynamic routing http://localhost:3000/info/123
  /_folder             # Private Folder (no public access) _นำหน้าคือ Private Folder
  /(auth)              # Groups Folder ถ้าจะใช้ group ในการแยกให้ใช้ () ในการแบ่งกลุ่มเข่นอันนี้จะเป็นของ auth
    /login
        /page.tsx      # http://localhost:3000/login
    /[...sign-in]         # ... คือ params หลายตัว 
        /page.tsx      # http://localhost:3000/sign-in ,http://localhost:3000/sign-in/a/b, http://localhost:3000/sign-in/a/b/c
    /register
        /page.tsx      # http://localhost:3000/register
```

## Step 2 Metadata (ใช้ทำ SEO)

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Title",
  description: "Camping in Thailand.",
  keywords: "Camping, Thailand, Title",
};
```

## Step 3 Server Components

### Default เป็น Server Component

- SEO ที่ดี (Search Engine Optimization)
- ความปลอดภัย
- Caching

### Client Components

### ถ้าจะใช้ต้องเพิ่ม 'use client'

- Client Components สามารถใช้ state, effects และ event listeners
- สามารถใช้ Browser APIs เช่น geolocation หรือ localStorage

## Step 4 Fetch Data

```tsx
const url = "https:/url";
```

### Loading... loading.tsx

### Error error.tsx

### params

```tsx
const ProjectDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params; // การใช้ { ตัวแปร } คือการ desucturing เพื่อดึงข้อมูลจากค่าในตัวของ param นั่นก็คือ id
  console.log(id);
  return <div>ProjectDetail</div>;
};
export default ProjectDetail;
```

## Step 5 Config Image

```tsx
const url =
  "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU";
```

### next.config.ts ตั้งค่าการดึงรูปภาพ
ถ้าอยากให้รูปภาพที่ดึงมามีการนิ่งสมูท ให้ใช้ priority ใน <img src="..." priority>
```tsx
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
```

Next.js <Image /> component

- ช่วยให้การจัดการภาพในเว็บไซต์มีประสิทธิภาพมากขึ้นโดยอัตโนมัติ
- ปรับขนาดภาพให้เหมาะสม ลดการเลื่อนเลย์เอาต์ และเพิ่มความเร็วในการโหลดหน้าเว็บ

## Step 6 Server Actions

```tsx
export default const ServerComponent =()=>{
    const myAction = async(formData) =>{
        'use server'
            // จัดการข้อมูลจาก form -> formData.get('name')
            // CRUD ข้อมูล -> mutate data (server)
            // รีเฟรชข้อมูล -> revalidate cache
    }

    return <form action={myAction}>... </form>
}
```

```tsx
'use client'
import { myAction } from './action'
export default const ClientComponent = ()=>{
    return (
        <form action={myAction}>
            <button type='submit'>Add </button>
        </form>
    )
}

```

### actions.tsx

```ts
// GET Projects
export const getAllProjects = async (): Promise<Project[]> => {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch projects");
        return await res.json();
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};
```

## Step 7 https://react.dev/reference/react/useActionState

```tsx
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
```

### https://react.dev/reference/react-dom/hooks/

```tsx
const { pending, data, method, action } = useFormStatus();
```

## Step 8 API
```plaintext
/api
    /projectdata
        /route.ts
```
```ts
//เป็นการสร้าง api เพื่อให้ผู้อื่นสามารถยิงเข้ามาแล้วนำไปใช้ได้
const url = 'http://localhost:8085'; // อาจจะใช้จาก .env

export const GET = async() => {
    const res = await fetch(`${url}/projects`);
    const data = await res.json();
    return Response.json(data);
}
```