const express = require('express');
const router = express.Router();
const {
    register,
    login,
    forgotPassword,
    verifyOTP,
    resetPassword,
    updatePassword,
    getMe
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema, updatePasswordSchema } = require('../validators/authValidator');

// @route   POST /api/auth/register
router.post('/register', validate(registerSchema), register);

// @route   POST /api/auth/login
router.post('/login', validate(loginSchema), login);

// @route   POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

// @route   POST /api/auth/verify-otp
router.post('/verify-otp', verifyOTP);

// @route   POST /api/auth/reset-password
router.post('/reset-password', resetPassword);

// @route   PUT /api/auth/update-password
router.put('/update-password', authenticateToken, validate(updatePasswordSchema), updatePassword);

// @route   GET /api/auth/me
router.get('/me', authenticateToken, getMe);

module.exports = router;
