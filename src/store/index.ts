import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import activitiesReducer from "./reducers/activitiesReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import ordersReducer from "./reducers/ordersReducer"

export const store = configureStore({
  reducer: {
    userStore: userReducer,
    activitiesStore: activitiesReducer,
    categoriesStore: categoriesReducer,
    ordersStore: ordersReducer
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
