import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {prisma} from './db/prismaClient.js';
import { registerUser, listUsers } from './service/userService.js';

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
        res.status(500).json({ error: 'Failed to register user.' });
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
