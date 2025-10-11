# 📝 Notely — Full Stack Notes App

A beautiful and modern full-stack notes application built with **React + Tailwind CSS** for the frontend and **Node.js + Express + MongoDB** for the backend.  
Simple. Colorful. Productive. 💫

---

## 🚀 Overview

**Notely** lets you securely create, edit, and organize notes with a smooth and elegant interface.  
It includes full authentication, CRUD features, and search functionality — everything wrapped in a stunning gradient UI.

---

## ✨ Features

- 🔐 User Authentication (Register/Login)
- 🗒️ Create, Edit, Delete, View Notes
- 🔍 Search and Filter Notes
- 🏷️ Add Tags for Organization
- 🌈 Beautiful Gradient UI (Indigo → Purple → Pink)
- ⚡ Responsive Design
- 🧠 Secure Backend API with JWT Authentication
- 💾 MongoDB for Data Persistence

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- React Icons

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing
- dotenv for environment variables

###Install dependencies

npm install

###🖥️ Frontend Setup

##Navigate to frontend folder
cd frontend

##Install dependencies
npm install

##Create .env file
VITE_API_BASE_URL=http://localhost:5000/api

##Start the frontend
npm run dev
App runs on http://localhost:5173

###Backend SetUp

##Create a .env file
PORT=8000
MONGO_URI=mongodb://localhost:27017/notely
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
SALT_ROUNDS=10

##Run the server
npm run dev

Server runs on http://localhost:8000

