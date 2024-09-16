import { createSlice } from '@reduxjs/toolkit';

type UserState = {
    userName: string,
    photoUrl: string
    income?: number,
    expenses?: number,
    balance?: number
}

const initialState: UserState = {
    userName: "",
    photoUrl: "",
    income: 0,
    expenses: 0,
    balance: 0
};
const userSlice = createSlice({
    name: 'userData',
    initialState: initialState,
    reducers: {
        updateUserData: (state, action: { payload: UserState }) => {
            state.userName = action.payload.userName;
            state.photoUrl = action.payload.photoUrl;
            state.balance = action.payload.balance;
            state.income = action.payload.income;
            state.expenses = action.payload.expenses;
        },
        updateExpense: (state, action: { payload: number }) => {
            if (state.expenses != undefined) {
                state.expenses = state.expenses + action.payload;
                if (state.balance !== undefined)
                    state.balance = state.balance - action.payload;
            }



        },
        updateIncome: (state, action: { payload: number }) => {
            if (state.income != undefined && state.balance != undefined) {
                console.log("income is not undefined");

                state.income = state.income + action.payload;
                state.balance = state.balance + action.payload;
            }

        }

    },
});

export const { updateUserData, updateExpense, updateIncome } = userSlice.actions;

export default userSlice.reducer;
