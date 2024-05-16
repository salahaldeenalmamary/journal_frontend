import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from "../../config.json";

import http from "../../services/httpService";

const { apiUrl } = config;
// Define the initial state
const initialState = {
  classifications: [],
  loading: false,
  error: null,
};

// Define the asynchronous thunk to fetch classifications
export const fetchClassifications = createAsyncThunk(
  'classifications/fetchClassifications',
  async () => {
    const response = await http.get(`${apiUrl}/classification`);
    return response.data;
  }
);

// Create the slice
const classificationSlice = createSlice({
    name: 'classifications',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchClassifications.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchClassifications.fulfilled, (state, action) => {
          state.loading = false;
          state.classifications = action.payload;
        })
        .addCase(fetchClassifications.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  

export default classificationSlice.reducer;

// Export action creators
export const { } = classificationSlice.actions;
