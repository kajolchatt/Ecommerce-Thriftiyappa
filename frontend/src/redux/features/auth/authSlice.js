import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expirationTime = new Date().getTime() * 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// initialState: Sets the initial state of the slice. It checks if userInfo is stored in localStorage and sets it accordingly.
// createSlice: Creates a Redux slice with a name, initial state, and reducers.
// Reducers:
// setCredentials: Sets userInfo in the state and stores it in localStorage. It also sets an expiration time for the login session.
// logout: Clears userInfo from the state and localStorage.
// Actions: Automatically generated from the reducers and exported (e.g., setCredentials, logout).