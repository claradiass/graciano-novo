import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    definirToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { definirToken } = loginSlice.actions;

export default loginSlice.reducer;
