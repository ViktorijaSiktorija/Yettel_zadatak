const express = require('express');
const userRoutes = require('./src/user/routes');
const tasksRoutes = require('./src/task/routes');

const app = express();

app.use(express.json());

app.get('', (req, res) => {
  res.send('Hello express!');
});

app.use('/users', userRoutes);
app.use('/tasks', tasksRoutes);

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});

module.exports = {
  app,
};
