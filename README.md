# ✅ TODO App — Internship Assignment

A full-stack TODO web application built with the MERN stack, featuring user authentication, task management, star-based task rating, and a responsive UI built with Tailwind CSS and shadcn/ui components.

## ✨ Features

- 🧑‍💼 Register / Login / Logout
- ✅ Create, Edit, Delete tasks
- 🌟 Rate tasks from 1 to 5 stars
- 🔒 Authenticated dashboard
- 💅 Clean, responsive UI with Tailwind & shadcn/ui
- ⚙️ Modular and scalable codebase

## 🛠️ Tech Stack
### Frontend
- [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [React Query](https://tanstack.com/query/latest) for data fetching
- [react-hook-form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for form handling

### Backend
- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- JWT-based authentication (access + refresh tokens)

## 📦 Setup

### Prerequisites

- Node.js ≥ 18.x
- pnpm (or npm/yarn)
- MongoDB (local or Atlas)

---

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### 2. Start Backend

```bash
cd backend
pnpm install
pnpm dev
```
- #### Make sure to add the required variables in `backend/config/.env.development`:
    ```ini
    MONGODB_URI=<your_mongodb_uri>

    ACCESS_TOKEN_SECRET=<secret_string>
    REFRESH_TOKEN_SECRET=<secret_string>
    ```

### 3. Start Frontend
```bash
cd frontend
pnpm install
pnpm dev
```

### 📁 Folder Structure
```css
.
├── backend
│   ├── config/
│       ├── .env.development
│   ├── src/
│       ├── common/
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── schemas/
│       ├── types/
│       ├── utils/
│       └── server.ts
│       └── index.ts
├── frontend
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── types/
│   │   └── App.tsx
│   │   └── main.tsx
└── README.md
```

---

### ✅ Demo Features (Walkthrough)
- 📝 Dashboard: View all tasks, add new ones with a modal form
- 🧠 Ratings: Click stars to rate task importance
- 🔁 Edit Modal: Pre-filled form to update existing tasks
- 🧼 Validation: Required fields with inline errors

### 📜 License
MIT — Free to use for personal, academic, or professional projects.