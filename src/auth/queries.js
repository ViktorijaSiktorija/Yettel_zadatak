const getUserByUsernameAndPassword = `
  SELECT * FROM users WHERE email = $1 AND password = $2;
`;

module.exports = {
  getUserByUsernameAndPassword,
};
