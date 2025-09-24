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

// **********************************************************************************
// ** Reducer & Associated Cases
// **********************************************************************************

const userReducer = createReducer(initialState, (builder) => {
  builder;
});

export default userReducer;
