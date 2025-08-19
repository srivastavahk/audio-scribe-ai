# NotesApp - Frontend

This is the frontend for NotesApp, a modern, intelligent note management application. It's a Single Page Application (SPA) built with React, Vite, and Tailwind CSS.

## ✨ Features

- **Secure Authentication**: Sign up, sign in, and session management powered by Supabase.
- **Full CRUD for Notes**: Create, read, update, and delete notes.
- **AI-Powered Search**: Seamlessly integrated semantic search.
- **Responsive Design**: Excellent user experience on desktop, tablet, and mobile.
- **Modern Tech Stack**: Built with React 18, Vite, and Tailwind CSS for a fast and maintainable application.
- **User Feedback**: Non-intrusive toast notifications for all user actions.

---

## 🛠️ Tech Stack

- **Framework**: React (v18+)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router (v6)
- **Authentication**: `@supabase/supabase-js`
- **UI**:
  - **Icons**: Lucide React
  - **Notifications**: Sonner

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A Supabase project for authentication
- The [NotesApp Backend](https://github.com/your-repo/notesapp-backend) deployed and running

### 1. Clone the Repository

```bash
git clone [https://github.com/your-repo/notesapp-frontend.git](https://github.com/your-repo/notesapp-frontend.git)
cd notesapp-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add your Supabase and backend API credentials.

```
# Supabase Credentials
VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"

# Backend API URL
VITE_API_BASE_URL="YOUR_DEPLOYED_BACKEND_URL"
```

> **Security Note**: Ensure your Supabase project has Row Level Security (RLS) enabled on all tables to protect user data.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🧪 Testing

The application is structured for testability. To add tests, you can use a framework like Vitest (for unit/integration tests) and Playwright or Cypress (for end-to-end tests).

**Example Setup (Vitest):**
1. Install Vitest: `npm install -D vitest jsdom @testing-library/react`
2. Configure `vite.config.js` to include the test environment.
3. Write test files (e.g., `Component.test.jsx`) and run with `npm run test`.

---

## ☁️ Deployment

This application is optimized for deployment on platforms like Vercel or Netlify.

### Deploying to Vercel

1. **Push your code** to a Git repository (GitHub, GitLab, etc.).
2. **Import the project** into Vercel from your Git repository.
3. **Configure Environment Variables**: In the Vercel project settings, add the same environment variables defined in your `.env.local` file (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_BASE_URL`).
4. **Deploy**. Vercel will automatically detect the Vite configuration and build your project.
