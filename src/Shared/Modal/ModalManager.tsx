import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { closeModal, MODAL_TYPES } from '../../Store/Modal';

import { RootState } from '../../Store';
import ExpenseModal from '../../Views/Dashboard/DashboardHandler/Modals/ExpenseModal/ExpenseModal';
import IncomeModal from '../../Views/Dashboard/DashboardHandler/Modals/IncomeModal/IncomeModal';

const ModalManager = () => {
  const dispatch = useDispatch();
  const { modalType, modalProps, isOpen } = useSelector(
    (state: RootState) => state.modal
  );

  const renderModalContent = () => {
    switch (modalType) {
      case MODAL_TYPES.ADD_EXPENSE:
        return <ExpenseModal {...modalProps} />;
      case MODAL_TYPES.ADD_BALANCE:
        return <h1>Add Balance Modal</h1>;
      case MODAL_TYPES.ADD_INCOME:
        return <IncomeModal {...modalProps}></IncomeModal>;
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => dispatch(closeModal())}
      contentLabel="Manage Modal"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-10"
      className="bg-white rounded-lg pt-[45.67px] pb-[45.67px] px-8 sm:px-[130.27px] shadow-lg max-w-[623.07px] w-full relative focus-visible:outline-none box-border mx-4"
    >
      {renderModalContent()}
    </Modal>
  );
};

export default ModalManager;
