import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
