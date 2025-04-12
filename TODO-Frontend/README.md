# To-Do List Application

## Description

This is a simple web application for managing to-do lists.  Users can:

* See a list of to-do lists, with a title and summary of tasks.
* View the tasks in a selected to-do list, including title, description, and status.
* Add a new to-do list with a title.
* Add a new task to a to-do list with a title and description.
* Mark/tag a task as completed.

The application integrates with a REST API and persists data in the browser's local storage.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Technology Stack](#technology-stack)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

## Installation

1.  **Prerequisites:**
    * [Node.js](https://nodejs.org/) (version 15 or later)
    * [npm](https://www.npmjs.com/) (version 7 or later, usually comes with Node.js)
    * [Angular CLI](https://angular.io/cli) (version 15 or later): `npm install -g @angular/cli`
    * [Git](https://git-scm.com/) (if cloning from a repository)

2.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd your-project-name
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

## Usage

1.  **Start the development server:**
    ```bash
    ng serve
    ```

2.  **Open your browser:**
    * Navigate to `http://localhost:4200/`

3.  **Using the application:**
    * **View To-Do Lists:** The main page displays a list of to-do lists.
    * **View Tasks:** Click on a to-do list to see its tasks.
    * **Add a To-Do List:** Use the "Add New To-Do List" functionality.
    * **Add a Task:** In the detailed view of a to-do list, use the "Add New Task" functionality.
    * **Mark Task as Completed:** In the detailed view, toggle the task's status.

## Features

* Displaying to-do lists with titles and task summaries.
* Displaying tasks within a to-do list (title, description, status).
* Adding new to-do lists.
* Adding new tasks to a to-do list.
* Marking tasks as completed.
* REST API integration.
* Data persistence using local storage.
* Responsive design.

## Technology Stack

* Frontend:
    * [Angular](https://angular.io/) (15+)
    * TypeScript
    * HTML
    * CSS
    * (Optional) Angular Material or other UI framework
* Backend:
    * REST API (implementation details vary -  could be a public API or a custom Node.js/Express backend)
* State Management:
    * BehaviorSubject (or NgRx, Akita, depending on complexity)
* Other:
    * Local Storage
    * ESLint
    * Prettier
    * Unit Tests

## Contributing

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Commit your changes and push to your fork.
5.  Submit a pull request.

