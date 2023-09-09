// frontend/src/database/schema.js

import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'phoneNumber', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'accNumber', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'wallets',
      columns: [
        { name: 'userId', type: 'string' },
        { name: 'balance', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'transactions',
      columns: [
        { name: 'senderId', type: 'string' },
        { name: 'receiverId', type: 'string' },
        { name: 'amount', type: 'number' },
        { name: 'state', type: 'string' },
        { name: 'signature', type: 'string' },
        { name: 'expirationTime', type: 'number' },
        { name: 'createdAt', type: 'number' },
        { name: 'updatedAt', type: 'number' },
        { name: 'isSynchronized', type: 'boolean' },
        { name: 'error', type: 'string', isOptional: true },
      ],
    }),
  ],
});
