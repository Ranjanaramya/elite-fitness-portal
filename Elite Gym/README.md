# 🏋️ Elite Gym Sri Lanka

A modern gym management and fitness website built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Sanity CMS**. The platform provides a seamless experience for gym members while allowing administrators to manage content through Sanity Studio.

---

## 📖 Overview

Elite Gym Sri Lanka is a responsive web application designed to showcase gym services, memberships, coaches, facilities, fitness insights, and member features. The project uses **Sanity CMS** as a headless content management system, allowing administrators to update website content without modifying the source code.

---

## ✨ Features

### Public Website
- 🏠 Discover (Home Page)
- ℹ️ Our Story (About Us)
- 💪 Memberships (Membership Packages)
- 🏋️ Facilities (Gym Amenities)
- 👨🏫 Coaches (Professional Trainers)
- 📰 Insights (Fitness Blog)
- 📞 Connect (Contact Page)
- 🧮 BMI Calculator
- ⭐ Member Reviews

### Member Features
- Secure Authentication (with password strength validation)
- Dashboard (with greeting personalized banner)
- Membership Booking (Bank Transfer & WhatsApp Payment flow)
- Gym Class Booking (Real-time slot tracking)
- BMI Log History (calculates BMI, Body Fat %, BMR & Maintenance Calories)
- Inbox Notifications
- Review & Testimonial Submission

### Admin (Sanity CMS Studio)
- Manage Memberships
- Manage Coaches
- Manage Facilities
- Manage Insights (Blog Articles)
- Manage Gym Classes
- Manage Member Reviews
- Manage System Settings

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15
- React
- TypeScript
- Tailwind CSS

### Backend / CMS
- Sanity CMS
- Sanity Studio

---

## 📂 Project Structure

```text
Elite Gym/
│
├── app/
│   ├── (site)     # Public marketing pages (Our Story, Facilities, etc.)
│   ├── (member)   # Private portal pages (Dashboard, BMI Log, etc.)
│   ├── (auth)     # Auth pages (Login, Register)
│   ├── api        # API route endpoints
│   └── studio     # Embedded Sanity Studio
│
├── components/    # Reusable UI & Layout Components
├── sanity/
│   ├── lib/
│   └── schemas/   # Sanity Database Schemas
│
├── assets/
├── public/
└── package.json
```

---

## 🚀 Installation

Clone the repository.

```bash
git clone https://github.com/your-username/elite-gym.git
```

Navigate to the project.

```bash
cd elite-gym
```

Install dependencies.

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=33hdmw4c
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-01-01
SANITY_WRITE_TOKEN=your_sanity_write_token
```

> [!IMPORTANT]
> To enable database writes (registering users, logging BMI records, saving contact enquiries), ensure you configure a `SANITY_WRITE_TOKEN` with **Editor** role permissions from your [Sanity Manage Portal](https://sanity.io/manage).

---

## ▶️ Run the Project

```bash
npm run dev
```

Visit the website at:
```
http://localhost:3000
```

Access the Sanity Studio dashboard at:
```
http://localhost:3000/studio
```

---

## 📦 Content Management

Website content is managed manually through **Sanity Studio**.

Available document types include:

- Memberships
- Coaches
- Facilities
- Insights (Blog Articles)
- Gym Classes
- Reviews
- Members
- Settings

After adding or updating content in Sanity Studio, publish the changes to display them on the website.

---

## 📄 License

This project is developed for educational and portfolio purposes.
