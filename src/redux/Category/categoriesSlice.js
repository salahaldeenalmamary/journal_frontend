// categoriesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getHeaders from '../api/getHeaders';
import { API_BASE } from '../api/const';

const API_BASE_URL = `${API_BASE}api/Category`; // Replace with your API base URL




export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
});

export const createCategory = createAsyncThunk('categories/create', async (categoryData) => {
  const response = await axios.post(`${API_BASE_URL}`, categoryData, getHeaders());
  return response.data;
});

export const fetchCategoryById = createAsyncThunk('categories/fetchById', async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`, getHeaders());
  return response.data;
});

export const updateCategory = createAsyncThunk('categories/update', async ({ id, categoryData }) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, categoryData, getHeaders());
  return response.data;
});

export const deleteCategory = createAsyncThunk('categories/delete', async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`, getHeaders());
  return id;
});


const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        // Handle fetching a single category if needed
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex((category) => category.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter((category) => category.id !== action.payload);
      });
  },
});

export default categoriesSlice.reducer;
