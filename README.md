# Task Manager REST API

A simple and scalable backend Task Manager API built using **Node.js**, **Express**, and **MySQL**.  
This project provides RESTful endpoints to create, read, update, and delete tasks.

---

## Features

- Create new tasks
- Get all tasks
- Update existing tasks
- Delete tasks
- RESTful API structure
- MySQL database integration
- Tested using Postman

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- JavaScript

---

## Project Structure

PROJECT/
│
├── server.js # Main server file
├── db.js # Database connection
├── routes/ # API routes
├── package.json
└── .gitignore


---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/task-manager-api.git
cd task-manager-api
2. Install dependencies
npm install
3. Start MySQL
Open XAMPP

Start MySQL

4. Create database
Open phpMyAdmin and run:

CREATE DATABASE taskmanager;
USE taskmanager;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending'
);
5. Run the server
node server.js
Server will start at:

http://localhost:3000
API Endpoints
Get all tasks
GET /tasks
Create a task
POST /tasks
Body (JSON):

{
  "title": "Learn Node.js",
  "description": "Complete backend project"
}
Update a task
PUT /tasks/:id
Delete a task
DELETE /tasks/:id
Future Improvements
User authentication (JWT)

Task ownership per user

Input validation

Deployment

Author
Kumari Supriya
B.Tech CSE
Backend & Web Development Enthusiast
