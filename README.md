**Express Tasks API**

Express.js | Node.js Backend Development

REST API | MVC Architecture | Middleware

# **About**

A RESTful Task Management API built with Express.js, following the MVC architectural pattern. This project covers the full Week 2 curriculum: routing, middleware, validation, error handling, REST conventions, and clean code structure.

## **Tech Stack**

• Node.js v20+ with ES Modules (ESM)

• Express.js — routing and middleware

• express-validator — request validation

• File-based storage — data/tasks.json

# **Getting Started**

## **Prerequisites**

• Node.js v20 or higher

• npm v9 or higher

## **Installation**

1. Clone the repository:

git clone https://github.com/your-username/express-tasks-api.git

cd express-tasks-api

2. Install dependencies:

npm install

3. Create environment file:

cp .env.example .env

4. Start the development server:

npm run dev

The server will start on http://localhost:3000

## **Environment Variables**

| **Variable** | **Default**       | **Description**            |
| ------------ | ----------------- | -------------------------- |
| PORT         | 3000              | Port the server listens on |
| NODE_ENV     | development       | Environment mode           |
| APP_NAME     | Express Tasks API | Application name           |
| API_KEY      | your-secret-key   | API key for authentication |

# **Project Structure**

express-tasks-api/

├── src/

│   ├── app.js                   # Express app setup

│   ├── server.js                # Entry point

│   ├── config.js                # Environment config

│   ├── tasks/                   # Tasks module (MVC)

│   │   ├── tasks.routes.js      # Route declarations

│   │   ├── tasks.controller.js  # HTTP layer

│   │   ├── tasks.service.js     # Business logic

│   │   ├── tasks.model.js       # File I/O

│   │   └── tasks.validation.js  # Validation rules

│   ├── middlewares/

│   │   ├── logger.js            # Request logger

│   │   ├── auth.js              # API key auth

│   │   ├── validate.js          # Validation runner

│   │   ├── rateLimiter.js       # Rate limiting

│   │   └── errorHandler.js      # Global error handler

│   └── errors/

│       └── AppError.js          # Custom error class

├── data/

│   └── tasks.json               # File-based storage

├── .env

├── .env.example

└── package.json

# **API Endpoints**

Base URL: http://localhost:3000

All endpoints (except GET /) require the x-api-key header:

x-api-key: your-secret-key

## **General**

| **Method** | **Endpoint** | **Auth** | **Description**                  |
| ---------- | ------------ | -------- | -------------------------------- |
| **GET**    | /            | No       | API info and available endpoints |

## **Tasks**

| **Method** | **Endpoint**        | **Auth** | **Description**                       |
| ---------- | ------------------- | -------- | ------------------------------------- |
| **GET**    | /tasks              | Yes      | Get all tasks (with pagination)       |
| **GET**    | /tasks?status=      | Yes      | Filter tasks by status (pending/done) |
| **GET**    | /tasks?page=&limit= | Yes      | Paginated task list                   |
| **POST**   | /tasks              | Yes      | Create a new task                     |
| **GET**    | /tasks/:id          | Yes      | Get a single task by ID               |
| **PATCH**  | /tasks/:id          | Yes      | Update a task                         |
| **DELETE** | /tasks/:id          | Yes      | Delete a task                         |

# **Request & Response Examples**

## **Create a Task**

**Request**

POST /tasks

x-api-key: your-secret-key

Content-Type: application/json

{

"title": "Learn Express MVC",

"status": "pending"

}

**Response — 201 Created**

{

"id": "a1b2c3d4-...",

"title": "Learn Express MVC",

"status": "pending",

"createdAt": "2025-01-01T10:00:00.000Z"

}

## **Get All Tasks (with Pagination)**

**Request**

GET /tasks?page=1&limit=5

x-api-key: your-secret-key

**Response — 200 OK**

{

"data": [ ... ],

"total": 12,

"page": 1,

"limit": 5

}

## **Validation Error**

**Request**

POST /tasks → { "title": "ab" }

**Response — 422 Unprocessable Entity**

{

"errors": [

    { "field": "title", "message": "Title must be at least 3 characters" }

]

}

# **Middleware**

| **Middleware**  | **Description**                                                             |
| --------------- | --------------------------------------------------------------------------- |
| logger.js       | Logs method, URL, status code and response time for every request           |
| auth.js         | Validates x-api-key header — returns 401 if missing or incorrect            |
| validate.js     | Runs express-validator rules — returns 422 with all errors at once          |
| rateLimiter.js  | Blocks IPs sending more than 10 requests per minute — returns 429           |
| errorHandler.js | Global error handler — returns clean JSON, hides stack traces in production |
