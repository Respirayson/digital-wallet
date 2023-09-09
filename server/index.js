import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';


import userRouter from './routes/userRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import walletRoutes from './routes/walletRoutes.js';
import userTransactionRouter from './routes/userTransactionRoutes.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api/v1/users', userRoutes);
app.use('/api/v1/transactions', transactionRoutes)
app.use('/api/v1/wallet', walletRoutes)

app.use('/users', userRouter)
app.use('/transactions', userTransactionRouter)

app.get('/', (req, res) => {
    res.send('Hello from digital wallet businesses!');
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
