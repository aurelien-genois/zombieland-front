import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import type { IUser } from "../../@types";

import { axiosInstance } from "../../api/axiosInstance";
import type { AxiosError } from "axios";

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

// Me
export const fetchMe = createAsyncThunk<IUser, void, { rejectValue: string }>(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/users/me");
      console.log(">>>>>>>>>>>><<data :ME:", data);
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

// Resend Email Confirmation
export const resendEmailConfirmation = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("auth/resend-email-confirmation", async (email, { rejectWithValue }) => {
  try {
    await axiosInstance.post("/auth/resend-email-confirmation", { email });
  } catch (error: any) {
    return rejectWithValue(error.message ?? "Network error occurred");
  }
});

// Forgot Password
export const forgotPassword = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("auth/forgot-password", async (email, { rejectWithValue }) => {
  try {
    await axiosInstance.post("/auth/forgot-password", { email });
  } catch (error: any) {
    return rejectWithValue(error.message ?? "Network error occurred");
  }
});

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
      console.log(">>>>>>isAuth:", state.isAuth);
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
  // emailConfirmation
  builder
    .addCase(resendEmailConfirmation.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(resendEmailConfirmation.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(resendEmailConfirmation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Email confirmation failed";
      console.error("Email confirmation failed:", action.payload);
    });
});

export default userReducer;
