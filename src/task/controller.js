const pool = require('../db/db');
const queries = require('./queries');
const userModule = require('../auth/user');

// Admin: List all tasks
const getTasks = async (req, res) => {
  try {
    const user = await userModule.getUser(req);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role != 'admin') {
      return res.status(401).json({ message: 'Forbidden' });
    }

    pool.query(queries.query, [10, 0], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json(results.rows);
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

// Basic: List user's own tasks
const getTasksForUser = async (req, res) => {
  try {
    const user = await userModule.getUser(req);
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: User not found or token invalid' });
    }

    const userId = parseInt(req.params.userId, 10);

    if (user.role === 'basic' && user.id !== userId) {
      return res
        .status(403)
        .json({ message: 'Forbidden: You can only view your own tasks' });
    }

    pool.query(queries.getTasksForUser, [userId], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Database error' });
      }

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ message: 'No tasks found for this user' });
      }

      res.status(200).json(result.rows);
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Basic: Create a task
const createTask = async (req, res) => {
  try {
    const user = await userModule.getUser(req);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role != 'admin') {
      return res.status(401).json({ message: 'Forbidden' });
    }
    const { body, userId } = req.body;

    if (!body || !userId) {
      return res.status(400).json({ message: 'Invalid task data' });
    }

    pool.query(queries.createTask, [body, userId], (error, result) => {
      if (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({ message: 'Failed to create task' });
      }

      const taskId = result.rows[0]?.id;
      res
        .status(201)
        .json({ message: 'Task created successfully', id: taskId });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const user = await userModule.getUser(req);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { body } = req.body;
    const taskId = req.params.id;

    if (!body || !taskId) {
      return res.status(400).json({ message: 'Invalid task data' });
    }

    pool.query(queries.getTasksForUser, [taskId], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Database error' });
      }

      const task = result.rows[0];
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      if (user.role !== 'admin' && task.user_id !== user.id) {
        return res.status(403).json({ message: 'Forbidden: Not your task' });
      }

      pool.query(queries.updateTask, [body, taskId], (updateError) => {
        if (updateError) {
          console.error('Database error:', updateError);
          return res.status(500).json({ message: 'Failed to update task' });
        }
        return res.status(200).json({ message: 'Task updated successfully' });
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Delete a task
const deleteTask = async (req, res) => {
  try {
    const user = await userModule.getUser(req);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role != 'admin') {
      return res.status(401).json({ message: 'Forbidden' });
    }
    const { body, userId } = req.body;

    if (!body || !userId) {
      return res.status(400).json({ message: 'Invalid task data' });
    }

    pool.query(queries.deleteTask, [id], (error) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Failed to delete task' });
      }

      res.status(200).json({ message: 'Task deleted successfully' });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getTasks,
  getTasksForUser,
  createTask,
  updateTask,
  deleteTask,
};
