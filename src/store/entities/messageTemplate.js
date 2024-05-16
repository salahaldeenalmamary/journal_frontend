import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import config from "../../config.json";
const { apiUrl } = config;
import http from "../../services/httpService";
const initialState = {
  messageTemplates: [],
  loading: false,
  error: null,
};

export const fetchmessageTemplate = createAsyncThunk(
  'messageTemplate/MessageTemplate',
  async () => {
    const response = await http.get(`${apiUrl}/MessageTemplate`);
    return response.data;
  }
);

const messageTemplateSlice = createSlice({
    name: 'messageTemplate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchmessageTemplate.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchmessageTemplate.fulfilled, (state, action) => {
          state.loading = false;
          state.messageTemplates = action.payload;
        })
        .addCase(fetchmessageTemplate.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  

export default messageTemplateSlice.reducer;


export const { } = messageTemplateSlice.actions;
