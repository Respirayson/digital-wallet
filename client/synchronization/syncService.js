import database from '../database/Database';
import axios from 'axios';

const SERVER_URL = 'https://your-central-server-url.com';

async function synchronize() {
  const unsynchronizedTransactions = await database.collections
    .get('transactions')
    .query(
      Q.where('isSynchronized', false)
    )
    .fetchSortedBy('createdAt'); // Sorting ensures older transactions are processed first

  for (let transaction of unsynchronizedTransactions) {
    try {
      const response = await axios.post(`${SERVER_URL}/sync-transaction`, transaction);

      if (response.status === 200) {
        const { success, updatedBalance, error } = response.data;
        
        if (success) {
          const wallet = await database.collections
            .get('wallets')
            .find(transaction.senderId); // Assuming the sender is the current user

          await database.action(async () => {
            await wallet.update(w => {
              w.balance = updatedBalance; // Update to server's balance to ensure consistency
            });

            await transaction.update(tran => {
              tran.isSynchronized = true;
            });
          });
        } else {
          // Handle error based on the server's response
          console.error('Error from server:', error);
          // You might decide to mark the transaction with an error state or notify the user
          // Additionally, you might decide to halt synchronization and ask user intervention
          break;
        }
      }
    } catch (error) {
      console.error('Error synchronizing transaction:', error);
      // Again, handle the error: log it, notify the user, etc.
    }
  }

  // Separate logic to sync the entire wallet balance 
  // This ensures that the wallet is always in sync with the server, even if there were other changes
  try {
    const walletResponse = await axios.get(`${SERVER_URL}/get-wallet-balance`, {
      params: {
        userId: 'currentUserId'  // replace with actual user ID
      }
    });

    if (walletResponse.status === 200) {
      const { balance } = walletResponse.data;
      const wallet = await database.collections
        .get('wallets')
        .find('currentUserId'); // replace with actual user ID

      await database.action(async () => {
        await wallet.update(w => {
          w.balance = balance;
        });
      });
    }
  } catch (error) {
    console.error('Error synchronizing wallet balance:', error);
  }
}

export { synchronize };
