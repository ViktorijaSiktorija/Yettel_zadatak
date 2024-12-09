Task and User Management API
This project is a Node.js-based API for managing tasks and users. It includes authentication, role-based access control (RBAC), integration tests, and uses PostgreSQL as the database, all running within Docker.

Features
Role-Based Access Control: Admin and Basic User roles with distinct permissions.
Task Management: Create, update, delete, and view tasks with role-based access.
Authentication: JWT-based authentication for secure API access.
Database Integration: PostgreSQL database managed via pg and pg-pool.
Dockerized Setup: Simplified environment configuration with Docker.
Installation
Prerequisites
Node.js (v14 or later)
npm (Node Package Manager)
Docker and Docker Compose
Steps
Clone the repository:

bash
Copy code
git clone <repository_url>
cd <repository_folder>
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the project root.

Add the following variables to the file:

plaintext
Copy code
ADMIN_TOKEN=<eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqYW5lLnNtaXRoQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOjEyM30.N0XyxvraWN9ZgUgQXh-2Nt250Fwen1UserVOVD-Qae8>
BASIC_TOKEN=<eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoxMjN9.pwqgNnGWrs0mwkVJlcNSQjsBBK98wbZtOl8Y-cM3hJo>
POSTGRES_USER=<postgres>
POSTGRES_PASSWORD=<postgres>
POSTGRES_DB=<yettel_tasks>
DB_HOST=<localhost>
DB_PORT=<5432>
Copy code
Start the application using Docker:

bash
Copy code
docker-compose up
By default, the server runs on http://localhost:3000.

API Endpoints
Task Management
Admin: List all tasks: GET /tasks
Basic: List user's own tasks: GET /tasks/:id
Basic: Create a task: POST /tasks
Update a task: PUT /tasks/:id
Admin: Delete a task: DELETE /tasks/:id
User Management
View User by ID: (Feature not implemented yet)
Project Structure
bash
Copy code
.
├── src/ # Application source code
│ ├── auth/ # Authentication logic
│ ├── db/ # Database connection logic
│ ├── task/ # Task-specific code
│ │ ├── controllers/ # Task-related business logic
│ │ ├── routes/ # Task API routes
│ │ ├── queries/ # Task queries
│ ├── user/ # User-specific code
│ │ ├── controllers/ # User-related business logic
│ │ ├── routes/ # User API routes
│ │ ├── queries/ # User queries
├── test/ # Integration tests
├── var/
├── .env # Environment variable configuration
├── Dockerfile # Docker configuration for app container
├── package.json # Project metadata and dependencies
├── README.md # Project documentation
└── server.js # Entry point for starting the app
Testing
Integration tests are included to verify API functionality.

Run Tests
Ensure the .env file is configured correctly.

Run the tests:

bash
Copy code
npm test
Dependencies
Express: Web framework for Node.js
pg/pg-pool: PostgreSQL client for database integration
jsonwebtoken: Secure token generation and validation
dotenv: Environment variable management
mocha, chai, supertest: Testing frameworks
Future Enhancements
Implement user registration and password recovery.
Improve error handling and validation messages.
Add pagination for large data sets.
Set up CI/CD pipeline for automated testing and deployment.
Contributing
Fork the repository.

Create a new feature branch:

bash
Copy code
git checkout -b feature/your-feature
Commit changes and push to your forked repository.

Open a pull request to the main branch.