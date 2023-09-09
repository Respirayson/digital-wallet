// frontend/src/database/Database.js

import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { mySchema } from './schema';
import User from '../models/User';
import Wallet from '../models/Wallet';
import Transaction from '../models/Transaction';

const adapter = new SQLiteAdapter({
  schema: mySchema,
  // You can add SQLite specific settings here
});

const database = new Database({
  adapter,
  modelClasses: [User, Wallet, Transaction],
  actionsEnabled: true,
});

export default database;
