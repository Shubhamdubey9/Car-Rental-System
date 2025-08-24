import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      try {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } catch (error) {
        console.log(error.message);
      }
    },
    logout: (state) => {
      state.user = null;
      try {
        localStorage.removeItem("user");
      } catch (error) {
        console.log(error.message);
      }
    },
  },
});

export const { setLoading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
