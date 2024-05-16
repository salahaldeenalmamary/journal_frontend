import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import submission from "../../data/submission.json";
import {
  getSubmissionByAuthorId,
  getSubmissions,
} from "../../services/submissionsService";

const initialState = {
  list: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  errorMsg: "",
};
const sliceName = "submissions";
const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    submissionAdded: (submission, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.errorMsg = "";
        state.list = action.payload;
      })
      .addCase(fetchSubmissionByAuthorId.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.errorMsg = "";
          state.list = action.payload;
        }
      })
      .addMatcher(
        (action) =>
          [
            fetchSubmissions.pending,
            fetchSubmissionByAuthorId.pending,
          ].includes(action.type),
        (state) => {
          state.isError = false;
          state.isLoading = true;
          state.isSuccess = false;
        }
      )
      .addMatcher(
        (action) =>
          [
            fetchSubmissions.rejected,
            fetchSubmissionByAuthorId.rejected,
          ].includes(action.type),
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
        }
      );
  },
});
export const fetchSubmissions = createAsyncThunk(
  `${sliceName}/fetchSubmissions`,
  async () => {
    try {
      const res = await getSubmissions();

      return res.data;
    } catch (ex) {
      throw new Error(ex);
    }
  }
);
export const fetchSubmissionByAuthorId = createAsyncThunk(
  `${sliceName}/fetchSubmissionByAuthorId`,
  async (_, state) => {
    try {
      const user = { ...state.getState().auth.user };
      const { data } = await getSubmissionByAuthorId(user.id);
      return data;
    } catch (ex) {
      console.log(ex);
    }
  }
);
export const { submissionAdded } = slice.actions;

export default slice.reducer;

export const getDeclinedSubmissions = createSelector(
  (state) => state.entities.submissions,
  ({ list }) => list.filter((submission) => submission.status === "Declined")
);
export const getReviewSubmissions = createSelector(
  (state) => state.entities.submissions,
  ({ list }) => list.filter((submission) => submission.status === "Review")
);
export const getAcceptedSubmissions = createSelector(
  (state) => state.entities.submissions,
  ({ list }) => list.filter((submission) => submission.status === "Accepted")
);
