const { Router } = require('express');
const controller = require('./controller');

const router = Router();

// Admin: List all users
router.get('/', controller.getUsers);

module.exports = router;
