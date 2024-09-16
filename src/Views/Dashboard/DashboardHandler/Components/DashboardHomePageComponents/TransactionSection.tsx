import { useEffect, useState } from 'react';
import { auth, db } from '../../../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth/cordova';

const TransactionSection = () => {
  // Create an array of 20 dummy elements
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUserTransactions() {
      const userId = auth.currentUser?.uid;

      if (!userId) {
        console.error('User is not authenticated.');
        return [];
      }

      try {
        // Reference to the user's 'expenses' collection
        const expensesCollectionRef = collection(
          db,
          'users',
          userId,
          'expenses'
        );

        // Fetch all the documents from the 'expenses' collection
        const expensesSnapshot = await getDocs(expensesCollectionRef);

        // Map through the documents and return the data
        const transactions = expensesSnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID if necessary
          ...doc.data(), // Spread the rest of the document data
        }));

        console.log('User transactions:', transactions);
        setTransactions(transactions);
      } catch (error) {
        console.error('Error fetching user transactions:', error);
        return [];
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log('User ID:', user.uid);
        fetchUserTransactions();
      } else {
        // No user is signed in
        console.log('No user is signed in.');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="flex-1 bg-[#1F2A38] text-xl font-bold rounded-lg p-4 flex flex-col">
      {/* Header Section */}
      <div className="h-16">Recent Transactions</div>

      {/* Scrollable Section */}
      <div className="flex-1 flex flex-col overflow-y-auto space-y-4 hide-scrollbar">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="h-auto bg-gray-700 p-4 rounded-md text-white"
          >
            {/* Transaction Amount */}
            <div className="text-lg font-semibold">${transaction.amount}</div>
            {/* Transaction Description */}
            <div className="text-sm text-gray-300">
              {transaction.description || 'No description provided.'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionSection;
