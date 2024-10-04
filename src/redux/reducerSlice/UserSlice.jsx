import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLogin: false,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
      };
    },
    logoutUser: (state, action) => {
      return {
        ...initialState,
      };
    },
  },
});
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
