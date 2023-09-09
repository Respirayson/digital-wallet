const express = require('express');
const { PrismaClient } = require('@prisma/client');
const QRCode = require('qrcode');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables from .env file

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Generate QR Code for User's Account
app.get('/generate-user-qr', async (req, res) => {
  const userId = req.query.userId;
  const nonce = crypto.randomBytes(16).toString('hex');  // Unique transaction identifier

  const userData = {
    userId,
    nonce
  };

  const qrCode = await QRCode.toDataURL(JSON.stringify(userData));
  res.send(`<img src="${qrCode}"/>`);
});

// Offline Transaction Initiation (User A to User B)
app.post('/initiate-offline-payment', async (req, res) => {
  const { senderId, receiverData, amount } = req.body;  // receiverData is the scanned QR data of User B

  const transaction = {
    senderId,
    receiverId: receiverData.userId,
    amount,
    nonce: receiverData.nonce,
    state: 'OFFLINE'
  };

  const qrCode = await QRCode.toDataURL(JSON.stringify(transaction));
  res.send(`<img src="${qrCode}"/>`);
});

// Offline Transaction Completion (User B acknowledges receipt)
app.post('/acknowledge-payment', async (req, res) => {
  const transactionData = req.body.qrData;  // This is the QR data generated in the previous step

  // Store transaction details locally on User B's device (simplified here)
  // In a real-world scenario, you'd use local storage solutions like IndexedDB, SQLite, etc.

  res.json({ message: 'Transaction acknowledged and stored locally.' });
});

// Synchronize Offline Transactions
app.post('/synchronize-transactions', async (req, res) => {
  const transactions = req.body.transactions;  // An array of transactions stored offline

  for (let transaction of transactions) {
    // Check for transaction validity (e.g., nonce uniqueness) and process them
    await prisma.transaction.create({
      data: {
        senderId: transaction.senderId,
        receiverId: transaction.receiverId,
        amount: transaction.amount,
        state: 'PENDING_SYNC',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  }

  res.json({ message: 'Transactions synchronized.' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
