const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin, requireTrainer } = require('../middleware/auth');
const {
    getTrainers,
    getTrainer,
    createTrainer,
    updateTrainer,
    deleteTrainer,
    getTrainerProfile,
    getTrainerClasses,
    updateTrainerProfile
} = require('../controllers/trainerController');
const validate = require('../middleware/validate');
const { createTrainerSchema, updateTrainerSchema } = require('../validators/trainerValidator');

// Public routes (or protected?)
// Let's make getTrainers public so visitors can see trainers? Or protected?
// User request: "Trainer List Page" under Admin. "My Classes" under Trainer.
// Let's require auth for all for now.

router.use(authenticateToken);

// Trainer Profile (Self)
router.get('/profile', requireTrainer, getTrainerProfile);
router.put('/profile', requireTrainer, validate(updateTrainerSchema), updateTrainerProfile);
router.get('/classes', requireTrainer, getTrainerClasses);

// Admin Routes
router.get('/', (req, res, next) => {
    if (req.user.role === 'admin' || req.user.role === 'trainer') {
        return next();
    }
    return res.status(403).json({
        success: false,
        message: 'Access denied. Admin or Trainer role required.'
    });
}, getTrainers);
router.post('/', requireAdmin, validate(createTrainerSchema), createTrainer);
router.get('/:id', requireAdmin, getTrainer); // Admin viewing specific trainer
router.put('/:id', requireAdmin, validate(updateTrainerSchema), updateTrainer);
router.delete('/:id', requireAdmin, deleteTrainer);

module.exports = router;
