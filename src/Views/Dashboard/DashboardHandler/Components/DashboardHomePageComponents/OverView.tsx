import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Store';
import { motion } from 'framer-motion';
import { convertCurrency } from '../../../../../Helpers/utility';

const OverView = () => {
  const balance = useSelector((state: RootState) => state.user.balance);
  const income = useSelector((state: RootState) => state.user.income);
  const expense = useSelector((state: RootState) => state.user.expenses);
  const { currencyConversionRate } = useSelector((state: any) => state.user);
  const selectedCurrency = useSelector(
    (state: RootState) => state.user.selectedCurrency
  );
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className=" h-1/4 text-xl font-bold bg-opacity-70 bg-gray-300 dark:bg-[#1F2A38] rounded-lg p-4 flex flex-col"
    >
      <div className="h-1/6">Overview</div>
      <div className="flex-1 flex  justify-around items-center">
        <div>
          <div className="text-center">
            {currencyConversionRate
              ? convertCurrency(
                  balance as number,
                  currencyConversionRate[selectedCurrency as string],
                  selectedCurrency as string
                )
              : balance}
          </div>
          <div className="text-gray-400 text-default text-sm text-center">
            Account Balance
          </div>
        </div>
        <div>
          <div className="text-center">
            {currencyConversionRate
              ? convertCurrency(
                  income as number,
                  currencyConversionRate[selectedCurrency as string],
                  selectedCurrency as string
                )
              : income}
          </div>
          <div className="text-gray-400 text-default text-sm text-center">
            Income
          </div>
        </div>
        <div>
          <div className="text-center">
            {currencyConversionRate
              ? convertCurrency(
                  expense as number,
                  currencyConversionRate[selectedCurrency as string],
                  selectedCurrency as string
                )
              : expense}
          </div>
          <div className="text-gray-400 text-default text-sm text-center">
            Expense
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OverView;
