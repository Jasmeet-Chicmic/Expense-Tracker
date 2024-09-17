import React from 'react';
import { closeModal } from '../../../../../Store/Modal';
import { useDispatch } from 'react-redux';

import useFirbase from '../../../../../Hooks/useFirbase';

interface ConfirmationModalProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  confirmText,
  cancelText,
  
}) => {
  const { signOutUser } = useFirbase();

  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center p-4 ">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        {title || 'Confirmation'}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {message || 'Are you sure you want to proceed?'}
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => {
            dispatch(closeModal());
          }}
          className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md"
        >
          {cancelText || 'Cancel'}
        </button>
        <button
          onClick={() => {
            dispatch(closeModal());
            signOutUser();
          }}
          className="bg-red-500 text-white py-2 px-4 rounded-md"
        >
          {confirmText || 'Confirm'}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
