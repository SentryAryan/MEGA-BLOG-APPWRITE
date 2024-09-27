import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoading: (state, action) => action.payload,
    },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;