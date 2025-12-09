const mongoose = require('mongoose');
const { register } = require('./controllers/authController');
const { createMember } = require('./controllers/memberController');
const { createTrainer } = require('./controllers/trainerController');
const { createSession } = require('./controllers/sessionController');
const validate = require('./middleware/validate');
const { registerSchema } = require('./validators/authValidator');
const { createMemberSchema } = require('./validators/memberValidator');
const { createTrainerSchema } = require('./validators/trainerValidator');
const { createSessionSchema } = require('./validators/sessionValidator');
require('dotenv').config();

// Mock Request/Response/Next
const mockReq = (body = {}) => ({
    body,
    headers: {},
    query: {},
    params: {}
});

const mockRes = () => {
    const res = {};
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.json = (data) => {
        res.data = data;
        return res;
    };
    return res;
};

const mockNext = (err) => {
    if (err) throw err;
};

async function verifyZodValidation() {
    try {
        console.log('--- Verifying Zod Validation ---');

        // 1. Test Auth Validation (Register)
        console.log('\n1. Testing Auth Validation (Register)');
        const invalidRegisterReq = mockReq({
            name: 'Test User',
            email: 'invalid-email', // Invalid email
            password: '123', // Short password
            confirmPassword: '123'
        });
        const invalidRegisterRes = mockRes();

        // Run middleware manually
        await validate(registerSchema)(invalidRegisterReq, invalidRegisterRes, mockNext);

        if (invalidRegisterRes.statusCode === 400) {
            console.log('✅ Invalid Register Request correctly rejected:', JSON.stringify(invalidRegisterRes.data.errors));
        } else {
            throw new Error('Invalid Register Request should have failed');
        }

        // 2. Test Member Validation
        console.log('\n2. Testing Member Validation');
        const invalidMemberReq = mockReq({
            name: 'Test Member',
            email: 'test@example.com',
            phone: '123', // Short phone
            plan: 'Basic'
        });
        const invalidMemberRes = mockRes();

        await validate(createMemberSchema)(invalidMemberReq, invalidMemberRes, mockNext);

        if (invalidMemberRes.statusCode === 400) {
            console.log('✅ Invalid Member Request correctly rejected:', JSON.stringify(invalidMemberRes.data.errors));
        } else {
            throw new Error('Invalid Member Request should have failed');
        }

        // 3. Test Trainer Validation
        console.log('\n3. Testing Trainer Validation');
        const invalidTrainerReq = mockReq({
            // Missing name
            email: 'trainer@example.com',
            phone: '1234567890'
        });
        const invalidTrainerRes = mockRes();

        await validate(createTrainerSchema)(invalidTrainerReq, invalidTrainerRes, mockNext);

        if (invalidTrainerRes.statusCode === 400) {
            console.log('✅ Invalid Trainer Request correctly rejected:', JSON.stringify(invalidTrainerRes.data.errors));
        } else {
            throw new Error('Invalid Trainer Request should have failed');
        }

        // 4. Test Session Validation
        console.log('\n4. Testing Session Validation');
        const invalidSessionReq = mockReq({
            name: 'Test Session',
            trainer: 'someId',
            date: '2023-12-25',
            startTime: '25:00' // Invalid time
        });
        const invalidSessionRes = mockRes();

        await validate(createSessionSchema)(invalidSessionReq, invalidSessionRes, mockNext);

        if (invalidSessionRes.statusCode === 400) {
            console.log('✅ Invalid Session Request correctly rejected:', JSON.stringify(invalidSessionRes.data.errors));
        } else {
            throw new Error('Invalid Session Request should have failed');
        }

        console.log('\n🎉 All validation tests passed!');

    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
}

verifyZodValidation();
