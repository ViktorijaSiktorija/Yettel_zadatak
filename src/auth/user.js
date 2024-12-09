const pool = require('../db/db');
const queries = require('./queries');
const token = require('./token');

const getUser = async (req) => {
  try {
    const bearer = req.header('Authorization')?.replace('Bearer ', '');
    if (!bearer) {
      console.log('No token provided');
      return null;
    }

    const decodedToken = token.decodeToken(bearer);
    if (!decodedToken) {
      console.log('Invalid token:', bearer);
      return null;
    }

    console.log('Decoded token:', decodedToken);

    const { email, password } = decodedToken;
    if (!email || !password) {
      console.log('Missing email or password in token');
      return null;
    }

    const result = await new Promise((resolve, reject) => {
      pool.query(
        queries.getUserByUsernameAndPassword,
        [email, password],
        (error, result) => {
          if (error) {
            console.error('Database error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    if (result.rows.length === 0) {
      console.log('User not found in database');
      return null;
    }

    const user = result.rows[0];
    console.log('User found:', user);
    delete user.password;
    return user;
  } catch (error) {
    console.error('Error in getUser:', error);
    return null;
  }
};

module.exports = {
  getUser,
};
