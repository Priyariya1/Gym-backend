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
const validate = require('../middleware/validate');
const { createMemberSchema, updateMemberSchema } = require('../validators/memberValidator');

// All routes require authentication
router.use(authenticateToken);

//  GET /api/members/profile
router.get('/profile', requireMember, getMemberProfile);

// PUT /api/members/profile
router.put('/profile', requireMember, validate(updateMemberSchema), updateMemberProfile);

// GET /api/members (Admin and Trainer can view)
router.get('/', (req, res, next) => {
    if (req.user.role === 'admin' || req.user.role === 'trainer') {
        return next();
    }
    return res.status(403).json({
        success: false,
        message: 'Access denied. Admin or Trainer role required.'
    });
}, getMembers);

// POST /api/members
router.post('/', requireAdmin, validate(createMemberSchema), createMember);

// PUT /api/members/:id
router.put('/:id', requireAdmin, validate(updateMemberSchema), updateMember);

// DELETE /api/members/:id
router.delete('/:id', requireAdmin, deleteMember);

module.exports = router;
