import { createSlice } from '@reduxjs/toolkit';

const reviewerSlice = createSlice({
  name: 'reviewersui',
  initialState: {
    reviewers: [],
    submissionId: '',
    selectedReviewer: {}, 
    messgeTemp:{id:0 ,name:""},
  },
  reducers: {
    addReviewer(state, action) {
    
      const existingReviewerIndex = state.reviewers.findIndex(reviewer => reviewer.userid === action.payload.userid);
      if (existingReviewerIndex === -1) {
        state.reviewers.push(action.payload);
      } else {
        // state.reviewers[existingReviewerIndex] = action.payload;
      }
    },
    // setSelectedReviewerInviteData(state, action) {
    //   state.selectedReviewerInviteData = action.payload;
    // },
    deleteReviewer(state, action) {
      state.reviewers = state.reviewers.filter(reviewer => reviewer.userid !== action.payload);
    },
    updateReviewer(state, action) {
      const { userid, updatedReviewer } = action.payload;
      const index = state.reviewers.findIndex(reviewer => reviewer.userid === userid);
      if (index !== -1) {
        state.reviewers[index] = { ...state.reviewers[index], ...updatedReviewer };
      }
    },
    setSubmissionId(state, action) {
      state.submissionId = action.payload;
      console.log(state.reviewers.length);
    },
    setmessgeTemp(state, action) {
      state.messgeTemp = action.payload;
      
    },
    clearReviewer(state) {
      state.reviewers = [];
    },
    clearselectedReviewer(state) {
      state.selectedReviewer = {};
    },
    getReviewerById(state, action) {
      const { userid } = action.payload;
    
      state.selectedReviewer = state.reviewers.find(reviewer => reviewer.userid === action.payload);
    
    console.log( state.reviewers.length);
    },
     

  }
});

export const { addReviewer, deleteReviewer, updateReviewer, setSubmissionId, getReviewerById ,setmessgeTemp, clearReviewer} = reviewerSlice.actions;
export default reviewerSlice.reducer;
