import {prisma} from '../db/prismaClient.js';

const createTransaction = async (data) => {
    try {
        const newTransaction = await prisma.transaction.create({
            data: {
                buyerId: data.buyerId,
                sellerId: data.sellerId,
                amount: data.amount,
                description: data.description,
                date: data.date,
                expirationTime: data.expirationTime,
                state: data.state,
                buyer: { connect: { id: data.buyerId } },
                seller: { connect: { id: data.sellerId } }
            }
        });

        return newTransaction;
    } catch (error) {
        throw error;
    }
};

const getBuyerTransactionPerUser = async (userId) => {
    return await prisma.user.findUnique({
        where : {
            id: userId
        },
        select : {
            transactionsAsBuyer : true
        }
    })
}

const getSellerTransactionPerUser = async (userId) => {
    return await prisma.user.findUnique({
        where : {
            id: userId
        },
        select : {
            transactionsAsSeller : true
        }
    })
}

const getAllTransactions = async () => {
    return await prisma.transaction.findMany();
};

export {createTransaction, getAllTransactions, getBuyerTransactionPerUser, getSellerTransactionPerUser}
