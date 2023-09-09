import realmInstance from '../database/schema';
import axios from 'axios';

const SERVER_URL = 'https://your-central-server-url.com';

async function synchronize() {
  // Get the unsynchronized transactions
  const unsynchronizedTransactions = realmInstance.objects('Transaction').filtered('isSynchronized == false').sorted('createdAt');

  for (let transaction of unsynchronizedTransactions) {
    try {
      const response = await axios.post(`${SERVER_URL}/sync-transaction`, transaction);

      if (response.status === 200) {
        const { success, updatedBalance, error } = response.data;
        
        if (success) {
          // Assuming the sender is the current user
          const wallet = realmInstance.objects('User').filtered('id == $0', transaction.buyerId)[0];

          // Begin write transaction
          realmInstance.write(() => {
            wallet.balance = updatedBalance; // Update to server's balance to ensure consistency
            transaction.isSynchronized = true;
          });
        } else {
          console.error('Error from server:', error);
          // You might decide to mark the transaction with an error state or notify the user
          // Additionally, you might decide to halt synchronization and ask user intervention
          break;
        }
      }
    } catch (error) {
      console.error('Error synchronizing transaction:', error);
    }
  }

  // Separate logic to sync the entire wallet balance 
  try {
    const walletResponse = await axios.get(`${SERVER_URL}/get-wallet-balance`, {
      params: {
        userId: 'currentUserId'  // replace with actual user ID
      }
    });

    if (walletResponse.status === 200) {
      const { balance } = walletResponse.data;

      // Assuming the current user's ID is 'currentUserId'
      const wallet = realmInstance.objects('User').filtered('id == $0', 'currentUserId')[0];

      // Begin write transaction
      realmInstance.write(() => {
        wallet.balance = balance;
      });
    }
  } catch (error) {
    console.error('Error synchronizing wallet balance:', error);
  }
}

export { synchronize };
