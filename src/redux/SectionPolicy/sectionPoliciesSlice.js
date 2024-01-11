

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getHeaders from '../api/getHeaders';
import { API_BASE } from '../api/const';

const API_BASE_URL = `${API_BASE}api/SectionPolicy`; 

// Async Thunks
export const fetchSectionPolicies = createAsyncThunk('sectionPolicies/fetchAll', async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
});

export const createSectionPolicy = createAsyncThunk('sectionPolicies/create', async (sectionPolicyData) => {
  const response = await axios.post(`${API_BASE_URL}`, sectionPolicyData);
  return response.data;
});

export const fetchSectionPolicyById = createAsyncThunk('sectionPolicies/fetchById', async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
});

export const updateSectionPolicy = createAsyncThunk('sectionPolicies/update', async ({ id, sectionPolicyData }) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, sectionPolicyData);
  return response.data;
});

export const deleteSectionPolicy = createAsyncThunk('sectionPolicies/delete', async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
  return id;
});


const sectionPoliciesSlice = createSlice({
  name: 'sectionPolicies',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectionPolicies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSectionPolicies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSectionPolicies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createSectionPolicy.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(fetchSectionPolicyById.fulfilled, (state, action) => {
        // Handle fetching a single section policy
      })
      .addCase(updateSectionPolicy.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex((sectionPolicy) => sectionPolicy.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteSectionPolicy.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter((sectionPolicy) => sectionPolicy.id !== action.payload);
      });
  },
});

export default sectionPoliciesSlice.reducer;
