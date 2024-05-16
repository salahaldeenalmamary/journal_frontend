// // manuscriptSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   recommendation: 'No Recommendation',
//   overallRating: 0,
// };

// const manuscriptSlice = createSlice({
//   name: 'manuscript',
//   initialState,
//   reducers: {
//     setRecommendation: (state, action) => {
//       state.recommendation = action.payload;
//     },
//     setOverallRating: (state, action) => {
//       state.overallRating = action.payload;
//     },
//     resetManuscriptForm: (state) => {
//       return initialState;
//     },
//     viewerAttachmentsAction: () => {
//       console.log('Viewer Attachments action');
//     },
//     proofAndPrintAction: () => {
//       console.log('Proof & Print action');
//     },
//     processCancelAction: () => {
//       console.log('Process Cancel action');
//     },
//     saveAction: () => {
//       console.log('Save action');
//     },
//   },
// });

// export const {
//   setRecommendation,
//   setOverallRating,
//   resetManuscriptForm,
//   viewerAttachmentsAction,
//   proofAndPrintAction,
//   processCancelAction,
//   saveAction,
// } = manuscriptSlice.actions;
// export default manuscriptSlice.reducer;
