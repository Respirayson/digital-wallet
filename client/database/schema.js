import Realm from 'realm';

class User extends Realm.Object {}
User.schema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    phoneNumber: 'string?',
    staticPw: 'string',
    dynamicPw: 'string?',
    transactionsAsBuyer: 'Transaction[]',
    transactionsAsSeller: 'Transaction[]',
  },
};

class Transaction extends Realm.Object {}
Transaction.schema = {
  name: 'Transaction',
  primaryKey: 'id',
  properties: {
    id: 'int',
    buyer: 'User?',
    buyerId: 'int',
    seller: 'User?',
    sellerId: 'int',
    amount: 'float',
    description: 'string',
    date: 'date',
    staticPw: 'string',
    dynamicPw: 'string?',
    number: 'string',
    balance: 'float',
    expirationDate: 'date',
    state: 'string',
  },
};

const realmInstance = new Realm({ schema: [User, Transaction] });

export default realmInstance;
