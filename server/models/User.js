import {prisma} from '../db/prismaClient.js';

const createUser = async (data) => {
    console.log("Data being passed to prisma.user.create:", data);
    const newUser = await prisma.user.create({
        data: {
        name: data.name,
        phoneNumber: data.phoneNumber,
        staticPw: data.staticPw,
        dynamicPw: data.dynamicPw
        }
    });
    return newUser;
    }

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
