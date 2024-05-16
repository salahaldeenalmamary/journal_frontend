import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../../config.json";
import { useApiWithMessage } from '../../common/Notification';
// Then use it like this
const { apiUrl } = config;

export const downloadFile = createAsyncThunk(
  'file/download',
  async (fileId,  thunkAPI ) => {
    try {
      const { callApi } = useApiWithMessage(); 
      return await callApi(
        async () => {
         
          const response =await axios.get(`${apiUrl}/File/DownloadFile?id=${fileId}`, {
            responseType: 'blob', 
            
            
          });
          const { id, name, type,size } = response.data;
          console.log(response)
          return { id, name, size };
       ;
          
          
        },
        'Loading reviewer...',
        'Reviewer selection succeeded!',
      
      );
    
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Define the file slice
const fileSlice = createSlice({
  name: 'file',
  initialState: {
    downloading: false,
    downloadError: null,
    downloadedFileData: null, 
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(downloadFile.pending, state => {
        state.downloading = true;
        state.downloadError = null;
      })
      .addCase(downloadFile.fulfilled, (state, action) => {
        state.downloading = false;
        state.downloadedFileData = action.payload; 
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.downloading = false;
        console.log( action.payload);
        state.downloadError = action.payload;
      });
  },
});


export default fileSlice.reducer;
