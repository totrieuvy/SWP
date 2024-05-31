import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    // nhận vào stay hien tai va update bang payload
    login: (state, actions) => {
      state = actions.payload;
      return state;
    },

    logout: () => {
      return null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions;
export const selectUser = (store) => store.user;
export default counterSlice.reducer;
