import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userInfo: {
    accessToken: string;
    refreshToken: string;
    role: "admin" | "user";
    isPremium?: boolean;
    hasCompletedPreferences?: boolean;
  } | null;
}

const initialState: UserState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserState["userInfo"]>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    setPremiumStatus: (state) => {
      if (state.userInfo) {
        state.userInfo.isPremium = true;
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    },
  },
});

export const { setUserDetails, logoutUser, setPremiumStatus } =
  userSlice.actions;
export default userSlice.reducer;
