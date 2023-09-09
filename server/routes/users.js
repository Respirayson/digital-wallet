const express = require('express');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const router = express.Router();
const prisma = new PrismaClient();

// Signup Endpoint
router.post('/signup', async (req, res) => {
    const { fullName, phoneNumber, password } = req.body;

    // Validate the inputs (e.g., check for empty fields, validate phone numbers, enforce password rules)
    if (!fullName || !phoneNumber || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // TODO: Add more validation rules as needed

    // Check if user already exists based on phone number or email
    const existingUser = await prisma.user.findUnique({ where: { phoneNumber } });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists with this phone number.' });
    }

    // Hash the password before storing it (for security)
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Insert the new user into the database
    try {
        const newUser = await prisma.user.create({
            data: {
                name: fullName,
                phoneNumber: phoneNumber,
                password: hashedPassword
            }
        });

        // Return a success message
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

module.exports = router;
