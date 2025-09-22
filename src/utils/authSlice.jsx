import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  jwt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.jwt = action.payload.jwt;
    },
    logout: (state) => {
      state.user = null;
      state.jwt = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
