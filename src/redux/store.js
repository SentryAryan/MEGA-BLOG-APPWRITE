import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import loadingReducer from "./slices/loadingSlice";
import counterReducer from "./slices/counterSlice";
const store = configureStore({
    reducer: {
        auth: authReducer, // Add the auth reducer to the store
        loading: loadingReducer,
        counter: counterReducer,
    }
});

export default store;
