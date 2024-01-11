// stagesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getHeaders from '../api/getHeaders';
import { API_BASE } from '../api/const';

const API_BASE_URL = `${API_BASE}api/Stage`; 

// Async Thunks
export const fetchStages = createAsyncThunk('stages/fetchAll', async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
});

export const createStage = createAsyncThunk('stages/create', async (stageData) => {
  const response = await axios.post(`${API_BASE_URL}`, stageData);
  return response.data;
});

export const fetchStageById = createAsyncThunk('stages/fetchById', async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
});

export const updateStage = createAsyncThunk('stages/update', async ({ id, stageData }) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, stageData);
  return response.data;
});

export const deleteStage = createAsyncThunk('stages/delete', async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
  return id;
});

// Stages Slice
const stagesSlice = createSlice({
  name: 'stages',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchStages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createStage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(fetchStageById.fulfilled, (state, action) => {
    
      })
      .addCase(updateStage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex((stage) => stage.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteStage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter((stage) => stage.id !== action.payload);
      });
  },
});

export default stagesSlice.reducer;
