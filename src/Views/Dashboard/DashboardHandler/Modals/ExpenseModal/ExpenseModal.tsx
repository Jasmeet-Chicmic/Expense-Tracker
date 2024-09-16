import { useDispatch } from 'react-redux';
import { closeModal } from '../../../../../Store/Modal';
import CustomForm from '../../../../../Components/Shared/Form/CustomForm';
import { EXPENSE_MODAL_SCHEMA } from './helper/ExpenseModalSchema';
import { updateExpense } from '../../../../../Store/User';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../../../firebase/firebase';

// Function to update total expenses and balance in Firestore
async function updateTotalExpenseAndBalance(amount: number) {
  const userId = auth.currentUser?.uid;

  if (!userId) {
    console.error("User is not authenticated.");
    return;
  }

  try {
    // Get the user's document reference
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const currentExpenses = userData?.Expenses || 0;
      const currentBalance = userData?.Balance || 0;

      // Calculate the new expenses and balance
      const newExpenses = currentExpenses + amount;
      const newBalance = currentBalance - amount;  // Assuming balance decreases by expense amount

      // Update the Expenses and Balance fields in Firestore
      await updateDoc(userDocRef, { 
        Expenses: newExpenses,
        Balance: newBalance
      });

      console.log("Expenses updated to:", newExpenses, "Balance updated to:", newBalance);
    } else {
      console.error("User document does not exist.");
    }
  } catch (error) {
    console.error("Error updating expenses and balance:", error);
  }
}

// Function to add a new expense record in Firestore and update total expenses
async function addExpense(
  userId: string | undefined,
  amount: number,
  description: string
) {
  console.log('Adding expense', userId, amount, description);
  if (userId) {
    // Add the new expense to the user's 'expenses' collection
    await addDoc(collection(db, 'users', userId, 'expenses'), {
      amount: amount,
      description: description,
    });

    // Update the total expenses and balance in Firestore
    await updateTotalExpenseAndBalance(amount);

    console.log('Expense added successfully', userId, amount, description);
  }
}

const AddExpenseModal = () => {
  const dispatch = useDispatch();

  // Handler to manage adding expense and closing the modal
  const handleAddExpense = async (data: any) => {
    const amount = Number(data.Amount);

    // Step 1: Dispatch to update the Redux store
    dispatch(updateExpense(amount)); // Updates Redux store expenses and balance

    // Step 2: Add the expense to Firestore and update Firestore fields
    await addExpense(
      auth.currentUser?.uid,
      amount,
      data.Description
    );

    // Step 3: Close the modal after successful addition
    dispatch(closeModal());
  };

  return (
    <div>
      <h2>Add New Expense</h2>
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
