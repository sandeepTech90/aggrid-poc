import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./components/Counter/CounterSlice";
import columnReducer from "./components/Columns/ColumnSlice";

export const store = configureStore({
  reducer: { counter: counterReducer, column: columnReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
