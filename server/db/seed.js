import {prisma} from '../db/prismaClient.js';

const seedData = async () => {
    try {
        const user1 = await prisma.user.create({
            data: {
                name: 'John Doe',
                phoneNumber: '9123456789',
                staticPw: 'password123',
                dynamicPw: 'dynamicpassword456',
                balance: 1000.0,
                accNumber: 12345,
                email: 'johndoe@example.com',
            },
        });

        const user2 = await prisma.user.create({
            data: {
                name: 'Jane Smith',
                phoneNumber: '93344557',
                staticPw: 'securepassword',
                dynamicPw: 'encrypteddynamic',
                balance: 500.0,
                accNumber: 54321,
                email: 'janesmith@example.com',
            },
        });

        const transaction1 = await prisma.transaction.create({
            data: {
                buyerId: user1.id,
                sellerId: user2.id,
                amount: 200.0,
                description: 'Product purchase',
                date: new Date(),
                expirationTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
                state: 'pending',
            },
        });

        const transaction2 = await prisma.transaction.create({
            data: {
                buyerId: user2.id,
                sellerId: user1.id,
                amount: 150.0,
                description: 'Service payment',
                date: new Date(),
                expirationTime: new Date(Date.now() + 48 * 60 * 60 * 1000), 
                state: 'completed',
            },
        });

        console.log('Seeding completed successfully.');
    } catch (error) {
        console.error('Seeding error:', error);
    } finally {
        await prisma.$disconnect();
    }
};

seedData();
