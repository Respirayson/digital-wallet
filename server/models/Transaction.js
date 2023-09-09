import {prisma} from '../db/prismaClient.js';

const createTransaction = async (data) => {
    return await prisma.transaction.create({
        data: {
        buyerId: data.buyerId,
        sellerId: data.sellerId,
        amount: data.amount,
        description: data.description,
        date: new Date(),  
        staticPw: data.staticPw,
        dynamicPw: data.dynamicPw,
        number: data.number,
        balance: data.balance
        }
        });
};

const getBuyerTransactionPerUser = async (userId) => {
    return await prisma.transaction.findUnique({
        where : {
            id: userId
        },
        select : {
            transactionsAsBuyer : true
        }
    })
}

const getSellerTransactionPerUser = async (userId) => {
    return await prisma.transaction.findUnique({
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
