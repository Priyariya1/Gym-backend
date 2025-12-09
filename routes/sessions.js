const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const {
    getSessions,
    createSession,
    updateSession,
    cancelSession
} = require('../controllers/sessionController');
const validate = require('../middleware/validate');
const { createSessionSchema } = require('../validators/sessionValidator');

// All routes require authentication
router.use(authenticateToken);

// GET /api/sessions
router.get('/', getSessions);

// POST /api/sessions
router.post('/', requireAdmin, validate(createSessionSchema), createSession);

// PUT /api/sessions/:id
router.put('/:id', requireAdmin, updateSession);

// PUT /api/sessions/:id/cancel
router.put('/:id/cancel', requireAdmin, cancelSession);

module.exports = router;
