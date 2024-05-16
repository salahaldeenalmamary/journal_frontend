import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from "../../config.json";

import http from "../../services/httpService";
// Then use it like this
const {apiUrl} = config;
const initialState = {
  attachments: [],
  Idattatchment:0,
  loading: false,
  error: null,
};

export const fetchAttachments = createAsyncThunk(
  'attachments/fetchAttachments',
  async () => {
    const response = await http.get(`${apiUrl}/Attachments`);
    return response.data;
  }
);

export const GetAttachment = createAsyncThunk(
  'attachments/fetchAttachment',
  async (attachmentId) => {
    const response = await http.get(`${apiUrl}/Attachments/Attachment/${attachmentId}`);
    return response.data;
  }
);


export const createAttachment = createAsyncThunk(
  'attachments/createAttachment',
  async (attachmentDto) => {
    const response = await http.post(`${apiUrl}/Attachments`, attachmentDto);
    return response.data;
  }
);

export const updateAttachment = createAsyncThunk(
  'attachments/updateAttachment',
  async (attachmentDto) => {
    const response = await http.put(`${apiUrl}/Attachments/${attachmentDto.id}`, attachmentDto);
    return response.data;
  }
);

export const deleteAttachment = createAsyncThunk(
  'attachments/deleteAttachment',
  async (id) => {
    await http.delete(`${apiUrl}/Attachments/${id}`);
    return id;
  }
);

const attachmentsSlice = createSlice({
  name: 'attachments',

  initialState,
  reducers: {
    SetClearattachments:(state,action)=>{
      state.attachments=[];
    },
  }, // No additional reducers needed in this case
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttachments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttachments.fulfilled, (state, action) => {
        state.loading = false;
        state.attachments=[];
        state.attachments = action.payload;
      })
      .addCase(fetchAttachments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createAttachment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAttachment.fulfilled, (state, action) => {
        state.loading = false;
        state.Idattatchment=action.payload;
        state.attachments.push(action.payload);
      })
      .addCase(createAttachment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })   .addCase(GetAttachment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAttachment.fulfilled, (state, action) => {
        state.loading = false;
        state.attachments=[];
        state.attachments.push(action.payload);
      })
      .addCase(GetAttachment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateAttachment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAttachment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.attachments.findIndex((a) => a.id === action.payload.id);
        state.attachments[index] = action.payload; 
      })
      .addCase(updateAttachment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAttachment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAttachment.fulfilled, (state, action) => {
        state.loading = false;
        state.attachments = state.attachments.filter((a) => a.id !== action.payload); // Remove deleted attachment
      })
      .addCase(deleteAttachment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default attachmentsSlice.reducer;

export const { SetClearattachments } = attachmentsSlice.actions;
