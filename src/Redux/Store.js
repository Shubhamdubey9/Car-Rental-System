import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice"; // ✅ CORRECT

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
export default store;
