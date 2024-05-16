import { createSlice } from '@reduxjs/toolkit';
import http from "../../services/httpService";
export const emailSlice = createSlice({
  name: 'email',
  initialState: {
    from: '',
    to: '',
    purpose: '',
    subject: '',
    attachment: null,
    body: '',
  },
  reducers: {
    setFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFormData: (state) => {
      return {
        from: '',
        to: '',
        purpose: '',
        subject: '',
        attachment: null,
        body: '',
      };
    },
  },
});

export const { setFormData, resetFormData } = emailSlice.actions;

export const selectEmailFormData = (state) => state.email;

export default emailSlice.reducer;
