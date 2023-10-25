import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetUserParams, User } from "../types/users";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (params: GetUserParams) => {
    const { limit, offset } = params;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/table/?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();

      return await data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (user: User, thunkApi) => {
    const { id, ...userData } = user;

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/table/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...userData,
        }),
      });
      console.log(response);

      if (response.status === 400) {
        return thunkApi.rejectWithValue(await response.json());
      }

      const data = await response.json();
      return await data;
    } catch (error) {
      console.log(error);
    }
  }
);
