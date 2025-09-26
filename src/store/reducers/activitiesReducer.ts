import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import type { IActivity } from "@/@types";
import { axiosInstance } from "@/api/axiosInstance";
// import type { AxiosError } from "axios";

// **********************************************************************************
// ** Types & Initial State
// **********************************************************************************

interface ActivitiesState {
  activities: IActivity[];
  currentActivity?: IActivity;
  page: number;
  perPage: number;
  total: number;
  loading: boolean;
  error: string | null;
}

export const initialState: ActivitiesState = {
  activities: [],
  currentActivity: undefined,
  page: 1,
  perPage: 20,
  total: 0,
  loading: false,
  error: null,
};

// **********************************************************************************
// ** Actions (Async & Sync)
// **********************************************************************************

export const fetchActivities = createAsyncThunk(
  "activities/fetchAll",
  async (params: { perPage?: number; page?: number }, { rejectWithValue }) => {
    try {
      // TODO manage params (category (id), age_group (0/1/2/3), high_intensity (bool), disabled_access (bool), limit (int), status, page (int), order (name:asc/name:desc))
      const { data } = await axiosInstance.get("/activities", {
        params: {
          ...(params.perPage && { limit: params.perPage }),
          ...(params.page && { page: params.page }),
        },
      });
      console.log("DATA FROM FETCH ACTIVITIES: ", data);
      // TODO Axios errors
      return data as { activities: IActivity[]; totalActivities: number };
    } catch {
      return rejectWithValue("Failed to fetch activities");
    }
  }
);

export const fetchOneActivity = createAsyncThunk(
  "activities/fetchOne",
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/activities/${slug}`, {
        params: {},
      });
      console.log("DATA FROM FETCH ONE ACTIVITY: ", data);
      // TODO Axios errors
      return data as IActivity;
    } catch {
      return rejectWithValue("Failed to fetch one activity");
    }
  }
);

// **********************************************************************************
// ** Reducer & Associated Cases
// **********************************************************************************

const activitiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchActivities.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchActivities.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.activities = action.payload.activities;
      state.total = action.payload.totalActivities;
      state.perPage = action.payload.activities.length;
      state.page = 1; // TODO manage page
    })
    .addCase(fetchActivities.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch activities";
    });

  builder
    .addCase(fetchOneActivity.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchOneActivity.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentActivity = action.payload;
    })
    .addCase(fetchOneActivity.rejected, (state, action) => {
      state.loading = false;
      state.error =
        (action.payload as string) || "Failed to fetch one activity";
    });
});

export default activitiesReducer;
