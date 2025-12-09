const { z } = require('zod');

const createSessionSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Session name is required'),
        trainer: z.string().min(1, 'Trainer ID is required'), // Could add regex for ObjectId
        date: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
        startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)'),
        duration: z.number().int().positive().optional(),
        capacity: z.number().int().positive().optional(),
        location: z.string().optional()
    })
});

module.exports = {
    createSessionSchema
};
