import { createSlice } from "@reduxjs/toolkit";
import { initAuth } from "../services/auth";

type Login = {
  username: string;
  password: string;
  loading: boolean;
  error: string;
  isValidData: boolean;
};

const initialState: Login = {
  username: "",
  password: "",
  loading: false,
  error: "",
  isValidData: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsValidData: (state, action) => {
      state.isValidData = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initAuth.pending, (state) => {
      state.error = "";
      state.loading = true;
    });

    builder.addCase(initAuth.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(initAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;

export const { setIsValidData, clearError } = authSlice.actions;
