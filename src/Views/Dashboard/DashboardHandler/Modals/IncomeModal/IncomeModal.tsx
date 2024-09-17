import { useDispatch } from 'react-redux';
import { closeModal } from '../../../../../Store/Modal';
import CustomForm from '../../../../../Components/Shared/Form/CustomForm';

import { INCOME_MODAL_SCHEMA } from './helper/IncomeModalSchema';
import { updateIncome } from '../../../../../Store/User';

import useFirbase from '../../../../../Hooks/useFirbase';

// Function to update total expenses and balance in Firestore

const IncomeModal = () => {
  const dispatch = useDispatch();
  const { updateTotalIncomeAndBalance } = useFirbase();
  // Handler to manage adding expense and closing the modal
  const handleAddIncome = async (data: any) => {
    const amount = Number(data.Amount);
    await updateTotalIncomeAndBalance(amount, data.Description);
    dispatch(updateIncome(amount));
    dispatch(closeModal());
  };

  return (
    <div>
      <h2>Add Income</h2>
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
