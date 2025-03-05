import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  adminInfo: {
    accessToken: string;
    refreshToken: string;
    email: string;
  } | null;
}

const initialState: AdminState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo") as string)
    : null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminDetails: (
      state,
      action: PayloadAction<AdminState["adminInfo"]>
    ) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    logoutAdmin: (state) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
});

export const { setAdminDetails, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
