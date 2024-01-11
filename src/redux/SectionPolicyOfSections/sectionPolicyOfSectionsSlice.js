// sectionPolicyOfSectionsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getHeaders from '../api/getHeaders';

import { API_BASE } from '../api/const';

const API_BASE_URL = `${API_BASE}/api/SectionPolicyOfSections`; 
// Async Thunks
export const fetchSectionPolicyOfSections = createAsyncThunk('sectionPolicyOfSections/fetchAll', async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
});

export const createSectionPolicyOfSection = createAsyncThunk('sectionPolicyOfSections/create', async (sectionPolicyOfSectionData) => {
  const response = await axios.post(`${API_BASE_URL}`, sectionPolicyOfSectionData);
  return response.data;
});

export const fetchSectionPolicyOfSectionById = createAsyncThunk('sectionPolicyOfSections/fetchById', async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
});

export const updateAllSectionPolicyToSection = createAsyncThunk(
  'sectionPolicyOfSections/updateAllSectionPolicyToSection',
  async (updatedSectionPolicyOfSectionsData) => {
    const response = await axios.post(`${API_BASE_URL}/UpdateAllSectionPolicyToSection`, updatedSectionPolicyOfSectionsData);
    return response.data;
  }
);
const sectionPolicyOfSectionsSlice = createSlice({
  name: 'sectionPolicyOfSections',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectionPolicyOfSections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSectionPolicyOfSections.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSectionPolicyOfSections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createSectionPolicyOfSection.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(fetchSectionPolicyOfSectionById.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateAllSectionPolicyToSection.fulfilled, (state, action) => {
        state.status = 'succeeded';
       
      });
  },
});

export default sectionPolicyOfSectionsSlice.reducer;
