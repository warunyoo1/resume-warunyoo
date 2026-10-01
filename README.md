# Resume Guy

เว็บเรซูเม่และพอร์ตโฟลิโอ รองรับภาษาไทยและหน้าจอมือถือ

## เวอร์ชัน

ต้องมี Node.js 22.12 ขึ้นไป และ npm

เวอร์ชันหลักตาม `package-lock.json`:

| เทคโนโลยี    | เวอร์ชัน |
| ------------ | -------- |
| React        | 19.3.0   |
| Vite         | 8.3.1    |
| TypeScript   | 6.0.3    |
| Tailwind CSS | 4.3.3    |
| GSAP         | 3.15.0   |
| @gsap/react  | 2.1.2    |

## ติดตั้งและรัน

```sh
npm ci
npm run dev
```

เปิด URL ที่แสดงใน Terminal

## Build และตรวจโค้ด

```sh
npm run build
npm run preview
```

```sh
npm run typecheck
npm run lint
npm run format:check
```

## แก้ไขข้อมูล

- `src/data/resume.ts` — ข้อมูลเรซูเม่และทักษะ
- `src/types/` — Type ของข้อมูลเรซูเม่และ Props ของ component
- `src/components/sections/` — ส่วนต่าง ๆ ของหน้าเว็บ
- `src/styles/index.css` — สไตล์และการแสดงผลบนมือถือ
- `public/` — รูปภาพและไฟล์ PDF
