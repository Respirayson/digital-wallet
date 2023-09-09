import { createTransaction, getAllTransactions } from './models/Transaction.js';
import express from "express";

const userTransactionRouter = express.Router();

// get all transactions
app.get('/', async (req, res) => {
    try {
        const transactions = await getAllTransactions();
        res.json(transactions);
    } catch (error) {
        console.error("Transaction Error:", error);
        res.status(500).json({ error: 'Failed to register user.', message: error});
    }
})

// create a transaction
app.post('/', async (req, res) => {
    try {
        const newUser = await createTransaction(req.body);
        res.json(newUser);
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: 'Failed to register user.', message: error});
    }
})

export default userTransactionRouter;