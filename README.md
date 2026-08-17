# Mohammad Raza - Personal Portfolio & Private Admin Dashboard System

A production-ready, highly responsive, recruiter-focused Developer Portfolio and private Content Management Admin Dashboard (`/admin`) for **Mohammad Raza Salim Sheikh** (Computer Science Engineering Student).

Built with **Next.js 14**, **React 18**, **TypeScript**, **Tailwind CSS**, and a **Dual Database Storage Engine** (MongoDB + JSON File Persistence fallback).

---

## 🌟 Key Features

### 🌐 1. Public Portfolio (`/`)
- **Hero Section**: Personal branding, photo badge, headline, social links, and CTAs (View Work, Download Resume, Contact).
- **About Me**: Career focus, soft skills tags, spoken languages, and technical interests.
- **Categorized Skills**: Filterable skills across Coding Languages, Web Development, Databases, Tools & Technologies, IoT, and Other Areas with percentage progress metrics.
- **Engineering Projects**: Filterable project cards (All, Featured, Team/Hackathon, Personal) with modal detail dialogs showing tech badges, feature descriptions, and source code / live demo links.
- **Education & Experience Timelines**: Timeline showcase of Suryodaya College of Engineering & Technology, Progressive Science Junior College, Chitransh Academy, and Deloitte / Tata / Vista Equity virtual job simulations.
- **Certifications Grid**: Badges for Cisco, HackerRank, Deloitte, Tata, and Vista Equity Partners credentials.
- **Hackathons & Honors**: Competitive hackathon showcase (NIT Nagpur with team AuraTechRebels).
- **Interactive Contact Form**: Client-side validation, error/success status, and submission directly to the private admin inbox.
- **PDF Resume Preview & Download**: Instant modal viewer and one-click PDF download.

---

### 🔒 2. Private Admin Dashboard (`/admin`)
- **Protected SaaS Interface**: Protected by JWT session tokens and HTTP-only cookies.
- **Automatic Auth Guard**: Unauthenticated access to `/admin` redirects to `/admin/login`.
- **Dashboard Overview**: Metric counts (Projects, Skills, Certifications, Education, Hackathons) and real-time security audit activity logs.
- **Complete CRUD Controls**: Add, edit, delete, publish toggle (`ON/OFF`), and feature toggle (`ON/OFF`) for all portfolio sections.
- **Media & Resume Replacement**: Upload profile pictures, project screenshots, and replace the official PDF resume without editing code.
- **Contact Messages Inbox**: View incoming messages from recruiters, mark read/unread, and delete inquiries.
- **Website & Security Settings**: Update site titles, SEO descriptions, contact form settings, admin email, and change admin password.

---

## 🔑 Default Admin Credentials

- **Login URL**: `http://localhost:3000/admin/login`
- **Default Email**: `admin@mohammadraza.dev` (or `razasheikh092007@gmail.com`)
- **Default Password**: `Admin@12345`

*Note: You can update your email and password anytime inside **Admin Dashboard -> Website Settings**.*

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```text
Raza.Port/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Public Recruiter Portfolio
│   │   ├── admin/
│   │   │   ├── login/page.tsx          # Protected Login Page
│   │   │   ├── dashboard/              # SaaS Admin Control Panel Pages
│   │   └── api/                        # Next.js API Endpoints
│   ├── components/
│   │   ├── public/                     # Public Portfolio UI Components
│   │   └── admin/                      # Admin SaaS UI Components
│   ├── lib/
│   │   ├── auth.ts                     # JWT & Password Hash System
│   │   ├── db.ts                       # Dual Database & JSON File Persistence Layer
│   │   └── types.ts                    # TypeScript Definitions
│   └── data/
│       └── db.json                     # Initial Resume Dataset
├── public/
│   └── uploads/                        # Uploaded Media & Resume PDFs
└── .env.local
```
