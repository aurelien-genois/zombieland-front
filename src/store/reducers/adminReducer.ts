import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import type { IPaginatedUsers, IUser } from "@/@types";
import { axiosInstance } from "@/api/axiosInstance";
import type { AxiosError } from "axios";

// **********************************************************************************
// ** Types & Initial State
// **********************************************************************************

interface AdminState {
  usersList: IPaginatedUsers | null;
  loading: boolean;
  error: string | null;
  userDetails?: IUser | null;
}

export const initialState: AdminState = {
  usersList: null,
  loading: false,
  error: null,
  userDetails: null,
};

// **********************************************************************************
// ** Actions (Async & Sync)
// **********************************************************************************

// Get All Users
export const getAllUsers = createAsyncThunk<
  IPaginatedUsers,
  {
    page?: number;
    limit?: number;
    q?: string | null;
    status?: string;
    role?: string;
  } | void,
  { rejectValue: string }
>("admin/getAllUsers", async (params, { rejectWithValue }) => {
  try {
    const searchParams = new URLSearchParams();

    if (params) {
      if (params.page) searchParams.append("page", params.page.toString());
      if (params.limit) searchParams.append("limit", params.limit.toString());
      if (params.q) searchParams.append("q", params.q);
      if (params.status) searchParams.append("status", params.status);
      if (params.role) searchParams.append("role", params.role);
    }

    const response = await axiosInstance.get(
      `/users?${searchParams.toString()}`
    );
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

// Get One User by ID
export const getUserById = createAsyncThunk<
  IUser,
  { userId: number },
  { rejectValue: string }
>("admin/getUserById", async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    console.log(`User ${userId} fetched successfully:`, response.data);
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

// Change User Role
export const changeUserRole = createAsyncThunk<
  void,
  { userId: number; newRole: string },
  { rejectValue: string }
>("admin/changeUserRole", async ({ userId, newRole }, { rejectWithValue }) => {
  try {
    console.log(`Changing role for user ${userId} to ${newRole}`);
    await axiosInstance.patch(`/users/${userId}/role`, { role: newRole });
    console.log(`User ${userId} role changed to ${newRole}`);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data as string);
    } else {
      return rejectWithValue(axiosError.message);
    }
  }
});

// Delete User
export const deleteUser = createAsyncThunk<
  void,
  { userId: number },
  { rejectValue: string }
>("admin/deleteUser", async ({ userId }, { rejectWithValue }) => {
  try {
    console.log(`Deleting user ${userId}`);
    await axiosInstance.delete(`/users/${userId}`);
    console.log(`User ${userId} deleted`);
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

  // Change User Role
  builder.addCase(changeUserRole.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(changeUserRole.fulfilled, (state) => {
    state.loading = false;
  });
  builder.addCase(changeUserRole.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || "Failed to change user role";
  });
  // Delete User
  builder.addCase(deleteUser.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(deleteUser.fulfilled, (state) => {
    state.loading = false;
  });
  builder.addCase(deleteUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || "Failed to delete user";
  });
  // Get One User by ID
  builder.addCase(getUserById.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(getUserById.fulfilled, (state, action) => {
    state.loading = false;
    state.userDetails = action.payload;
  });
  builder.addCase(getUserById.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || "Failed to fetch user";
  });
});

export default adminReducer;
