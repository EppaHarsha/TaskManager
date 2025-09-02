# 📝 Task Manager Application

A full-stack Task Manager application with authentication and CRUD operations.  
Users can sign up, log in, and manage their tasks efficiently.  

🔗 **Live Demo**: [Task Manager App](https://task-manager-one-silk.vercel.app)

---

## ✨ Features

- 🔐 **User Authentication** (JWT-based login & signup)
- ➕ **Add Task** – Create new tasks
- ✅ **Mark as Completed** – Track finished tasks
- 📝 **Edit Task** – Update existing tasks
- ❌ **Delete Task** – Remove tasks
- ⚡ **Real-time Updates** (frontend powered by React + Vite)
- 🎨 **Modern UI** with responsive design

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- React Toastify (notifications)

### Backend
- Node.js + Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens) for authentication
- Bcrypt for password hashing

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/task-manager.git
``` 
cd task-manager
2. Install dependencies
### Backend
- cd backend
- npm install
### Frontend
- cd frontend
- npm install

### 3. Setup environment variables

- Create a .env file inside backend with:

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key

### 4. Run the app
- Backend
- npm start

### Frontend
- npm run dev
