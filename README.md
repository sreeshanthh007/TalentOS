# TalentOS - AI-Powered Recruitment Platform

TalentOS is a modern, full-stack recruitment platform designed to bridge the gap between talented candidates and growing companies. Built with a focus on speed, user experience, and AI integration, TalentOS simplifies the hiring process for Everyone.

![TalentOS Header](client/public/favicon.svg) <!-- Using favicon as a placeholder if no header image exists -->

## 🚀 Features

### For Candidates
- **AI-Powered Resume Builder**: Leverages Gemini AI to generate professional summaries and tailor skills based on target job roles.
- **Smart Job Tracking**: Real-time status updates for applications (Applied, Shortlisted, Interviewing, Offered).
- **Comprehensive Profile**: Manage your professional identity with ease, including education, experience, and skills.
- **Seamless Applications**: One-click apply using your saved profile and resume.

### For Employers
- **Company Branding**: Customizable company profiles with verified badges.
- **Job Management**: Complete lifecycle management of job postings with slot-based subscription limits.
- **Applicant Pipeline**: Advanced tracking system to manage candidates through various stages of the hiring funnel.
- **Subscription Plans**: Flexible pricing tiers (Basic, Pro, Enterprise) to suit different hiring needs.
- **Verification Center**: Secure document upload for company verification.

### For Admins
- **Unified Dashboard**: Bird's-eye view of platform statistics (Total Users, Jobs, Employers).
- **Employer Verification**: Review and approve company credentials to maintain platform trust.
- **Support Stream**: Centralized management of sales inquiries and support tickets.
- **Platform Control**: Manage subscription plans, users, and testimonials.

### Shared Capabilities
- **Real-Time Chat**: Instant messaging between admins and employers for support and inquiries, powered by Supabase Realtime.
- **High-Security Auth**: Cookie-based JWT authentication with role-based access control (RBAC).
- **Responsive Design**: A stunning, high-performance UI tailored for both web and mobile access.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) (Server State) & [Redux Toolkit](https://redux-toolkit.js.org/) (Client State)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) (Animations)
- **Forms**: [Formik](https://formik.org/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Architecture**: Clean Architecture with custom Dependency Injection
- **Database / Backend-as-a-Service**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage, Realtime)
- **AI Integration**: [Google Gemini AI](https://ai.google.dev/)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Supabase account with a configured project

### Backend Setup
1. Navigate to the `api` directory:
   ```bash
   cd api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your Supabase and Gemini API credentials:
   ```env
   PORT=5000
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_key
   GEMINI_API_KEY=your_gemini_key
   JWT_SECRET=your_jwt_secret
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   ```
4. Start the application:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```text
TalentOS/
├── api/                # Express Backend
│   ├── src/
│   │   ├── modules/    # Domain-specific modules (Auth, Admin, etc.)
│   │   ├── shared/     # Common utilities, constants, and middlewares
│   │   └── di/         # Dependency Injection layer
├── client/             # Vite + React Frontend
│   ├── src/
│   │   ├── modules/    # UI logic grouped by domain
│   │   ├── shared/     # Reusable components, hooks, and utils
│   │   └── store/      # Global state management
└── README.md           # You are here!
```
---
