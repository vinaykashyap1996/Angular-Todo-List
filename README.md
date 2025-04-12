# Angular To-Do List App

A responsive and modular **Angular 15+** web application for managing to-do lists and tasks, 
integrated with a RESTful backend API. Users can create and manage lists, add tasks, mark them as completed, and view detailed task summaries.

---

## Features

- View a list of to-do lists with summaries (total and completed tasks)
- View tasks in a specific list with full details
- Create new to-do lists
- Add tasks to a specific list
- Mark tasks as completed
- Responsive design for mobile and desktop
- Integration with REST API and local storage
- Clean codebase with unit tests and linting

---

## Tech Stack

- **Angular 15+**
- **TypeScript**
- **RxJS** (State management via `BehaviorSubject`, or optionally **NgRx**/**Akita**)
- **Angular Material** (optional, but recommended)
- **LocalStorage** for persistence
- **REST API** (public or custom backend)
- **Unit Testing** with Jasmine/Karma
- **ESLint** and **Prettier** for code quality

---

## API Integration

You can either:

- Use a **public API** like `https://jsonplaceholder.typicode.com/todos`
- Or build your **own Node.js/Express backend** with CRUD routes for lists and tasks

---

## Evaluation Criteria

-  **Functionality** – All features implemented as per the requirements
-  **Code Quality** – Clean, commented, and well-structured code
-  **Architecture** – Proper use of Angular modules, components, and services
-  **Performance** – Efficient rendering and state management
-  **Responsiveness** – Works well on different screen sizes
-  **Testing** – Unit tests for key logic
-  **Tooling** – Proper use of Angular CLI, linting, formatting, etc.
