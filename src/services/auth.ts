import { createAsyncThunk } from "@reduxjs/toolkit";

type AuthPayload = {
  username: string;
  password: string;
};

export const initAuth = createAsyncThunk(
  "auth/logIn",
  async (payload: AuthPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          username: payload.username,
          password: payload.password,
        }),
      });

      if (response.status === 200) {
        localStorage.setItem("isValidData", JSON.stringify(true));
      }

      if (response.status === 400) {
        return rejectWithValue("Fields can't be empty");
      }

      if (response.status === 401) {
        return rejectWithValue("Invalid username password combination");
      }
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);
