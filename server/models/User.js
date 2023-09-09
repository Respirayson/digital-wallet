import {prisma} from '../db/prismaClient.js';

const createUser = async (data) => {
    return await prisma.user.create({
        data: {
            name: data['name'],
            phoneNumber: data['phoneNumber'],
            staticPw: data['staticPw'],
            dynamicPw: data['dynamicPw'],
        },
    });
};

const getAllUsers = async () => {
    return await prisma.user.findMany();
};

export {createUser, getAllUsers}
