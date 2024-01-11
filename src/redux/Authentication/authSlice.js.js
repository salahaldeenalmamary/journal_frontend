// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE } from '../api/const';

const API_BASE_URL = `${API_BASE}api/Authentication`;

// Async Thunks
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email) => {
  const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
  return response.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.post(`${API_BASE_URL}/logout`);
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
});

export const login = createAsyncThunk('auth/login', async (loginData) => {
  const response = await axios.post(`${API_BASE_URL}/Login`, loginData);
  localStorage.setItem('accessToken', response.data.accessToken.token);
  localStorage.setItem('refreshToken', response.data.refreshToken.token);
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (registerData) => {
  const response = await axios.post(`${API_BASE_URL}/Register`, registerData);
  return response.data;
});

export const confirmEmail = createAsyncThunk('auth/confirmEmail', async (token) => {
  const response = await axios.get(`${API_BASE_URL}/ConfirmEmail?token=${token}`);
  return response.data;
});

export const resetPasswordLink = createAsyncThunk('auth/resetPasswordLink', async (email) => {
  const response = await axios.get(`${API_BASE_URL}/reset_password?email=${email}`);
  return response.data;
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (resetData) => {
  const response = await axios.post(`${API_BASE_URL}/resetPassword`, resetData);
  return response.data;
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken || !refreshToken) {
    throw new Error('Access or refresh token not found');
  }

  const response = await axios.post(`${API_BASE_URL}/Refresh-Token`, {
    accessToken: { token: accessToken },
    refreshToken: { token: refreshToken },
  });

  localStorage.setItem('accessToken', response.data.accessToken.token);
  localStorage.setItem('refreshToken', response.data.refreshToken.token);

  return response.data;
});

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.fulfilled, (state, action) => {
        // Handle successful forgot password request 
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(confirmEmail.fulfilled, (state, action) => {
        // Handle successful email confirmation 
      })
      .addCase(resetPasswordLink.fulfilled, (state, action) => {
        // Handle successful reset password link request 
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        // Handle successful password reset 
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        // Handle successful token refresh 
      })
      .addMatcher(
        (action) =>
          [forgotPassword.pending, logout.pending, login.pending, register.pending, confirmEmail.pending, resetPasswordLink.pending, resetPassword.pending, refreshToken.pending].includes(action.type),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) =>
          [forgotPassword.rejected, logout.rejected, login.rejected, register.rejected, confirmEmail.rejected, resetPasswordLink.rejected, resetPassword.rejected, refreshToken.rejected].includes(action.type),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        (action) =>
          [forgotPassword.fulfilled, logout.fulfilled, login.fulfilled, register.fulfilled, confirmEmail.fulfilled, resetPasswordLink.fulfilled, resetPassword.fulfilled, refreshToken.fulfilled].includes(action.type),
        (state) => {
          state.status = 'succeeded';
        }
      );
  },
});

export default authSlice.reducer;
