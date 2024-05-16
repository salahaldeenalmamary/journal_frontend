// apiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import config from "../../config.json";
import { useApiWithMessage } from '../../common/Notification';
import http from "../../services/httpService";
const { apiUrl } = config;


export const fetchReviewAssignment = createAsyncThunk('api/fetchReviewAssignment', async () => {
  try {
    const response = await http.get(`${apiUrl}/ReviewAssignment`);
console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchPendingReviewAssignment = createAsyncThunk('api/fetchPendingReviewAssignment', async () => {
  try {
    const response = await http.get(`${apiUrl}/ReviewAssignment/pending`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchCompleteReviewAssignment = createAsyncThunk('api/fetchCompleteReviewAssignment', async () => {
  try {
    const response = await http.get(`${apiUrl}/ReviewAssignment/complete`);
    console.log( response.data);
    return response.data;
    
  } catch (error) {
    throw error;
  }
});



export const AcceptReviewAssignment = createAsyncThunk(
  'reviewAssignment/acceptStatus',
  async (statusDto,thunkAPI) => {
    const { callApi } = useApiWithMessage(); 
console.log(statusDto);
    try {
      return await callApi(
       
        async () => {
          
            const response = await http.patch(
              `${apiUrl}/ReviewAssignment/Accept`,
              statusDto
            );
            return response.data;
      },
       
        'Inviting reviewers after selection...',
 
    
      );
    } catch (error) {
    
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const RejectReviewAssignment = createAsyncThunk(
  'reviewAssignment/Reject',
  async ({ statusDto }, { rejectWithValue }) => {
    try {
      const response = await http.patch(
        `${apiUrl}/ReviewAssignment/Reject`,
        statusDto
      
        
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const ReviewerSlice = createSlice({
  name: 'api',
  initialState: {
    data: [],
    loading: false,
    loading2: false,
    Message:''
   
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviewAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchReviewAssignment.rejected, (state) => {
        state.loading = false;
      })
     
      .addCase(fetchPendingReviewAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingReviewAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPendingReviewAssignment.rejected, (state) => {
        state.loading = false;
      })
    
      .addCase(fetchCompleteReviewAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompleteReviewAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(AcceptReviewAssignment.rejected, (state) => {
        state.loading = false;
      })
    
      .addCase(AcceptReviewAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(AcceptReviewAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.Message = action.payload.message;
      })
      .addCase(RejectReviewAssignment.rejected, (state) => {
         state.loading = false;
      })
    
      .addCase(RejectReviewAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(RejectReviewAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.Message = action.payload.message;
      })
     
  },
});

export default ReviewerSlice.reducer;
