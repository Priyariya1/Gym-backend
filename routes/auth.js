const express = require('express');
const router = express.Router();
const {
    register,
    login,
    forgotPassword,
    verifyOTP,
    resetPassword,
    updatePassword
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// @route   POST /api/auth/register
router.post('/register', register);

// @route   POST /api/auth/login
router.post('/login', login);

// @route   POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

// @route   POST /api/auth/verify-otp
router.post('/verify-otp', verifyOTP);

// @route   POST /api/auth/reset-password
router.post('/reset-password', resetPassword);

// @route   PUT /api/auth/update-password
router.put('/update-password', authenticateToken, updatePassword);

module.exports = router;
