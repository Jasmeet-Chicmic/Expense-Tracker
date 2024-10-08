import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../../../Store/Modal';
import CustomForm from '../../../../../Components/Shared/Form/CustomForm';

import { INCOME_MODAL_SCHEMA } from './helper/IncomeModalSchema';
import { updateIncome } from '../../../../../Store/User';

import useFirbase from '../../../../../Hooks/useFirbase';

import { RootState } from '../../../../../Store';

// Function to update total expenses and balance in Firestore

const IncomeModal = () => {
  const dispatch = useDispatch();
  const { updateTotalIncomeAndBalance } = useFirbase();
  const selectedCurrency = useSelector(
    (state: RootState) => state.user.selectedCurrency
  ) as string;
  const { currencyConversionRate } = useSelector((state: any) => state.user);
  // Handler to manage adding expense and closing the modal
  const handleAddIncome = async (data: any) => {
    let amount = Number(data.Amount);
    if (currencyConversionRate)
      (amount = amount / currencyConversionRate[selectedCurrency]),
        await updateTotalIncomeAndBalance(amount, data.Description);
    dispatch(updateIncome(amount));
    dispatch(closeModal());
  };

  return (
    <div>
      <h2 className="text-center font-bold text-2xl text-black dark:text-white">
        Add Income
      </h2>
      {/* Form for adding expense */}
      <CustomForm
        id="expense-form"
        formData={INCOME_MODAL_SCHEMA}
        defaultValues={{}}
        onSubmit={handleAddIncome}
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

export default IncomeModal;
