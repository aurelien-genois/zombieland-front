import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import type { IPaginatedUsers } from "@/@types";
import { axiosInstance } from "@/api/axiosInstance";
import type { AxiosError } from "axios";

// **********************************************************************************
// ** Types & Initial State
// **********************************************************************************

interface AdminState {
  usersList: IPaginatedUsers | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AdminState = {
  usersList: null,
  loading: false,
  error: null,
};

// **********************************************************************************
// ** Actions (Async & Sync)
// **********************************************************************************

// Get All Users
export const getAllUsers = createAsyncThunk<
  IPaginatedUsers,
  void,
  { rejectValue: string }
>("admin/getAllUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/users");
    console.log("Users fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data as string);
    } else {
      return rejectWithValue(axiosError.message);
    }
  }
});

// **********************************************************************************
// ** Reducer & Associated Cases
// **********************************************************************************

//
const adminReducer = createReducer(initialState, (builder) => {
  builder;
  // Get All Users
  builder.addCase(getAllUsers.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(getAllUsers.fulfilled, (state, action) => {
    state.loading = false;
    state.usersList = action.payload;
  });
  builder.addCase(getAllUsers.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || "Failed to fetch users";
  });
});

export default adminReducer;
