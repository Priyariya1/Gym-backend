const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { getUsers, updateUserRole } = require('../controllers/userController');

// All routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

// @route   GET /api/users
router.get('/', getUsers);

// @route   PUT /api/users/:id/role
router.put('/:id/role', updateUserRole);

module.exports = router;
