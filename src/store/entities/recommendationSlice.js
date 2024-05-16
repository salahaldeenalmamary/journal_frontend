

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../../config.json";
import http from "../../services/httpService";
// Then use it like this
const { apiUrl } = config;
export const createReviewResult = createAsyncThunk('review/sendReviewResult', async (reviewResultData) => {
  try {
    const response = await axios.post(`${apiUrl}/ReviewResult`, reviewResultData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});




export const uploadFile = createAsyncThunk('file/uploadFile', async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${apiUrl}/File/UploadFile`,
      formData,

    );
    console.log(file);
    if (!response.ok) {
      const errorData = await response.data;
      console.log(errorData);
      return errorData;
    }

    const responseData = await response.data;

    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const fetchReviewResultById = createAsyncThunk(
  'review/fetchReviewResultById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${apiUrl}/ReviewResult/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const manuscriptSlice = createSlice({
  name: 'manuscript',
  initialState: {
    reviewResults: {
      id: 0,
      authorNote: "string",
      editorNote: "string",
      evaluation: "string",
      isWilling: true,
      fileId: 0,
      recommendation: "string",
      percentileRating: 0,
    reviewAssignmentId: 0,
      state: true
    },
    fileUpload: 0,
    file: null,
    recommendation: 'No Recommendation',
    overallRating: 0,
    fileList: [],
    willingToReview: null,
    overallRating: 0,
    expeditedDecision: null,
    reviewerCommentsToAuthor: '',
    reviewerCommentsToEditor: '',
    transferConsentInfo: null,
    transferConsentReview: null,
    error: null,
    loading: false,
    message:'',
  },
  reducers: {

    setRecommendation: (state, action) => {
      state.recommendation = action.payload;
    },
    setOverallRating: (state, action) => {
      state.overallRating = action.payload;
    },
    setFileList: (state, action) => {
      state.fileList = action.payload;
    },
    incrementOverallRating: (state) => {
      state.overallRating = Math.min(state.overallRating + 1, 100);
    },
    decrementOverallRating: (state) => {
      state.overallRating = Math.max(state.overallRating - 1, 0);
    },
    handleViewerAttachments: (state) => {
      console.log('Viewer Attachments action');
    },
    handleProofAndPrint: (state) => {
      console.log('Proof & Print action');
    },
    handleProcessCancel: (state) => {
      console.log('Process Cancel action');
    },
    handleSave: (state) => {
      console.log('Save action');
    },
    setWillingToReview: (state, action) => {
      state.willingToReview = action.payload;
    },
    setOverallRating: (state, action) => {
      state.overallRating = action.payload;
    },
    setExpeditedDecision: (state, action) => {
      state.expeditedDecision = action.payload;
    },
    setReviewerCommentsToAuthor: (state, action) => {
      state.reviewerCommentsToAuthor = action.payload;
    },
    setReviewerCommentsToEditor: (state, action) => {
      state.reviewerCommentsToEditor = action.payload;
    },
    setTransferConsentInfo: (state, action) => {
      state.transferConsentInfo = action.payload;
    },
    setfile: (state, action) => {
      console.log(action.payload);
      state.file = action.payload;
     
      if ( state.fileList.length==0) {
        state.fileList.push(action.payload);
      }
      else{
        state.fileList.pop();
        state.fileList.push(action.payload);
      }


      
    },
    setStateToClear: (state) => {
      state.overallRating='';
      state.recommendation='';
      state.reviewResults=null;
      if (state.fileList.length!==0) {
        state.fileList.pop();

      }

    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(createReviewResult.pending, (state) => {

        state.loading = true;
      })
      .addCase(createReviewResult.fulfilled, (state, action) => {
        state.loading = false;
        // state.reviewResult = action.payload;
        state.message =action.payload.message ;
      })
      .addCase(createReviewResult.rejected, (state, action) => {
        state.loading = false;
        state.message =action.payload.message ;
      }).addCase(uploadFile.pending, (state) => {

        state.loading = false;
        



      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = true;
        state.fileUpload = action.payload.data
        console.log('file' + action.payload.data);
      })
      .addCase(uploadFile.rejected, (state, action) => {


      }).addCase(fetchReviewResultById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewResultById.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewResults = action.payload.data;
      })
      .addCase(fetchReviewResultById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });;
  },


});

export const {
  setRecommendation,
  setOverallRating,
  setFileList,
  incrementOverallRating,
  decrementOverallRating,
  handleViewerAttachments,
  handleProofAndPrint,
  handleProcessCancel,
  handleSave,
  setWillingToReview,

  setExpeditedDecision,
  setReviewerCommentsToAuthor,
  setReviewerCommentsToEditor,
  setTransferConsentInfo,
  setfile,
  setStateToClear
} = manuscriptSlice.actions;

export const selectRecommendation = (state) => state.manuscript.recommendation;
export const selectOverallRating = (state) => state.manuscript.overallRating;
export const selectFileList = (state) => state.manuscript.fileList;

export default manuscriptSlice.reducer;
