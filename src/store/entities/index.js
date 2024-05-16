import { combineReducers } from "redux";
import submissionsReducer from "./submissions";
import permissionsReducer from "./permissions";
import rolesReducer from "./roles";
import submissionDetailsReducer from "./submissionDetails";
import ReviewerReducer from "./ReviewerSlice";
import manuscriptSlice from "./recommendationSlice";
import emailSlice from "./emailSlice";
import fileSlice from './files';
import editorreviewerSlice from "./editorreviewerSlice";
import classificationSlice from './classification';
import messageTemplateSlice from "./messageTemplate";
import attachmentsSlice from "./attachmentsSlice";
import suggestedReviewerSlice from "./suggestedReviewerSlice";
export default combineReducers({
  submissions: submissionsReducer,
  Permissions: permissionsReducer,
  Roles: rolesReducer,
  Email:emailSlice,
  SelectedReviwer:editorreviewerSlice,
  recommendation:manuscriptSlice,
  ReviewerAssignment:ReviewerReducer,
  SubmissionDetails: submissionDetailsReducer,
  File:fileSlice,
  attatchment:attachmentsSlice,
  messageTemplate:messageTemplateSlice,
  classifications:classificationSlice,
  suggestedReviewers:suggestedReviewerSlice
  
});
