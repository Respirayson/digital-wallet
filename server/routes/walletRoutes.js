import express from "express";
import * as dotenv from "dotenv";
import stripe from "stripe";
dotenv.config();

const stp = stripe(process.env.STRIPE_SECRET_KEY);

const walletRouter = express.Router();

/**
 * @route GET /api/v1/wallet
 * @desc Get all wallets
 * @access Public
 */
walletRouter.get("/", async (req, res) => {
  try {
    const accounts = await stp.accounts.list();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route GET /api/v1/wallet/:walletId
 * @desc Get a wallet by id
 * @access Public
 * @param {string} walletId
 * @returns {object} wallet
 */
walletRouter.get("/:walletId", async (req, res) => {
  try {
    const account = await stp.accounts.retrieve(req.params.walletId);
    res.json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route DELETE /api/v1/wallet/:walletId
 * @desc Delete a wallet by id
 * @access Public
 * @param {string} walletId
 * @returns {object} deleted wallet
 */
walletRouter.delete("/:walletId", async (req, res) => {
  try {
    const deleted = await stp.accounts.del(req.params.walletId);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route POST /api/v1/wallet
 * @desc Create a wallet
 * @access Public
 * @returns {object} wallet
 */
walletRouter.post("/", async (req, res) => {
  try {

    const { link } = req.body;

    const account = await stp.accounts.create({
      type: "custom",
      country: "SG",
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
    });
    const updatedAccount = await stp.accounts.update(account.id, {
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: "8.8.8.8",
      },
    });

    const accountLink = await stp.accountLinks.create({
      account: updatedAccount.id,
      refresh_url: link,
      return_url: link,
      type: "account_onboarding",
    });


    res.json(accountLink);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// RETRIEVES THE CLIENT SECRET
walletRouter.post("/setupIntent", async (req, res) => {
  try {
    const { customer } = req.body; // customer is the CUSTOMER ID
    const intent = await stp.setupIntents.create({
      customer: customer,
    });
    res.json(intent.client_secret);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




walletRouter.post("/paymentIntent", async (req, res) => {
  try {
    const { amount, phoneNumber } = req.body;
    let customer;
    if (true) {
      // CHECK IF PHONE NUMBER IS ALRDY IN THE DB AKA EXISTING USER
      customer = await stp.customers.retrieve("cus_ObZSaR9hMSBEMb");
    } else {
      customer = await stp.customers.create();
    }

    const paymentIntent = await stp.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "sgd",
      payment_method_types: ["card"],
      customer: customer.id
    });
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

walletRouter.get("/paymentIntent", async (req, res) => {
  try {
    const paymentIntent = await stp.paymentIntents.retrieve(
      req.params.paymentIntentId
    );
    res.json(paymentIntent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

walletRouter.post("/payout", async (req, res) => {
  try {
    const { amount, bankAccount } = req.body;

    const payout = await stp.payouts.create({
      amount: Math.round(amount * 100),
      currency: "sgd",
    });

    res.json(payout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

export default walletRouter;
