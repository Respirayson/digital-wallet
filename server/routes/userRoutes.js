import express from 'express';
import * as dotenv from 'dotenv';

import User from '../mongodb/models/user.js';

dotenv.config()

const router = express.Router();

// Routes

export default router;
