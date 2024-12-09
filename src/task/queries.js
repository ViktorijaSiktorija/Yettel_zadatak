const getTasks = `
    SELECT tasks.*, users.username 
    FROM admin.tasks 
    LEFT JOIN admin.users ON tasks.user_id = users.id
    ORDER BY tasks.created_at DESC
`;

const getTasksForUser = `
    SELECT * 
    FROM tasks 
    WHERE user_id = $1
    ORDER BY created_at DESC
`;

const createTask = `
    INSERT INTO tasks (body, user_id) VALUES ($1, $2) RETURNING id
`;

const updateTask = `
    UPDATE tasks 
    SET body = $1 
    WHERE id = $2
`;

const deleteTask = `
    DELETE FROM tasks 
    WHERE id = $1
`;

const query = `SELECT * FROM tasks ORDER BY created_at DESC LIMIT $1 OFFSET $2`;

module.exports = {
  getTasks,
  getTasksForUser,
  createTask,
  updateTask,
  deleteTask,
  query,
};
