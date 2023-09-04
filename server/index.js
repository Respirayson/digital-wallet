import express from 'express';
import * as dotenv from 'dotenv';
import cors from "cors";

import connectDB from './mongodb/connect.js';

import userRoutes from './routes/userRoutes.js';

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello from digital wallet businesses!');
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(process.env.PORT || 8080, () => {
            console.log(`Server listening on port ${process.env.PORT || 8080}`);
        })
    } catch (e) {
        console.log(e);
    }
    
}

startServer();