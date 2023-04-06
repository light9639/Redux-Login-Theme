import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType1 {
    name: string;
    age: number;
    email: string;
}

const initialStateValue: StateType1 = { name: "", age: 0, email: "" };

export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue },
    reducers: {
        login: (state, action: PayloadAction<{ name: string; age: number ; email: string }>) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = initialStateValue;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
