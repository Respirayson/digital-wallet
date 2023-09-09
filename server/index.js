import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {prisma} from './db/prismaClient.js';
import { registerUser, listUsers} from './service/userService.js';
import { getSpecificUser } from './models/User.js';
import { createTransaction, getAllTransactions, getBuyerTransactionPerUser, getSellerTransactionPerUser } from './models/Transaction.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from digital wallet businesses!');
});

app.post('/register', async (req, res) => {
    try {
        const newUser = await registerUser(req.body);
        res.json(newUser);
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: 'Failed to register user.', message: error});
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await listUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});

app.get('/users/:id', async (req, res) => {
    const userId = parseInt(req.params.id);

    if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ error: 'Invalid user ID.' });
    }

    try {
        const users = await getSpecificUser(userId);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
})

app.post('/transactions', async (req, res) => {
    try {
        const newUser = await createTransaction(req.body);
        res.json(newUser);
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: 'Failed to register user.', message: error});
    }
})

// app.get('/users/:id/transactions-buyer', async (req, res) => {
//     const userId = parseInt(req.params.id);

//     if (isNaN(userId) || userId <= 0) {
//         return res.status(400).json({ error: 'Invalid user ID.' });
//     }

//     try {
//         const
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: 'Failed to fetch users.' });
//     }

// })

const startServer = () => {
    try {
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

startServer();
