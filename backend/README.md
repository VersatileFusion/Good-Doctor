<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Therapy Clinic Backend

## Overview
A comprehensive, modular backend for a therapy clinic, built with NestJS and PostgreSQL. Features include appointments, doctor/patient management, payments (Zarinpal), SMS (sms.ir), notifications, documents, analytics, admin dashboard, resource library, and AI-powered automation.

---

## Features
- User, role, and authentication management
- Doctor, patient, appointment, rating, and calendar features
- Payments (Zarinpal), SMS (sms.ir), notifications
- Document management (upload, consent)
- Analytics, admin dashboard, resource library
- AI/automation (smart scheduling, triage)
- Swagger API documentation
- Bilingual support (English/Persian)

---

## Setup
1. **Clone the repository**
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Configure environment variables**
   - Copy `.env.example` to `.env` and fill in your values (Postgres, Zarinpal, sms.ir, JWT, etc.)
4. **Run database migrations**
   ```sh
   npx prisma migrate dev
   ```
5. **Start the server**
   ```sh
   npm run start:dev
   ```
6. **Access Swagger API docs**
   - Visit [http://localhost:3000/api](http://localhost:3000/api)

---

## Usage
- Use the Swagger UI to explore and test all API endpoints.
- All major modules are available under `/api`.
- Admin, doctor, and patient roles have different access levels.

---

## API Summary
- **Auth:** `/auth/register`, `/auth/login`
- **Users:** `/users` (CRUD)
- **Doctors:** `/doctors` (CRUD, availability)
- **Patients:** `/patients` (CRUD, documents)
- **Appointments:** `/appointments` (CRUD, smart scheduling)
- **Payments:** `/payment/initiate`, `/payment/callback`
- **Notifications:** `/notification/sms`
- **Documents:** `/document/upload`, `/document/:id`
- **Analytics:** `/analytics/total-appointments`, `/analytics/total-revenue`, etc.
- **Admin:** `/admin/users`, `/admin/logs`, etc.
- **Resource Library:** `/resource` (CRUD)
- **AI:** `/ai/smart-scheduling`, `/ai/ai-triage`

---

## Swagger API Docs
All endpoints are documented and testable via Swagger at `/api`.

---

# بک‌اند کلینیک تراپی

## معرفی
یک بک‌اند جامع و ماژولار برای کلینیک تراپی، ساخته‌شده با NestJS و PostgreSQL. امکانات شامل مدیریت نوبت، پزشک/بیمار، پرداخت (زرین‌پال)، پیامک (sms.ir)، اعلان‌ها، مدارک، آنالیتیکس، داشبورد ادمین، کتابخانه منابع و اتوماسیون هوشمند (AI).

---

## امکانات
- مدیریت کاربران، نقش‌ها و احراز هویت
- مدیریت پزشک، بیمار، نوبت، امتیازدهی و تقویم
- پرداخت (زرین‌پال)، پیامک (sms.ir)، اعلان‌ها
- مدیریت مدارک (آپلود، رضایت‌نامه)
- آنالیتیکس، داشبورد ادمین، کتابخانه منابع
- هوش مصنوعی (زمان‌بندی هوشمند، تریاژ)
- مستندات Swagger برای API
- پشتیبانی دو زبانه (انگلیسی/فارسی)

---

## راه‌اندازی
۱. **کلون کردن مخزن**
۲. **نصب وابستگی‌ها**
   ```sh
   npm install
   ```
۳. **تنظیم متغیرهای محیطی**
   - فایل `.env.example` را به `.env` کپی و مقادیر را وارد کنید (پستگرس، زرین‌پال، sms.ir، JWT و ...)
۴. **اجرای مایگریشن دیتابیس**
   ```sh
   npx prisma migrate dev
   ```
۵. **اجرای سرور**
   ```sh
   npm run start:dev
   ```
۶. **دسترسی به مستندات Swagger**
   - [http://localhost:3000/api](http://localhost:3000/api)

---

## استفاده
- از Swagger UI برای مشاهده و تست همه APIها استفاده کنید.
- همه ماژول‌های اصلی زیر `/api` در دسترس هستند.
- نقش‌های ادمین، پزشک و بیمار دسترسی‌های متفاوت دارند.

---

## خلاصه API
- **احراز هویت:** `/auth/register`، `/auth/login`
- **کاربران:** `/users` (CRUD)
- **پزشکان:** `/doctors` (CRUD، زمان‌بندی)
- **بیماران:** `/patients` (CRUD، مدارک)
- **نوبت‌ها:** `/appointments` (CRUD، زمان‌بندی هوشمند)
- **پرداخت:** `/payment/initiate`، `/payment/callback`
- **اعلان:** `/notification/sms`
- **مدارک:** `/document/upload`، `/document/:id`
- **آنالیتیکس:** `/analytics/total-appointments`، `/analytics/total-revenue` و ...
- **ادمین:** `/admin/users`، `/admin/logs` و ...
- **کتابخانه منابع:** `/resource` (CRUD)
- **هوش مصنوعی:** `/ai/smart-scheduling`، `/ai/ai-triage`

---

## مستندات Swagger
همه اندپوینت‌ها از طریق Swagger در `/api` مستندسازی و قابل تست هستند.
