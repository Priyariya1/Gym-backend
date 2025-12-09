const { z } = require('zod');

const createMemberSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email address'),
        phone: z.string().min(10, 'Phone number must be at least 10 digits'),
        membershipStartDate: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)), // Accept ISO or YYYY-MM-DD
        membershipEndDate: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
        plan: z.string().min(1, 'Plan is required'),
        status: z.enum(['active', 'inactive', 'pending']).optional(),
        nextBillingDate: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional()
    })
});

const updateMemberSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required').optional(),
        email: z.string().email('Invalid email address').optional(),
        phone: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
        membershipStartDate: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
        membershipEndDate: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
        plan: z.string().min(1, 'Plan is required').optional(),
        status: z.enum(['active', 'inactive', 'pending']).optional(),
        nextBillingDate: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional()
    })
});

module.exports = {
    createMemberSchema,
    updateMemberSchema
};
