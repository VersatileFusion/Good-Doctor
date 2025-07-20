# Therapy Clinic Platform

## پروژه کلینیک درمانی (Therapy Clinic Project)

---

## English

### Overview
Therapy is a full-stack web platform for managing a therapy/clinic business. It includes:
- **Backend:** NestJS (TypeScript) with Prisma ORM
- **Frontend:** Next.js (React) with Tailwind CSS and MUI
- **Database:** SQL Server (default, can be switched to PostgreSQL)
- **Features:** User management, authentication, appointments, doctors, patients, resources, analytics, notifications, payments, and more.

---

### Features
- User authentication (JWT)
- Role-based access (Admin, Doctor, Patient, etc.)
- Appointment booking and management
- Doctor and patient dashboards
- Resource library (articles, videos, etc.)
- Analytics and reporting
- Notifications (SMS, in-app)
- Payment integration
- Bilingual support (English & Persian)

---

### Prerequisites
- Node.js (v18+ recommended)
- npm
- SQL Server (or PostgreSQL, with schema adjustments)
- (Optional) MongoDB, MySQL, or SQLite (with major schema changes)

---

### Getting Started

#### 1. Clone the repository
```sh
git clone <repo-url>
cd Therapy
```

#### 2. Backend Setup
```sh
cd backend
npm install
```

- Configure your database in `.env`:
  ```
  DATABASE_URL="sqlserver://sa:yourStrong(!)Password@localhost:1433;database=Therapy;encrypt=true"
  ```
- Update credentials as needed.

- Run Prisma migrations:
  ```sh
  npx prisma migrate dev --name init
  ```
- Start the backend:
  ```sh
  npm run start:dev
  ```
- Backend runs on [http://localhost:3000](http://localhost:3000)

#### 3. Frontend Setup
```sh
cd ../frontend
npm install
```
- Set the port in `.env.local` (optional, default is 3000):
  ```
  PORT=3001
  ```
- Start the frontend:
  ```sh
  npm run dev
  ```
- Frontend runs on [http://localhost:3001](http://localhost:3001)

---

### Environment Variables
- `DATABASE_URL`: SQL Server/PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT tokens
- (Other variables as needed for SMS, payments, etc.)

---

### Usage
- Register a user via the frontend or API
- Assign roles via the database or admin panel
- Log in and access dashboards based on your role
- Book appointments, manage resources, view analytics, etc.

---

### Development
- Backend: `backend/src/`
- Frontend: `frontend/src/`
- Prisma schema: `backend/prisma/schema.prisma`
- Run tests, lint, and format as needed

---

### Switching Databases
- To use PostgreSQL, update `provider` in `schema.prisma` and `DATABASE_URL` in `.env`
- Adjust schema for MongoDB/MySQL/SQLite as needed

---

### Persian (فارسی)

## معرفی

پروژه کلینیک درمانی یک پلتفرم کامل برای مدیریت کلینیک و درمانگاه است که شامل:
- **بک‌اند:** NestJS (تایپ‌اسکریپت) با Prisma ORM
- **فرانت‌اند:** Next.js (ری‌اکت) با Tailwind CSS و MUI
- **دیتابیس:** SQL Server (پیش‌فرض، قابل تغییر به PostgreSQL)
- **امکانات:** مدیریت کاربران، احراز هویت، نوبت‌دهی، پزشکان، بیماران، منابع، آنالیتیکس، اعلان‌ها، پرداخت و ...

---

## امکانات
- احراز هویت JWT
- نقش‌بندی (ادمین، پزشک، بیمار و ...)
- مدیریت و رزرو نوبت
- داشبورد پزشک و بیمار
- کتابخانه منابع (مقاله، ویدیو و ...)
- گزارش‌گیری و آنالیتیکس
- اعلان (پیامک، درون‌برنامه)
- پرداخت آنلاین
- پشتیبانی دو زبانه (انگلیسی و فارسی)

---

## پیش‌نیازها
- Node.js (نسخه ۱۸ به بالا)
- npm
- SQL Server (یا PostgreSQL)
- (اختیاری) MongoDB، MySQL یا SQLite (نیازمند تغییرات اساسی)

---

## راه‌اندازی سریع

### ۱. کلون کردن پروژه
```sh
git clone <repo-url>
cd Therapy
```

### ۲. راه‌اندازی بک‌اند
```sh
cd backend
npm install
```
- تنظیم دیتابیس در `.env`:
  ```
  DATABASE_URL="sqlserver://sa:yourStrong(!)Password@localhost:1433;database=Therapy;encrypt=true"
  ```
- اجرای مایگریشن Prisma:
  ```sh
  npx prisma migrate dev --name init
  ```
- اجرای سرور بک‌اند:
  ```sh
  npm run start:dev
  ```
- آدرس بک‌اند: [http://localhost:3000](http://localhost:3000)

### ۳. راه‌اندازی فرانت‌اند
```sh
cd ../frontend
npm install
```
- تنظیم پورت در `.env.local` (اختیاری):
  ```
  PORT=3001
  ```
- اجرای سرور فرانت‌اند:
  ```sh
  npm run dev
  ```
- آدرس فرانت‌اند: [http://localhost:3001](http://localhost:3001)

---

## متغیرهای محیطی
- `DATABASE_URL`: آدرس اتصال دیتابیس
- `JWT_SECRET`: کلید رمزنگاری JWT
- (سایر متغیرها برای پیامک، پرداخت و ...)

---

## استفاده
- ثبت‌نام کاربر از طریق فرانت یا API
- تخصیص نقش از طریق دیتابیس یا پنل ادمین
- ورود و مشاهده داشبورد بر اساس نقش
- رزرو نوبت، مدیریت منابع، مشاهده گزارش و ...

---

## توسعه
- بک‌اند: `backend/src/`
- فرانت‌اند: `frontend/src/`
- اسکیما Prisma: `backend/prisma/schema.prisma`
- اجرای تست، lint و فرمت کد

---

## تغییر دیتابیس
- برای استفاده از PostgreSQL، مقدار provider و DATABASE_URL را تغییر دهید
- برای MongoDB/MySQL/SQLite نیاز به تغییرات اساسی در اسکیما است

---

## License
MIT 