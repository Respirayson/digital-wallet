import { registerUser, listUsers} from '../service/userService.js';
import { getSpecificUser } from '../models/User.js';
import { getBuyerTransactionPerUser, getSellerTransactionPerUser }  from '../models/Transaction.js';
import express from "express";

const userRouter = express.Router();

// create a user
userRouter.post('/', async (req, res) => {
    try {
        const newUser = await registerUser(req.body);
        res.json(newUser);
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: 'Failed to register user.', message: error});
    }
});

// get all users
userRouter.get('/', async (req, res) => {
    try {
        const users = await listUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});

// get specific user
userRouter.get('/:id', async (req, res) => {
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

// get specific transactions of the user 
userRouter.get('/:id/transactions-buyer', async (req, res) => {
    const userId = parseInt(req.params.id);

    if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ error: 'Invalid user ID.' });
    }

    try {
        const transactions = await getBuyerTransactionPerUser(userId)
        res.json(transactions)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
})

// return only sell transactions to the user 
userRouter.get('/:id/transactions-seller', async (req, res) => {
    const userId = parseInt(req.params.id);

    if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ error: 'Invalid user ID.' });
    }

    try {
        const transactions = await getSellerTransactionPerUser(userId)
        res.json(transactions)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
})

// return all transactions respective to the user
userRouter.get('/:id/transactions', async (req, res) => {
    const userId = parseInt(req.params.id);

    if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ error: 'Invalid user ID.' });
    }

    try {
        const [sellerTransactions, buyerTransactions] = await Promise.all([
            getSellerTransactionPerUser(userId),
            getBuyerTransactionPerUser(userId)
        ]);

        const transactions = {
            sellerTransactions,
            buyerTransactions
        };

        res.json(transactions);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
})

export default userRouter;