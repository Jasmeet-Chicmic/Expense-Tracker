import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TRANSACTION_TYPE } from "../../../../../Hooks/useFirbase";

interface TransactionProps {
  transaction: {
    id: string;
    transactionType: string;
    amount: number;
    description?: string;
  };
  onDelete: (id: string) => void;
}

const TransactionComponent: React.FC<TransactionProps> = ({ transaction, onDelete }) => {
  return (
    <div className="h-auto bg-gray-300 dark:bg-gray-700 p-4 rounded-md text-white flex justify-between items-center">
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
      <button
        onClick={() => onDelete(transaction.id)}
        className="text-red-500 hover:text-red-700 transition-colors"
        aria-label="Delete Transaction"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default TransactionComponent;
