import { combineReducers } from "redux";
import submissionFormReducer from "./submissionForm";
import submissionsTableReducer from "./submissionsTable";
import rolesAndPermissionsTableReducer from "./rolesAndPermissions";
import SearchReviewersReducer from "./searchReviewers";
import   filtersReducer from './homefiltersSlice';

import reviewerSlice from './reviwersui';
export default combineReducers({
  submissionForm: submissionFormReducer,
  submissionsTable: submissionsTableReducer,
  RolesAndPermissionsTable: rolesAndPermissionsTableReducer,
  SearchReviewers: SearchReviewersReducer,
  homefilters: filtersReducer,
  // SelectedReviwerTable:SelectedReviwerTableslice,
  reviewerInvite:reviewerSlice
});
