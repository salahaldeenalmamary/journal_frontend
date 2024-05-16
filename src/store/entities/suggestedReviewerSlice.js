import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import config from "../../config.json";
import http from "../../services/httpService";
const { apiUrl } = config;

const initialState = {
  suggestedReviewers: [],
  status: 'idle',
  error: null
};


export const fetchAllSuggestedReviewers = createAsyncThunk(
  'suggestedReviewers/fetchAll',
  async () => {
    try {
      const response = await http.get(`${apiUrl}/SuggestedReviewer`);
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }
);

export const fetchSuggestedReviewerById = createAsyncThunk(
  'suggestedReviewers/fetchById',
  async (id) => {
    try {
      const response = await http.get(`${apiUrl}/SuggestedReviewer/${id}`);
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }
);

export const GetBySubmissionId = createAsyncThunk(
    'suggestedReviewers/getBySubmissionId',
    async (submissionId) => {
      try {
        const response = await http.get(`${apiUrl}/SuggestedReviewer/submission/${submissionId}`);
        return response.data;
      } catch (error) {
        throw Error(error.response.data);
      }
    }
  );
  
export const createSuggestedReviewer = createAsyncThunk(
  'suggestedReviewers/create',
  async (suggestedReviewerDto) => {
    try {
      const response = await http.post(`${apiUrl}/SuggestedReviewer`, suggestedReviewerDto);
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }
);

export const updateSuggestedReviewer = createAsyncThunk(
  'suggestedReviewers/update',
  async ({ id, suggestedReviewerDto }) => {
    try {
      const response = await http.put(`${apiUrl}/SuggestedReviewer/${id}`, suggestedReviewerDto);
      return response.data;
    } catch (error) {
      throw Error(error.response.data);
    }
  }
);

export const deleteSuggestedReviewer = createAsyncThunk(
  'suggestedReviewers/delete',
  async (id) => {
    try {
      await http.delete(`${apiUrl}/SuggestedReviewer/${id}`);
      return id;
    } catch (error) {
      throw Error(error.response.data);
    }
  }
);


// Create the slice
const suggestedReviewerSlice = createSlice({
  name: 'suggestedReviewers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSuggestedReviewers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSuggestedReviewers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suggestedReviewers = action.payload;
      })
      .addCase(fetchAllSuggestedReviewers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }).addCase(GetBySubmissionId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetBySubmissionId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suggestedReviewers = action.payload;
      })
      .addCase(GetBySubmissionId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSuggestedReviewerById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSuggestedReviewerById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suggestedReviewers = [action.payload];
      })
      .addCase(fetchSuggestedReviewerById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createSuggestedReviewer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSuggestedReviewer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suggestedReviewers.push(action.payload);
      })
      .addCase(createSuggestedReviewer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateSuggestedReviewer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSuggestedReviewer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.suggestedReviewers.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.suggestedReviewers[index] = action.payload;
        }
      })
      .addCase(updateSuggestedReviewer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteSuggestedReviewer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSuggestedReviewer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suggestedReviewers = state.suggestedReviewers.filter(s => s.id !== action.payload);
      })
      .addCase(deleteSuggestedReviewer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// Export actions and reducer
export const { } = suggestedReviewerSlice.actions;
export default suggestedReviewerSlice.reducer;
