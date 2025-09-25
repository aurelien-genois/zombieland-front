import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import type {
  IUser,
  IUserChangePassword,
  IUserResetPassword,
} from "../../@types";

import { axiosInstance } from "../../api/axiosInstance";
import type { AxiosError } from "axios";

// **********************************************************************************
// ** Types & Initial State
// **********************************************************************************

interface AdminState {
  usersInfo: IUser[] | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AdminState = {
  usersInfo: null,
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
    } catch (error: any) {
      console.error("LOGIN ERROR CAUGHT:", error);
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const responseData = axiosError.response.data as any;
        const errorMessage = responseData?.error;

        if (axiosError.response.status === 400) {
          return rejectWithValue("Email ou mot de passe incorrect");
        }
        return rejectWithValue(
          errorMessage || `Erreur serveur: ${axiosError.response.status}`
        );
      } else if (axiosError.request) {
        console.log(">Network< error - no response");
        return rejectWithValue(
          "Erreur réseau: Impossible de contacter le serveur"
        );
      }
      return rejectWithValue(
        "Une erreur est survenue. Veuillez réessayer plus tard."
      );
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
