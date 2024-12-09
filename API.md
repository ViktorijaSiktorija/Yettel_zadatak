# Task Management API Documentation

## 1. **Get All Tasks**
- **URL**: `/tasks`
- **Method**: `GET`
- **Description**: Fetches all tasks in the system (accessible only by admin users).

### **Headers**:
- `Authorization`: `Basic Bearer <token>`

### **Response Codes**:
- **200 OK**: Returns a list of tasks.
- **403 Forbidden**: Access denied for non-admin users.
- **500 Internal Server Error**: If there is a server or database issue.

---

## 2. **Get User's Tasks**
- **URL**: `/tasks/user/:userId`
- **Method**: `GET`
- **Description**: Fetches all tasks assigned to a specific user. Basic users can only access their own tasks.

### **Path Parameters**:
- `userId`: ID of the user whose tasks are being fetched.

### **Headers**:
- `Authorization`: `Basic Bearer <token>`

### **Response Codes**:
- **200 OK**: Returns tasks for the specified user.
- **403 Forbidden**: Basic user attempting to access another user's tasks.
- **404 Not Found**: No tasks found for the specified user.
- **500 Internal Server Error**: Server or database error.

---

## 3. **Create Task**
- **URL**: `/tasks`
- **Method**: `POST`
- **Description**: Creates a new task in the system. Admin users can create tasks for any user, while basic users can only create tasks for themselves.

### **Headers**:
- `Authorization`: `Basic Bearer <token>`



### Response Codes:
201 Created: Task created successfully.
400 Bad Request: Invalid or missing task data.
403 Forbidden: Non-admin attempting to create a task.
500 Internal Server Error: Server or database error.


### POST /tasks
- **Authorization: Basic Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoxMjN9.pwqgNnGWrs0mwkVJlcNSQjsBBK98wbZtOl8Y-cM3hJo Admin Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqYW5lLnNtaXRoQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOjEyM30.N0XyxvraWN9ZgUgQXh-2Nt250Fwen1UserVOVD-Qae8
Content-Type: application/json

{
"body": "Write unit tests for API",
"userId": 4
}
Example Response:

json

{
"message": "Task created successfully",
"id": 15
}

## 4. **Update a Task**
   URL: /tasks/:id
   Method: PUT
   Description: Updates the description of an existing task. Admins can update any task, while basic users can only update their own tasks.
   Path Parameters:
   id: ID of the task to update.
   Headers:
   Authorization: Basic Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoxMjN9.pwqgNnGWrs0mwkVJlcNSQjsBBK98wbZtOl8Y-cM3hJo Admin Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqYW5lLnNtaXRoQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOjEyM30.N0XyxvraWN9ZgUgQXh-2Nt250Fwen1UserVOVD-Qae8
   Request Body:
   json

{
"body": "Updated task description"
}
Response Codes:
200 OK: Task updated successfully.
400 Bad Request: Invalid task data.
403 Forbidden: User not authorized to update the task.
404 Not Found: Task not found.
500 Internal Server Error: Server or database error.
Example Request:

http

PUT /tasks/10
Authorization: Basic Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoxMjN9.pwqgNnGWrs0mwkVJlcNSQjsBBK98wbZtOl8Y-cM3hJo Admin Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqYW5lLnNtaXRoQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOjEyM30.N0XyxvraWN9ZgUgQXh-2Nt250Fwen1UserVOVD-Qae8
Content-Type: application/json

{
"body": "Complete API testing"
}
Example Response:

json

{
"message": "Task updated successfully"
}

## 5. **Delete a Task**
   URL: /tasks/:id
   Method: DELETE
   Description: Deletes a specified task. Only admins can perform this action.
   Path Parameters:
   id: ID of the task to delete.
   Headers:
   Authorization: Basic Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoxMjN9.pwqgNnGWrs0mwkVJlcNSQjsBBK98wbZtOl8Y-cM3hJo Admin Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqYW5lLnNtaXRoQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOjEyM30.N0XyxvraWN9ZgUgQXh-2Nt250Fwen1UserVOVD-Qae8
   Response Codes:
   200 OK: Task deleted successfully.
   403 Forbidden: Non-admin attempting to delete a task.
   404 Not Found: Task not found.
   500 Internal Server Error: Server or database error.
   Example Request:

http

DELETE /tasks/7
Authorization: Basic Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoxMjN9.pwqgNnGWrs0mwkVJlcNSQjsBBK98wbZtOl8Y-cM3hJo Admin Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqYW5lLnNtaXRoQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOjEyM30.N0XyxvraWN9ZgUgQXh-2Nt250Fwen1UserVOVD-Qae8
Example Response:

json

{
"message": "Task deleted successfully"
}

##6. **Get All Users**
   URL: /users
   Method: GET
   Description: Fetches a list of all users in the system. Only accessible by admin users.
   Headers:
   Authorization: Basic Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoxMjN9.pwqgNnGWrs0mwkVJlcNSQjsBBK98wbZtOl8Y-cM3hJo Admin Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqYW5lLnNtaXRoQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOjEyM30.N0XyxvraWN9ZgUgQXh-2Nt250Fwen1UserVOVD-Qae8
   Response Codes:
   200 OK: Returns a list of users.
   403 Forbidden: Non-admin attempting to access users.
   404 Not Found: No users found.
   500 Internal Server Error: Server or database error.
   Example Request:

http

GET /users
Authorization: Basic Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoxMjN9.pwqgNnGWrs0mwkVJlcNSQjsBBK98wbZtOl8Y-cM3hJo Admin Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqYW5lLnNtaXRoQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOjEyM30.N0XyxvraWN9ZgUgQXh-2Nt250Fwen1UserVOVD-Qae8
Example Response:

json

[
{
"id": 1,
"name": "John Doe",
"email": "john.doe@example.com",
"role": "admin"
},
{
"id": 2,
"name": "Jane Smith",
"email": "jane.smith@example.com",
"role": "basic"
}
]

Notes:
Ensure the Authorization header contains a valid token.
The user roles (admin, basic) dictate access permissions for each endpoint.
Standard error-handling responses include:
400 Bad Request: Client-side input errors.
401 Unauthorized: Missing or invalid token.
403 Forbidden: Lack of access permissions.
404 Not Found: Requested resource not found.
500 Internal Server Error: Issues within the server or database.
