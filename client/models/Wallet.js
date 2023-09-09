// frontend/src/models/Wallet.js

import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Wallet extends Model {
  static table = 'wallets';

  @field('userId') userId;
  @field('balance') balance;
}
