import { useDispatch } from 'react-redux';
import { MODAL_TYPES, openModal } from '../../../../../Store/Modal';

const AdditionButtons = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex p-2 gap-4">
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-1 rounded">
        Add Balance
      </button> */}
      <button
        onClick={() => {
          dispatch(openModal({ modalType: MODAL_TYPES.ADD_INCOME }));
        }}
        className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-1 rounded"
      >
        Add Income
      </button>
      <button
        onClick={() => {
          dispatch(openModal({ modalType: MODAL_TYPES.ADD_EXPENSE }));
        }}
        className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-1 rounded"
      >
        Add Expense
      </button>
    </div>
  );
};

export default AdditionButtons;
