import { useEffect, useState } from 'react';
import { auth, db } from '../../../../firebase/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import TransactionComponent from './DashboardHomePageComponents/TransactionComponent';
import useFirbase, { TRANSACTION_TYPE } from '../../../../Hooks/useFirbase';
import { onAuthStateChanged } from 'firebase/auth/cordova';
import useNotifications from '../../../../Hooks/useNotifications';
enum TransactionOrder {
  HIGHEST = 'highest',
  LOWEST = 'lowest',
  NEWEST = 'newest',
}
const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showFilter, setShowFilter] = useState(false); // Toggle state for filter section
  const [transactionType, setTransactionType] = useState<any>(
    TRANSACTION_TYPE.ALL
  ); // State for transaction type filter

  const [transactionOrder, setTransactionOrder] = useState<TransactionOrder>(
    TransactionOrder.NEWEST
  );

  const { handleDeleteTransaction } = useFirbase();
  const { notifyError } = useNotifications();
  useEffect(() => {
    async function fetchUserTransactions() {
      const userId = auth.currentUser?.uid;

      if (!userId) {
        console.error('User is not authenticated.');
        return [];
      }

      try {
        // Reference to the user's 'transactions' collection
        const transactionsCollectionRef = collection(
          db,
          'users',
          userId,
          'transactions'
        );

        let transactionsQuery = null;

        // Determine the sorting based on transactionOrder
        let orderField = 'createdAt';
        let orderDirection: 'desc' | 'asc' = 'desc'; // Default is descending for 'NEWEST'

        if (transactionOrder === TransactionOrder.HIGHEST) {
          orderField = 'amount'; // Sort by amount for HIGHEST
          orderDirection = 'desc';
        } else if (transactionOrder === TransactionOrder.LOWEST) {
          orderField = 'amount'; // Sort by amount for LOWEST
          orderDirection = 'asc';
        }

        // Create a query based on the transaction type and sorting order
        if (transactionType === TRANSACTION_TYPE.ALL) {
          transactionsQuery = query(
            transactionsCollectionRef,
            orderBy(orderField, orderDirection)
          );
        } else {
          transactionsQuery = query(
            transactionsCollectionRef,
            orderBy(orderField, orderDirection),
            where('transactionType', '==', transactionType)
          );
        }

        // Fetch the documents that match the query
        const transactionsSnapshot = await getDocs(transactionsQuery);

        // Map through the documents and return the data
        let transactions = transactionsSnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID if necessary
          ...doc.data(), // Spread the rest of the document data
        }));

        setTransactions(transactions);
      } catch (error) {
        console.error('Error fetching user transactions:', error);
        return [];
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        fetchUserTransactions();
      } else {
        notifyError('User is not authenticated.');
        // No user  is signed in
      }
    });

    return () => {
      unsubscribe();
    };
  }, [transactionType, transactionOrder]); // Added transactionOrder as a dependency
  // Refetch transactions when filters change

  const handleFilterTransactions = () => {
    setShowFilter(!showFilter); // Toggle the filter section
  };

  const handleTransactionDelete = async (
    transactionId: string,
    transactionType: TRANSACTION_TYPE,
    amount: number
  ) => {
    try {
      await handleDeleteTransaction(transactionId, transactionType, amount);
      setTransactions(
        transactions.filter(
          (transaction: any) => transaction.id !== transactionId
        )
      );
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 h-screen flex flex-col">
      {/* Navbar for heading and filter button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={handleFilterTransactions}
        >
          {showFilter ? 'Hide Filters' : 'Filter Transactions'}
        </button>
      </div>

      {/* Filter section */}
      {showFilter && (
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <div className="flex space-x-4">
            <div className="flex flex-col">
              <label className="text-gray-700">Transaction Type</label>
              <select
                className="border border-gray-300 rounded-md p-2"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value={TRANSACTION_TYPE.ALL}>All</option>
                <option value={TRANSACTION_TYPE.INCOME}>Income</option>
                <option value={TRANSACTION_TYPE.EXPENSE}>Expense</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700">Sort By</label>
              <div className="flex space-x-2">
                <button
                  className={`border border-gray-300 rounded-md p-2 ${
                    transactionOrder === TransactionOrder.HIGHEST
                      ? 'bg-blue-500 text-white'
                      : ''
                  }`}
                  onClick={() => setTransactionOrder(TransactionOrder.HIGHEST)}
                >
                  Highest
                </button>
                <button
                  className={`border border-gray-300 rounded-md p-2 ${
                    transactionOrder === TransactionOrder.LOWEST
                      ? 'bg-blue-500 text-white'
                      : ''
                  }`}
                  onClick={() => setTransactionOrder(TransactionOrder.LOWEST)}
                >
                  Lowest
                </button>
                <button
                  className={`border border-gray-300 rounded-md p-2 ${
                    transactionOrder === TransactionOrder.NEWEST
                      ? 'bg-blue-500 text-white'
                      : ''
                  }`}
                  onClick={() => setTransactionOrder(TransactionOrder.NEWEST)}
                >
                  Newest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction list container */}
      <div className="bg-white shadow-md rounded-lg p-6 flex-1 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {transactions.length > 0 ? (
            transactions.map((transaction: any) => (
              <TransactionComponent
                key={transaction.id}
                transaction={transaction}
                onDelete={(id: string) =>
                  handleTransactionDelete(
                    id,
                    transaction.transactionType,
                    transaction.amount
                  )
                }
                isRecentTransaction={true}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No transactions available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
