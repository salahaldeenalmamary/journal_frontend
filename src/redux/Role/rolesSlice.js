// 

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getHeaders from '../api/getHeaders';
import { API_BASE } from '../api/const';

const API_BASE_URL = `${API_BASE}api/Role`; 

export const addRole = createAsyncThunk('roles/addRole', async (roleData) => {
  const response = await axios.post(`${API_BASE_URL}/AddRole`, roleData,getHeaders());
  return response.data;
});

export const getAllRoles = createAsyncThunk('roles/getAllRoles', async () => {
  const response = await axios.get(`${API_BASE_URL}/GetAllRoles`,getHeaders());
  return response.data;
});

export const deleteRole = createAsyncThunk('roles/deleteRole', async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
  return id;
});

export const getAllUsersWithRoles = createAsyncThunk('roles/getAllUsersWithRoles', async () => {
  const response = await axios.get(`${API_BASE_URL}/GetAllUsersWithRoles`,getHeaders());
  return response.data;
});

export const getAllUsers = createAsyncThunk('roles/getAllUsers', async () => {
  const response = await axios.get(`${API_BASE_URL}/GetAllUse`,getHeaders());
  return response.data;
});

export const assignRoleToUser = createAsyncThunk('roles/assignRoleToUser', async (assignmentData) => {
  const response = await axios.post(`${API_BASE_URL}/AssignRoleToUser`, assignmentData,getHeaders());
  return response.data;
});

export const getCurrentUserWithRoles = createAsyncThunk('roles/getCurrentUserWithRoles', async () => {
  const response = await axios.get(`${API_BASE_URL}/GetCurrentUserWithRoles`,getHeaders());
  return response.data;
});

// Roles Slice
const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    usersWithRoles: [],
    currentUserWithRoles: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter((role) => role.id !== action.payload);
      })
      .addCase(getAllUsersWithRoles.fulfilled, (state, action) => {
        state.usersWithRoles = action.payload;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        // Update state with the fetched users 
      })
      .addCase(assignRoleToUser.fulfilled, (state, action) => {
        // Handle successful role assignment 

        
      })
      .addCase(getCurrentUserWithRoles.fulfilled, (state, action) => {
        state.currentUserWithRoles = action.payload;
      })
      .addMatcher(
        (action) => [addRole.pending, getAllRoles.pending, deleteRole.pending, getAllUsersWithRoles.pending, getAllUsers.pending, assignRoleToUser.pending, getCurrentUserWithRoles.pending].includes(action.type),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => [addRole.rejected, getAllRoles.rejected, deleteRole.rejected, getAllUsersWithRoles.rejected, getAllUsers.rejected, assignRoleToUser.rejected, getCurrentUserWithRoles.rejected].includes(action.type),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        (action) => [addRole.fulfilled, getAllRoles.fulfilled, deleteRole.fulfilled, getAllUsersWithRoles.fulfilled, getAllUsers.fulfilled, assignRoleToUser.fulfilled, getCurrentUserWithRoles.fulfilled].includes(action.type),
        (state) => {
          state.status = 'succeeded';
        }
      );
  },
});

export default rolesSlice.reducer;
