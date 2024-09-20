import { useEffect, useState } from 'react';
import { auth, db } from '../../../../../firebase/firebase';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth/cordova';
import { RootState } from '../../../../../Store';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import TransactionComponent from './TransactionComponent';
import useFirbase, { TRANSACTION_TYPE } from '../../../../../Hooks/useFirbase';

const TransactionSection = () => {
  // Create an array of 20 dummy elements
  const [transactions, setTransactions] = useState<any[]>([]);
  const expense = useSelector((state: RootState) => state.user.expenses);
  const income = useSelector((state: RootState) => state.user.income);
  const { handleDeleteTransaction } = useFirbase();
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

        // Create a query to order by 'createdAt' in descending order and limit to 10
        const transactionsQuery = query(
          transactionsCollectionRef,
          orderBy('createdAt', 'desc'), // Sort by 'createdAt' in descending order
          limit(10) // Limit to the latest 10 transactions
        );

        // Fetch the documents that match the query
        const transactionsSnapshot = await getDocs(transactionsQuery);

        // Map through the documents and return the data
        let transactions = transactionsSnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID if necessary
          ...doc.data(), // Spread the rest of the document data
        }));

        console.log('Transactions: ', transactions);

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
        // No user is signed in
      }
    });

    return () => {
      unsubscribe();
    };
  }, [expense, income]);
  const handleTransactionDelete = async (
    transactionId: string,
    transactionType: TRANSACTION_TYPE,
    amount: number
  ) => {
    try {
      await handleDeleteTransaction(transactionId, transactionType, amount);
      setTransactions(
        transactions.filter((transaction) => transaction.id !== transactionId)
      );
    } catch (error) {}
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 bg-opacity-70 bg-gray-300 dark:bg-[#1F2A38] text-xl font-bold rounded-lg p-4 flex flex-col"
    >
      {/* Header Section */}
      <div className="h-16 text-black dark:text-white">Recent Transactions</div>

      {/* Scrollable Section */}
      <div className="flex-1 flex flex-col overflow-y-auto space-y-4 hide-scrollbar">
        {transactions.map((transaction, index) => (
          <TransactionComponent
            key={index}
            transaction={transaction}
            onDelete={(id: string) => {
              handleTransactionDelete(
                id,
                transaction.transactionType,
                transaction.amount
              );
            }}
            isRecentTransaction={false}
          ></TransactionComponent>
        ))}
      </div>
    </motion.div>
  );
};

export default TransactionSection;
