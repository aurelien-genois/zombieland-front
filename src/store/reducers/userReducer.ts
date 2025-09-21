import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import type { IUser } from "../../@types";

// **********************************************************************************
// ** Types & Initial State
// **********************************************************************************

interface UserState {
  userInfo: IUser | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}
export const initialState: UserState = {
  userInfo: null,
  isAuth: false,
  loading: false,
  error: null,
};

// **********************************************************************************
// ** Actions (Async & Sync)
// **********************************************************************************

// LOGIN
export const login = createAsyncThunk<IUser, FormData, { rejectValue: string }>(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const objData = Object.fromEntries(formData);

      console.log("objData ::>>>>", objData);

      const res = await fetch("http://localhost:3020/api/auth/login", {
        method: "POST",
        body: JSON.stringify(objData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // REQUIRED to receive cookies
      });

      if (!res.ok) {
        const err = await res.json();
        return rejectWithValue(
          err?.message || `HTTP Error: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();

      console.log("data :LOGIN:", data);

      return data.user as IUser;
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Network error occurred");
    }
  }
);

// **********************************************************************************
// ** Reducer & Associated Cases
// **********************************************************************************

const userReducer = createReducer(initialState, (builder) => {
  builder
    // Login
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.isAuth = true;
      state.loading = false;
      state.error = null;
      console.log("isAuth:", state.isAuth);
      console.log("UserInfo:", state.userInfo);
    })
    .addCase(login.rejected, (state, action) => {
      state.userInfo = null;
      state.isAuth = false;
      state.loading = false;
      state.error = action.payload || "Login failed";
      console.error("Login failed:", action.payload);
    });
});

export default userReducer;
