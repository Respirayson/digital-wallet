// frontend/src/models/Transaction.js

import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Transaction extends Model {
  static table = 'transactions';

  @field('senderId') senderId;
  @field('receiverId') receiverId;
  @field('amount') amount;
  @field('state') state;
  @field('signature') signature;
  @field('expirationTime') expirationTime;
  @field('createdAt') createdAt;
  @field('updatedAt') updatedAt;
  @field('isSynchronized') isSynchronized;
  @field('error') error;
}
