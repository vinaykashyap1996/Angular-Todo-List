# To-Do List Backend API

A RESTful backend API built with **Node.js 22**, **Express**, and **MongoDB** for managing to-do lists and tasks. This API supports creating, retrieving, updating, and deleting lists and tasks, as well as toggling task completion.

## Tech Stack

- Node.js (v22)
- Express.js
- MongoDB with Mongoose
- dotenv for environment variables
- Nodemon (for development)
- Optional: Postman for testing

## 📁 Project Structure

```
TODO-backend/
│
├── controllers/       # Route handlers (business logic)
├── models/            # Mongoose schemas
├── data/              # Database connection
├── routes/            # API endpoints
├── config/            # Configuration 
├── middleware/        # Error handling, logging, etc.
├── .env               # Environment variables
├── app.ts             # App entry point
├── package.json
```

## Clone the Repository

```bash
git clone git@github.com:vinaykashyap1996/Angular-Todo-List.git
cd TODO-backend
```

## 📦 Install Dependencies

```bash
npm install
```

## ⚙️ Configure Environment

Create a `.env` file in the root directory.

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-db
```

## ▶️ Start the Server

```bash
npm run dev   # Runs with nodemon
yarn dev      # If using yarn

npm start     # Regular start
```

## 🔄 API Endpoints

Base URL: `/api/`

### Lists

| Method | Endpoint             | Description                   |
|--------|----------------------|-------------------------------|
| GET    | `/`                  | Get all to-do lists           |
| POST   | `/`                  | Create a new to-do list       |
| GET    | `/:id`               | Get a single to-do list by ID |

### Tasks

| Method | Endpoint                               | Description                        |
|--------|----------------------------------------|------------------------------------|
| POST   | `/:id/tasks`                           | Add a task to a list               |
| PATCH  | `/:id/tasks/:taskId`                   | Toggle task completion status      |

## Run Unit Tests

```bash
npm run test
```

Runs API unit test cases using your configured test framework (e.g., Jest, Mocha).
