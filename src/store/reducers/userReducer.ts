import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import type { IUser } from "../../@types";
import { axiosInstance } from "../../api/axiosInstance";

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

      const { data } = await axiosInstance.post("/auth/login", objData);
      console.log("data :LOGIN:", data);

      return data.user as IUser;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Network error occurred");
    }
  }
);

// Me
export const fetchMe = createAsyncThunk<IUser, void, { rejectValue: string }>(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/users/me");
      return data as IUser;
    } catch {
      return rejectWithValue("Unauthenticated");
    }
  }
);

// LOGOUT
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async () => {
    await axiosInstance.get("/auth/logout");
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
    })

    // fetchMe
    .addCase(fetchMe.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchMe.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.isAuth = true;
      state.loading = false;
    })
    .addCase(fetchMe.rejected, (state) => {
      state.userInfo = null;
      state.isAuth = false;
      state.loading = false;
    })

    // logout
    .addCase(logout.fulfilled, (state) => {
      state.userInfo = null;
      state.isAuth = false;
    });
});

export default userReducer;
