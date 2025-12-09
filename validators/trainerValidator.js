const { z } = require('zod');

const createTrainerSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email address'),
        phone: z.string().min(10, 'Phone number must be at least 10 digits'),
        specialization: z.string().optional(),
        bio: z.string().optional(),
        experience: z.string().optional()
    })
});

const updateTrainerSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required').optional(),
        email: z.string().email('Invalid email address').optional(),
        phone: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
        specialization: z.string().optional(),
        bio: z.string().optional(),
        experience: z.string().optional()
    })
});

module.exports = {
    createTrainerSchema,
    updateTrainerSchema
};
