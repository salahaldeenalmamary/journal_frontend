// store.js
import { configureStore } from '@reduxjs/toolkit';
import SubmissionSlice from './Submission/submissionsSlice'; 
import rolesSlice from './Role/rolesSlice';
import reviewAssignmentSlice from './ReviewAssignment/reviewAssignmentSlice';
import authSlice from './Authentication/authSlice.js';
import sectionPolicyOfSectionsSlice from './SectionPolicyOfSections/sectionPolicyOfSectionsSlice.js';
import sectionPoliciesSlice from './SectionPolicy/sectionPoliciesSlice.js';
import stagesSlice from './Stage/stagesSlice.js';
import categoriesSlice from './Category/categoriesSlice.js';

const store = configureStore({
  reducer: {
    roles:rolesSlice,
    auth:authSlice,
    reviewAssignments:reviewAssignmentSlice,
    submissions: SubmissionSlice,
    stages:stagesSlice,
    sectionPolicies:sectionPoliciesSlice,
    categories:categoriesSlice,
    sectionPolicyOfSections:sectionPolicyOfSectionsSlice

  
  },
});

export default store;
