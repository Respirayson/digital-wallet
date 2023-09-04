import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: { type: String, required: true },
    phone: { type: String, required: true },
    balance: { type: Number, required: true },
    transactions: { type: Array, required: true },
    password: { type: String, required: true },
});

export default mongoose.model("User", User);