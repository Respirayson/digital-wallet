import { createUser, getAllUsers } from '../models/User.js';

const registerUser = async (userData) => {
    return await createUser(userData);
};

const listUsers = async () => {
    return await getAllUsers();
};

export {listUsers, registerUser}
