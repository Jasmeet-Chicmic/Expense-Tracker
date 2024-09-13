import { createSlice } from '@reduxjs/toolkit';

type UserState = {
    userName: string,
    photoUrl: string
}

const initialState: UserState = {
    userName: "",
    photoUrl: ""
};
const userSlice = createSlice({
    name: 'userData',
    initialState: initialState,
    reducers: {
        updateUserData: (state, action: { payload: UserState }) => {
            state.userName = action.payload.userName;
            state.photoUrl = action.payload.photoUrl;
        }

    },
});

export const { updateUserData } = userSlice.actions;

export default userSlice.reducer;
