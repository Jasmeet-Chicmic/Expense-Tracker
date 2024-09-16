import { useDispatch } from 'react-redux';
import { closeModal } from '../../../../../Store/Modal';
import CustomForm from '../../../../../Components/Shared/Form/CustomForm';

import { INCOME_MODAL_SCHEMA } from './helper/IncomeModalSchema';
import { updateIncome } from '../../../../../Store/User';
import { auth, db } from '../../../../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// Function to update total expenses and balance in Firestore
async function updateTotalIncomeAndBalance(amount: number) {
  const userId = auth.currentUser?.uid;

  if (!userId) {
    console.error('User is not authenticated.');
    return;
  }

  try {
    // Get the user's document reference
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const currentIncome = userData?.Income || 0;
      const currentBalance = userData?.Balance || 0;

      // Calculate the new expenses and balance
      const newIncome = currentIncome + amount;
      const newBalance = currentBalance + amount; // Assuming balance decreases by expense amount

      // Update the Expenses and Balance fields in Firestore
      await updateDoc(userDocRef, {
        Income: newIncome,
        Balance: newBalance,
      });

      console.log(
        'Expenses updated to:',
        newIncome,
        'Balance updated to:',
        newBalance
      );
    } else {
      console.error('User document does not exist.');
    }
  } catch (error) {
    console.error('Error updating expenses and balance:', error);
  }
}

const IncomeModal = () => {
  const dispatch = useDispatch();

  // Handler to manage adding expense and closing the modal
  const handleAddIncome = async (data: any) => {
    const amount = Number(data.Amount);
    await updateTotalIncomeAndBalance(amount);
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
