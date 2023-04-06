import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
    value: string;
}

const initialState: StateType = { value: "" };

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeColor: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { changeColor } = themeSlice.actions;

export default themeSlice.reducer;
