# Task Manager API & Web Platform

A fully containerized full-stack web application designed for task management. 

**Author's Note:** The core architecture, database schema, and the entire backend logic (FastAPI, PostgreSQL, Authentication) were developed **100% independently by me**. The frontend interface (HTML/CSS/Vanilla JS) was built with the assistance of AI to provide a clean, responsive UI to interact with my API.

## 🚀 Features

* **RESTful API:** Fully documented API endpoints for user management and task CRUD operations.
* **Robust Security:**
  * Password hashing using `bcrypt`.
  * Stateless session management via **JWT (JSON Web Tokens)**.
  * OTP (One-Time Password) email verification workflow via SMTP for account activation.
* **Database Management:** Relational data mapping using **SQLAlchemy** ORM, connected to a **PostgreSQL 15** database.
* **Containerization:** The entire application (Backend, Database, Frontend via Nginx) is orchestrated using **Docker Compose**.
* **Dynamic Frontend:** Real-time DOM manipulation and API integration using the Fetch API.

## 🛠️ Tech Stack

* **Backend:** Python 3.11, FastAPI, SQLAlchemy, PostgreSQL, Uvicorn.
* **Frontend:** HTML5, Custom CSS (Glassmorphism), Vanilla JavaScript (ES6+), Nginx.
* **DevOps:** Docker, Docker Compose.

## ⚙️ Running the Project Locally (Docker)

The easiest way to run the application is using Docker. Ensure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your machine.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Oleksandr07Lomov/task-manager-api.git
   cd task-manager-api
   ```

2. **Build and start the containers:**
   ```bash
   docker compose up --build -d
   ```
   *The `-d` flag runs the containers in detached (background) mode.*

3. **Access the application:**
   * **Frontend UI:** Open your browser and navigate to `http://localhost:3000`
   * **API Documentation:** Navigate to `http://localhost:8000/docs` to access the interactive Swagger UI.

## 📖 API Endpoints Overview

FastAPI automatically generates interactive API documentation. You can test these endpoints directly via the `/docs` route.

* **Auth:**
  * `POST /auth/register` - Register a new user (triggers OTP email).
  * `POST /auth/verify` - Verify account using OTP.
  * `POST /auth/login` - Authenticate and receive JWT access token.
* **Tasks:**
  * `POST /tasks/` - Create a new task.
  * `GET /tasks/` - Retrieve all tasks for the authenticated user.
  * `PUT /tasks/{task_id}` - Update a task.
  * `DELETE /tasks/{task_id}` - Delete a task.

## 🛑 Stopping the Application

To stop the running containers without losing database data, execute:
```bash
docker compose down
```