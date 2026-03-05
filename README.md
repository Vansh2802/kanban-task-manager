# TaskFlow — Full-Stack Task Management App

A Trello-like task management application built with React, Node.js, Express, MongoDB, and JWT authentication.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite, Tailwind CSS, Axios, react-beautiful-dnd |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |

---

## Project Structure

```
taskmanager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── boardController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Board.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── boardRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── BoardCard.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── TaskColumn.jsx
    │   │   └── CreateTaskModal.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── BoardView.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   ├── authService.js
    │   │   ├── boardService.js
    │   │   └── taskService.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## Setup Instructions

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)

---

### 1. Backend Setup

```bash
cd taskmanager/backend
npm install
```

Edit `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_key_change_this
```

Start the backend:
```bash
npm run dev     # development (nodemon)
npm start       # production
```

The API runs at: **http://localhost:5000**

---

### 2. Frontend Setup

```bash
cd taskmanager/frontend
npm install
npm run dev
```

The app runs at: **http://localhost:5173**

> The Vite dev server proxies `/api` requests to `http://localhost:5000` automatically.

---

## API Reference

### Auth

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | `{ name, email, password }` | Register new user |
| POST | `/api/auth/login` | `{ email, password }` | Login, returns JWT |

### Boards *(Protected — Bearer token required)*

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | `/api/boards` | — | Get all user boards |
| POST | `/api/boards` | `{ title }` | Create board |
| DELETE | `/api/boards/:id` | — | Delete board + all its tasks |

### Tasks *(Protected — Bearer token required)*

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | `/api/tasks/:boardId` | — | Get tasks for a board |
| POST | `/api/tasks` | `{ title, description, status, dueDate, boardId }` | Create task |
| PUT | `/api/tasks/:id` | `{ title?, description?, status?, dueDate? }` | Update task |
| DELETE | `/api/tasks/:id` | — | Delete task |

---

## Features

- ✅ JWT-based authentication (register / login / logout)
- ✅ Protected routes (frontend + backend)
- ✅ Create, view, and delete boards
- ✅ Create, edit, and delete tasks
- ✅ Task status: **Todo → Doing → Done**
- ✅ Due dates with overdue highlighting
- ✅ Drag-and-drop between columns (react-beautiful-dnd)
- ✅ Optimistic UI updates during drag
- ✅ Responsive design (mobile → desktop)
- ✅ Dark UI with glassmorphism

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/taskmanager` |
| `JWT_SECRET` | Secret key for JWT signing | *(set a strong secret)* |

> ⚠️ **Never commit your `.env` file to version control.**

---

## Screenshots

| Page | Route |
|------|-------|
| Login | `/login` |
| Register | `/register` |
| Dashboard | `/dashboard` |
| Board View | `/board/:id` |
