import {prisma} from '../db/prismaClient.js';

const createUser = async (data) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                phoneNumber: data.phoneNumber,
                staticPw: data.staticPw,
                dynamicPw: data.dynamicPw,
                balance: data.balance,
                accNumber: data.accNumber,
                email: data.email
            }
        });

        return newUser;
    } catch (error) {
        throw error;
    }
};

const getAllUsers = async () => {
    return await prisma.user.findMany();
};

const getSpecificUser = async (uid) => {
    return await prisma.user.findUnique({
        where: {
            id: uid
        }
    })
}

export {createUser, getAllUsers, getSpecificUser}
