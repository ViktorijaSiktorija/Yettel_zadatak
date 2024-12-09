const express = require('express');
const {
  getTasks,
  getTasksForUser,
  createTask,
  updateTask,
  deleteTask,
} = require('./controller');

const router = express.Router();

// Admin: List all tasks
router.get('/', getTasks);

// Basic: List user's own tasks
router.get('/:id', getTasksForUser);

// Basic: Create a task
router.post('/', createTask);

// Admin update all tasks Basic update their own
router.put('/:id', updateTask);

// Admin: Delete a task
router.delete('/:id', deleteTask);

module.exports = router;
