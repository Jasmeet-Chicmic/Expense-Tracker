import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Store';

const OverView = () => {
  const balance = useSelector((state: RootState) => state.user.balance);
  const income = useSelector((state: RootState) => state.user.income);
  const expense = useSelector((state: RootState) => state.user.expenses);
  return (
    <div className=" h-1/4 text-xl font-bold bg-opacity-70 bg-gray-300 dark:bg-[#1F2A38] rounded-lg p-4 flex flex-col">
      <div className="h-1/6">Overview</div>
      <div className="flex-1 flex  justify-around items-center">
        <div>
          <div className="text-center">₹{balance}</div>
          <div className="text-gray-400 text-default text-sm text-center">
            Account Balance
          </div>
        </div>
        <div>
          <div className="text-center">₹{income}</div>
          <div className="text-gray-400 text-default text-sm text-center">
            Income
          </div>
        </div>
        <div>
          <div className="text-center">₹{expense}</div>
          <div className="text-gray-400 text-default text-sm text-center">
            Expense
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
