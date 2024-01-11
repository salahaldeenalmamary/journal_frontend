// 

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getHeaders from '../api/getHeaders';
import { API_BASE } from '../api/const';

const API_BASE_URL = `${API_BASE}api/ReviewAssignment`; 

// Async Thunks
export const getReviewAssignments = createAsyncThunk('reviewAssignments/getReviewAssignments', async () => {
  const response = await axios.get(`${API_BASE_URL}`,getHeaders());
  return response.data;
});

export const createReviewAssignment = createAsyncThunk('reviewAssignments/createReviewAssignment', async (assignmentData) => {
  const response = await axios.post(`${API_BASE_URL}`, assignmentData,getHeaders());
  return response.data;
});

export const getReviewAssignmentsByReviewerId = createAsyncThunk('reviewAssignments/getReviewAssignmentsByReviewerId', async (reviewerId) => {
  const response = await axios.get(`${API_BASE_URL}/${reviewerId}`,getHeaders());
  return response.data;
});

export const getReviewAssignmentById = createAsyncThunk('reviewAssignments/getReviewAssignmentById', async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`,getHeaders());
  return response.data;
});

export const updateReviewAssignment = createAsyncThunk('reviewAssignments/updateReviewAssignment', async ({ id, assignmentData }) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, assignmentData,getHeaders());
  return response.data;
});

export const deleteReviewAssignment = createAsyncThunk('reviewAssignments/deleteReviewAssignment', async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`,getHeaders());
  return id;
});

// Review Assignments Slice
const reviewAssignmentsSlice = createSlice({
  name: 'reviewAssignments',
  initialState: {
    assignments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviewAssignments.fulfilled, (state, action) => {
        state.assignments = action.payload;
      })
      .addCase(createReviewAssignment.fulfilled, (state, action) => {
        state.assignments.push(action.payload);
      })
      .addCase(getReviewAssignmentsByReviewerId.fulfilled, (state, action) => {
        // Update state with assignments by reviewer 
      })
      .addCase(getReviewAssignmentById.fulfilled, (state, action) => {
        // Update state with assignment by id 
      })
      .addCase(updateReviewAssignment.fulfilled, (state, action) => {
        // Update state with the updated assignment 
      })
      .addCase(deleteReviewAssignment.fulfilled, (state, action) => {
        state.assignments = state.assignments.filter((assignment) => assignment.id !== action.payload);
      })
      .addMatcher(
        (action) =>
          [getReviewAssignments.pending, createReviewAssignment.pending, getReviewAssignmentsByReviewerId.pending, getReviewAssignmentById.pending, updateReviewAssignment.pending, deleteReviewAssignment.pending].includes(action.type),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) =>
          [getReviewAssignments.rejected, createReviewAssignment.rejected, getReviewAssignmentsByReviewerId.rejected, getReviewAssignmentById.rejected, updateReviewAssignment.rejected, deleteReviewAssignment.rejected].includes(action.type),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        (action) =>
          [getReviewAssignments.fulfilled, createReviewAssignment.fulfilled, getReviewAssignmentsByReviewerId.fulfilled, getReviewAssignmentById.fulfilled, updateReviewAssignment.fulfilled, deleteReviewAssignment.fulfilled].includes(action.type),
        (state) => {
          state.status = 'succeeded';
        }
      );
  },
});

export default reviewAssignmentsSlice.reducer;
