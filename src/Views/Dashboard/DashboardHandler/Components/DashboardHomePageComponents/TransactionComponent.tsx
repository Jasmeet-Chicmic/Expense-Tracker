import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TRANSACTION_TYPE } from '../../../../../Hooks/useFirbase';
import { motion } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
interface TransactionProps {
  transaction: {
    id: string;
    transactionType: string;
    amount: number;
    description?: string;
    createdAt:Timestamp
  };
  onDelete: (id: string) => void;
  isRecentTransaction: boolean;
}

const TransactionComponent: React.FC<TransactionProps> = ({
  transaction,
  onDelete,
  isRecentTransaction,
}) => {
  console.log('Transaction is here', transaction.createdAt);

  return (
    <motion.div
      initial={{ scale: 0.96 }}
      whileHover={{ scale: 1 }}
      className="h-auto bg-gray-300 dark:bg-gray-700 p-4 rounded-md text-white flex justify-between items-center"
    >
      <div>
        {/* Transaction Amount */}
        <div
          className={`text-lg font-bold ${
            transaction.transactionType === TRANSACTION_TYPE.EXPENSE
              ? 'text-red-500'
              : 'text-green-500'
          }`}
        >
          {transaction.transactionType === TRANSACTION_TYPE.EXPENSE
            ? '- ₹'
            : '+ ₹'}
          {transaction.amount}
        </div>
        {/* Transaction Description */}
        <div className="text-sm text-gray-600 dark:text-gray-200">
          {transaction.description || 'No description provided.'}
        </div>
      </div>


      {/* Delete Button with Icon */}
      <div className='flex flex-col'>
      <div>
        {transaction.createdAt.toDate().toLocaleDateString()}
      </div>
      {isRecentTransaction && (
        <button
          onClick={() => onDelete(transaction.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
          aria-label="Delete Transaction"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
      </div>
    </motion.div>
  );
};

export default TransactionComponent;
