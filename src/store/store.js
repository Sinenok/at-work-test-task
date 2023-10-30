import { configureStore } from "@reduxjs/toolkit";
import usersSlise from "./reducers/usersSlise";

export const store = configureStore({
  reducer: {
    users: usersSlise,
  },
});
