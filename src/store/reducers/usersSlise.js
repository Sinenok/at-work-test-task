import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users?_limit=6"
      );
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateUserById = createAsyncThunk(
  "users/updateUserById",
  async (
    { userId, firstName, nickName, email, city, phone, company },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            nickName,
            email,
            city,
            phone,
            company,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  activeUsers: {
    listActive: [],
    status: null,
    error: null,
    listArchived: [],
  },
  getEditingUser: {
    user: null,
    status: null,
    error: null,
  },
  editingUser: {
    status: null,
    error: null,
    isEditing: false,
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUserToArchive: (state, action) => {
      const userToArchive = state.activeUsers.listActive.find(
        (user) => user.id === action.payload
      );
      state.activeUsers.listArchived.push(userToArchive);
      state.activeUsers.listActive = state.activeUsers.listActive.filter(
        (user) => user.id !== action.payload
      );
    },
    addUserToActive: (state, action) => {
      const userToActive = state.activeUsers.listArchived.find(
        (user) => user.id === action.payload
      );
      state.activeUsers.listActive.push(userToActive);
      state.activeUsers.listArchived = state.activeUsers.listArchived.filter(
        (user) => user.id !== action.payload
      );
    },
    hideUser: (state, action) => {
      state.activeUsers.listActive = state.activeUsers.listActive.filter(
        (user) => user.id !== action.payload
      );
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.activeUsers.status = "loading";
      state.activeUsers.error = null;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.activeUsers.status = "resolved";
      state.activeUsers.listActive = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.activeUsers.status = "rejected";
      state.activeUsers.error = action.payload;
    },

    [fetchUserById.pending]: (state) => {
      state.getEditingUser.status = "loading";
      state.getEditingUser.error = null;
    },
    [fetchUserById.fulfilled]: (state, action) => {
      state.getEditingUser.status = "resolved";
      state.getEditingUser.user = action.payload;
    },
    [fetchUserById.rejected]: (state, action) => {
      state.getEditingUser.status = "rejected";
      state.getEditingUser.error = action.payload;
    },

    [updateUserById.pending]: (state) => {
      state.editingUser.status = "loading";
      state.editingUser.error = null;
      state.editingUser.isEditing = false;
    },
    [updateUserById.fulfilled]: (state) => {
      state.editingUser.status = "resolved";
      state.editingUser.isEditing = true;
    },
    [updateUserById.rejected]: (state, action) => {
      state.editingUser.status = "rejected";
      state.editingUser.error = action.payload;
    },
  },
});

export const { addUserToArchive, addUserToActive, hideUser } =
  usersSlice.actions;

export default usersSlice.reducer;
