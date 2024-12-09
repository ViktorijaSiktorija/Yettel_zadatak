const pool = require('../db/db');
const queries = require('./queries');
const userModule = require('../auth/user');

const getUsers = async (req, res) => {
  try {
    const user = await userModule.getUser(req);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role != 'admin') {
      return res.status(401).json({ message: 'Forbidden' });
    }

    pool.query(queries.getUsers, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
      }

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }

      res.status(200).json(result.rows);
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getUsers,
};
