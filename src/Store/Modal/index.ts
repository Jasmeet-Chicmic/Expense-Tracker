import { createSlice } from '@reduxjs/toolkit';

export enum MODAL_TYPES {
    ADD_EXPENSE = 'addExpense',
    ADD_BALANCE = 'addBalance',
    ADD_INCOME = 'addIncome',
    CONFIRMATION_MODAL = 'confirmationModal',
};
type stateType = {
    modalType: MODAL_TYPES | null;
    modalProps?: object|any;
    isOpen: boolean;
};
const initialState: stateType = {
    modalType: null, // Type of modal (e.g., 'addExpense', 'editExpense')
    modalProps: {},  // Any additional data to pass to the modal
    isOpen: false,   // Whether the modal is open or not
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modalType = action.payload.modalType;
            state.modalProps = action.payload.modalProps || {};
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.modalType = null;
            state.modalProps = {};
            state.isOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
