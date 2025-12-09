const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin, requireMember, requireTrainer } = require('../middleware/auth');
const {
    getMembers,
    createMember,
    updateMember,
    deleteMember,
    getMemberProfile,
    updateMemberProfile
} = require('../controllers/memberController');

// All routes require authentication
router.use(authenticateToken);

// @route   GET /api/members/profile
router.get('/profile', requireMember, getMemberProfile);

// @route   PUT /api/members/profile
router.put('/profile', requireMember, updateMemberProfile);

// @route   GET /api/members
router.get('/', requireTrainer, getMembers);

// @route   POST /api/members
router.post('/', requireAdmin, createMember);

// @route   PUT /api/members/:id
router.put('/:id', requireAdmin, updateMember);

// @route   DELETE /api/members/:id
router.delete('/:id', requireAdmin, deleteMember);

module.exports = router;
