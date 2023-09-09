import express from "express";
import * as dotenv from "dotenv";
import stripe from "stripe";
dotenv.config();

const stp = stripe(process.env.STRIPE_SECRET_KEY);

const transactionRouter = express.Router();



// Get the transaction top up
transactionRouter.get("/topup/:topUpId", async (req, res) => {
  try {
    const topUp = await stp.topups.retrieve(req.params.topUpId);
    res.json(topUp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get the transaction transfer
transactionRouter.get("/transfer/:transferId", async (req, res) => {
  try {
    const transfer = await stp.transfers.retrieve(req.params.transferId);
    res.json(transfer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Initiates a top up transaction
transactionRouter.post("/topup", async (req, res) => {
  try {
    const { amount, description, statement_descriptor } = req.body;

    const topup = await stp.topups.create({
      amount: amount,
      currency: "sgd",
      description: description,
      statement_descriptor: statement_descriptor,
    });
    res.json(topup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Initiates a transfer transaction
transactionRouter.post("/transfer", async (req, res) => {
  try {
    const { amount, destination } = req.body;

    const transfer = await stp.transfers.create({
      amount: amount,
      currency: "sgd",
      destination: destination,
    });
    res.json(transfer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default transactionRouter;
