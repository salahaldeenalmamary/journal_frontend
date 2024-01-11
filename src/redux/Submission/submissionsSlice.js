// 

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getHeaders from '../api/getHeaders';
import { API_BASE } from '../api/const';

const API_BASE_URL = `${API_BASE}api/Submissions`; // Replace with your API base URL

// Async Thunks
export const fetchSubmissions = createAsyncThunk('submissions/fetchAll', async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
});

export const createSubmission = createAsyncThunk('submissions/create', async (submissionData) => {
  const response = await axios.post(`${API_BASE_URL}`, submissionData);
  return response.data;
});

export const fetchSubmissionById = createAsyncThunk('submissions/fetchById', async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
});

export const updateSubmission = createAsyncThunk('submissions/update', async ({ id, submissionData }) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, submissionData);
  return response.data;
});

export const deleteSubmission = createAsyncThunk('submissions/delete', async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
  return id;
});

// Submissions Slice
const submissionsSlice = createSlice({
  name: 'submissions',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSubmissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createSubmission.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(fetchSubmissionById.fulfilled, (state, action) => {
   
      })
      .addCase(updateSubmission.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex((submission) => submission.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteSubmission.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter((submission) => submission.id !== action.payload);
      });
  },
});

export default submissionsSlice.reducer;
