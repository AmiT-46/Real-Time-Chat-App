# 💬 Real-Time Chat Application

A full-stack, real-time messaging application built using the **MERN Stack** and **Socket.IO**. The application enables instant bi-directional communication, secure JWT authentication, global state management with Zustand, and a modern responsive user interface.

---

## Features

* **Real-Time Messaging** – Instant message delivery using Socket.IO without page refreshes.
* **Secure Authentication** – JWT-based authentication with passwords hashed using bcryptjs.
* **Global State Management** – Efficient state handling using Zustand.
* **Modern UI/UX** – Responsive glassmorphism-inspired interface built with Tailwind CSS.
* **Smart Input & Scrolling** – Auto-expanding text areas and smooth scrolling to the latest messages.
* **Dynamic Avatars** – Automatically generated avatars based on user initials.
* **Route Protection** – Protected routes for authenticated users and automatic redirects.
* **Responsive Design** – Optimized experience across desktop and mobile devices.

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Zustand
* React Router DOM
* Axios
* Socket.IO Client
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JSON Web Tokens (JWT)
* bcryptjs

### Database

* MongoDB Atlas

---

## 📂 Project Structure

```text
chat-app/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── package.json
│   ├── .env.example
│   └── ...
│
└── README.md
```

---

## 🚀 Local Development Setup

### Prerequisites

Make sure you have the following installed:

* Node.js (v18 or later recommended)
* npm
* MongoDB Atlas account (or local MongoDB instance)
* Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/AmiT-46/Real-Time-Chat-App.git
cd Real-Time-Chat-App
```

---

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory and add:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

The backend server will run on:

```text
http://localhost:3000
```

---

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend application will run on:

```text
http://localhost:5173
```

---

### 4. Run the Application

1. Start the backend server.
2. Start the frontend development server.
3. Open `http://localhost:5173` in your browser.
4. Register a new account or log in.
5. Start chatting in real time.

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder using the following template:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Example `.env.example`

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🔒 Security

* Passwords are securely hashed using bcryptjs before storage.
* Authentication is handled using JWT tokens.
* Sensitive configuration values are stored in environment variables.
* `.env` files are excluded from version control.

---
