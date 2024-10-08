import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../../../Store/Modal';
import CustomForm from '../../../../../Components/Shared/Form/CustomForm';
import { EXPENSE_MODAL_SCHEMA } from './helper/ExpenseModalSchema';
import { updateExpense } from '../../../../../Store/User';

import { auth } from '../../../../../firebase/firebase';
import useFirbase, { TRANSACTION_TYPE } from '../../../../../Hooks/useFirbase';
import { RootState } from '../../../../../Store';

// Function to update total expenses and balance in Firestore

// Function to add a new expense record in Firestore and update total expenses

const AddExpenseModal = () => {
  const dispatch = useDispatch();
  const { addTransaction } = useFirbase();
  const { currencyConversionRate } = useSelector((state: any) => state.user);
  const selectedCurrency = useSelector(
    (state: RootState) => state.user.selectedCurrency
  ) as string;
  // Handler to manage adding expense and closing the modal
  // Handler to manage adding expense and closing the modal
  const handleAddExpense = async (data: any) => {
    let amount = Number(data.Amount);
    if (currencyConversionRate)
      (amount = amount / currencyConversionRate[selectedCurrency]),
        // Step 1: Dispatch to update the Redux store
        dispatch(updateExpense(amount)); // Updates Redux store expenses and balance

    // Step 2: Add the expense to Firestore and update Firestore fields
    await addTransaction(
      auth.currentUser?.uid,
      amount,
      data.Description,
      TRANSACTION_TYPE.EXPENSE
    );

    // Step 3: Close the modal after successful addition
    dispatch(closeModal());
  };

  return (
    <div>
      <h2 className="text-center font-bold text-2xl text-black dark:text-white">
        Add New Expense
      </h2>
      {/* Form for adding expense */}
      <CustomForm
        id="expense-form"
        formData={EXPENSE_MODAL_SCHEMA}
        defaultValues={{}}
        onSubmit={handleAddExpense}
        submitBtnClassName="btn btn-primary btn-md"
        isDisabledSubmit={false}
        secondaryButtonType="button"
        secondaryBtnClassName="btn btn-secondary btn-md"
        secondaryBtnText="Cancel"
        isShowSecondaryBtn={true}
        handleSecondaryButtonClick={() => {
          dispatch(closeModal());
        }}
        submitText="Add"
      />
    </div>
  );
};

export default AddExpenseModal;
