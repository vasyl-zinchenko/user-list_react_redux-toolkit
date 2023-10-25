import { createSlice } from "@reduxjs/toolkit";
import { getUsers, updateUser } from "../services/users";
import { FetchUser } from '../types/users';

type UserState = {
  users: FetchUser[];
  filteredUsers: FetchUser[] | null;
  loading: boolean;
  error: string;
  offset: number;
  usersLength: number;
  nextPage: string | null;
  prevPage: string | null;
};

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: "",
  offset: 0,
  usersLength: 0,
  nextPage: "",
  prevPage: "",
};

const authSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchByQuery: (state, action) => {
      state.filteredUsers = state.users.filter((user) =>
        user.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.results;
      state.usersLength = action.payload.count;
      state.nextPage = action.payload.next;
      state.prevPage = action.payload.previous;
      state.loading = false;
    });

    builder.addCase(getUsers.rejected, (state) => {
      state.loading = false;
      state.error = "Error!";
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.map((el) => {
        if (el.id === action.payload.id) {
          return { ...action.payload };
        } else {
          return el;
        }
      });
      console.log(action.payload.id);
    });

    builder.addCase(updateUser.rejected, (state) => {
      state.loading = false;
      state.error = "Error!";
    });
  },
});

export default authSlice.reducer;

export const { searchByQuery } = authSlice.actions;
