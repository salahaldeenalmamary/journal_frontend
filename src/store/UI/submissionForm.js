import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getSubmissionTypes } from "../../services/submissionTypesService";
import {
  addSubmissionWithType,
  getSubmissionById,
  getSubmissions,
  updateSubmission,
} from "../../services/submissionsService";
import { uploadFile } from "../../services/fileService";
const steps = [
  {
    status: "process",
    title: "Article Type",
    stepFelids: [{ felidName: "typeId", isRequired: true, isValid: false }],
    isRequired: true,
    isValid: false,
  },

  {
    status: "locked",
    title: "Attach Files",
    stepFelids: [
      { felidName: "attachments", isRequired: true, isValid: false },
    ],
    isRequired: true,
    isValid: false,
  },

  {
    status: "locked",
    title: "General Information",
    stepFelids: [
      { felidName: "region", isRequired: false, isValid: false },
      { felidName: "sectionId", isRequired: true, isValid: false },
    ],
    isRequired: true,
    isValid: false,
  },

  {
    status: "locked",
    title: "Review Preferences",
    stepFelids: [
      { felidName: "requestedEditor", isRequired: true, isValid: false },
      { felidName: "suggestedReviewers", isRequired: true, isValid: false },
      { felidName: "opposedReviewers", isRequired: false, isValid: false },
    ],
    isRequired: true,
    isValid: false,
  },
  // unwanted step
  // {
  //   status: "locked",
  //   title: "Additional Information",
  //   stepFelids: [{ felidName: "", isRequired: true, isValid: false }],
  //   isRequired: true,
  //   isValid: false,
  // },
  {
    status: "locked",
    title: "Comments",
    stepFelids: [{ felidName: "comments", isRequired: false, isValid: false }],
    isRequired: false,
    isValid: false,
  },
  {
    status: "wait",
    title: "Manuscript Data",
    stepFelids: [
      { felidName: "title", isRequired: true, isValid: false },
      { felidName: "abstract", isRequired: true, isValid: false },
      { felidName: "keywords", isRequired: true, isValid: false },
      { felidName: "coAuthors", isRequired: true, isValid: false },
    ],
    isRequired: true,
    isValid: false,
  },
];
// submission model
// abstract: null;
// attachments: [];
// coAuthors: [];
// createdDate: null;
// decisionDate: null;
// id: 90;
// region: null;
// sectionId: null;
// stageDate: null;
// stageId: 1;
// step: 1;
// submitDate: null;
// subtitle: null;
// suggestedReviewers: [];
// title: null;
// typeId: 2;
const initialState = {
  steps,
  activeStep: 0,
  submission: {},
  articleType: {}, //delete later
  articleFiles: [], //delete later
  classifications: [], //
  subtitle: "", //what is that?
  isSuccess: false,
  isLoading: false,
  isError: false,
  errorMsg: "",
};
const sliceName = "SubmissionForm";
const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    submissionReset: (state) => {
      state.activeStep = 0;
      state.submission = {};
      state.steps = steps;
      // state.isSuccess = true;
    },
    submissionEdited: (state) => {
      const { steps, submission } = state;
      state.steps = steps.map((step, index) => {
        step.stepFelids = step.stepFelids.map((field) => {
          const { felidName, isRequired } = field;
          if (isRequired) {
            console.log(submission[felidName]);
            if (Array.isArray(submission[felidName])) {
              return { ...field, isValid: true };
            } else if (
              Number(submission[felidName]) &&
              Number(submission[felidName]) > 0
            ) {
              return { ...field, isValid: true };
            } else if (Boolean(submission[felidName])) {
              return { ...field, isValid: true };
            } else {
              return { ...field, isValid: false };
            }
          }
          return { ...field, isValid: true };
        });
        step.isValid = step.stepFelids.every((field) => field.isValid);
        if (index === submission.step - 1) step.status = "process";
        else if (step.isValid) step.status = "finish";
        else step.status = "error";

        return step;
      });
      state.activeStep = submission.step ? submission.step - 1 : 0;
    },
    stepChanged: (state, step) => {
      const oldStep = { ...state.steps[state.activeStep] };
      if (oldStep.isRequired) {
        oldStep.isValid = oldStep.stepFelids.every((f) => {
          if (f.isRequired) return f.isValid;
          return true;
        });
        if (!oldStep.isValid) oldStep.status = "error";
        else oldStep.status = "finish";
      } else {
        oldStep.status = "finish";
      }
      state.steps = state.steps.map((s, i) =>
        i === state.activeStep ? oldStep : s
      );
      const newStep = { ...state.steps[step.payload] };
      newStep.status = "process";
      state.steps = state.steps.map((s, i) =>
        i === step.payload ? newStep : s
      );
      state.activeStep = step.payload;
      state.submission.step = step.payload + 1;
    },
    articleTypeChanged: (state, { payload }) => {
      const typeStep = { ...state.steps[state.activeStep] };
      if (typeStep.isRequired) {
        typeStep.stepFelids = typeStep.stepFelids.map((f) => {
          if (f.felidName === "typeId") {
            f.isValid = payload.value ? true : false;
          }
          return f;
        });
        state.steps = state.steps.map((s, i) =>
          i === state.activeStep ? typeStep : { ...s, status: "unvisited" }
        );
      }
      state.submission.typeId = payload.value;
      state.articleType = payload;
    },
    fileUploaded: (state, { payload }) => {
      const typeStep = { ...state.steps[state.activeStep] };
      if (typeStep.isRequired) {
        typeStep.stepFelids = typeStep.stepFelids.map((f) => {
          if (f.felidName === "attachments") {
            f.isValid = payload.length ? true : false;
          }
          return f;
        });
        state.steps = state.steps.map((s, i) =>
          i === state.activeStep ? typeStep : s
        );
      }
      state.submission.attachments = payload;
      state.articleFiles = payload;
    },
    regionSelected: (state, { payload }) => {
      const typeStep = { ...state.steps[state.activeStep] };
      if (typeStep.isRequired) {
        typeStep.stepFelids = typeStep.stepFelids.map((f) => {
          if (f.felidName === "region") {
            f.isValid = payload ? true : false;
          }
          return f;
        });
        state.steps = state.steps.map((s, i) =>
          i === state.activeStep ? typeStep : s
        );
      }
      state.submission.region = payload;
    },
    sectionSelected: (state, { payload }) => {
      const typeStep = { ...state.steps[state.activeStep] };
      if (typeStep.isRequired) {
        typeStep.stepFelids = typeStep.stepFelids.map((f) => {
          if (f.felidName === "sectionId") {
            f.isValid = payload ? true : false;
          }
          return f;
        });
        state.steps = state.steps.map((s, i) =>
          i === state.activeStep ? typeStep : s
        );
      }
      state.submission.sectionId = payload;
    },
    reviewersSuggested: (state, { payload }) => {
      const { suggestedReviewers } = state.submission;
      const typeStep = { ...state.steps[state.activeStep] };
      if (typeStep.isRequired) {
        typeStep.stepFelids = typeStep.stepFelids.map((f) => {
          if (f.felidName === "suggestedReviewers") {
            f.isValid = payload.length ? true : false;
          }
          return f;
        });

        state.steps = state.steps.map((s, i) =>
          i === state.activeStep ? typeStep : s
        );
      }
      const newReviewers = payload.map((r) => {
        return { ...r, isSuggested: true, submissionId: state.submission.id };
      });
      state.submission.suggestedReviewers = [
        ...newReviewers,
        ...suggestedReviewers,
      ];
      // state.submission.suggestedReviewers = payload;
    },
    reviewersOpposed: (state, { payload }) => {
      const { suggestedReviewers } = state.submission;
      const typeStep = { ...state.steps[state.activeStep] };
      if (typeStep.isRequired) {
        typeStep.stepFelids = typeStep.stepFelids.map((f) => {
          if (f.felidName === "opposedReviewers") {
            f.isValid = payload.length ? true : false;
          }
          return f;
        });
        state.steps = state.steps.map((s, i) =>
          i === state.activeStep ? typeStep : s
        );
      }
      const newReviewers = payload.map((r) => {
        return { ...r, isSuggested: false, submissionId: state.submission.id };
      });
      state.submission.suggestedReviewers = [
        ...suggestedReviewers,
        ...newReviewers,
      ];
      // state.submission.opposedReviewers = payload;
    },
    editorRequested: (state, { payload }) => {
      const typeStep = { ...state.steps[state.activeStep] };
      if (typeStep.isRequired) {
        typeStep.stepFelids = typeStep.stepFelids.map((f) => {
          if (f.felidName === "requestedEditor") {
            f.isValid = payload.value ? true : false;
          }
          return f;
        });
        state.steps = state.steps.map((s, i) =>
          i === state.activeStep ? typeStep : s
        );
      }
      state.submission.requestedEditor = payload;
    },
    commentsAdded: (state, { payload }) => {
      const typeStep = { ...state.steps[state.activeStep] };
      if (typeStep.isRequired) {
        typeStep.stepFelids = typeStep.stepFelids.map((f) => {
          if (f.felidName === "comments") {
            f.isValid = payload ? true : false;
          }
          return f;
        });
        state.steps = state.steps.map((s, i) =>
          i === state.activeStep ? typeStep : s
        );
      }
      state.submission.comments = payload;
    },
    titleAdded: (state, { payload }) => {
      const typeStep = { ...state.steps[state.activeStep] };
      if (typeStep.isRequired) {
        typeStep.stepFelids = typeStep.stepFelids.map((f) => {
          if (f.felidName === "title") {
            f.isValid = payload.title ? true : false;
          }
          return f;
        });
        state.steps = state.steps.map((s, i) =>
          i === state.activeStep ? typeStep : s
        );
      }
      state.submission.title = payload.title;
      state.submission.titleString = payload.titleString;
    },
    abstractAdded: (state, { payload }) => {
      console.log(payload);
      const typeStep = { ...state.steps[state.activeStep] };
      if (typeStep.isRequired) {
        typeStep.stepFelids = typeStep.stepFelids.map((f) => {
          if (f.felidName === "abstract") {
            f.isValid = payload.abstract ? true : false;
          }
          return f;
        });
        state.steps = state.steps.map((s, i) =>
          i === state.activeStep ? typeStep : s
        );
      }
      state.submission.abstract = payload.abstract;
      state.submission.AbstractString = payload.AbstractString;
    },
    keywordsAdded: (state, { payload }) => {
      const typeStep = { ...state.steps[state.activeStep] };
      if (typeStep.isRequired) {
        typeStep.stepFelids = typeStep.stepFelids.map((f) => {
          if (f.felidName === "keywords") {
            f.isValid = payload.length ? true : false;
          }
          return f;
        });
        state.steps = state.steps.map((s, i) =>
          i === state.activeStep ? typeStep : s
        );
      }
      state.submission.keywords = payload;
    },
    coAuthorsAdded: (state, { payload }) => {
      const typeStep = { ...state.steps[state.activeStep] };
      if (typeStep.isRequired) {
        typeStep.stepFelids = typeStep.stepFelids.map((f) => {
          if (f.felidName === "coAuthors") {
            f.isValid = payload.length ? true : false;
          }
          return f;
        });
        state.steps = state.steps.map((s, i) =>
          i === state.activeStep ? typeStep : s
        );
      }
      state.submission.coAuthors = payload;
    },
    classificationsSelected: (state, classifications) => {
      state.classifications = classifications.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmissionTypes.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMsg = "";
        // state.submission.id = action.payload;
        console.log(action.payload);
      })
      .addCase(submissionTypeSelected.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.response) {
          if (payload.response.status === 401) {
            state.isError = true;
            state.isSuccess = false;
            state.errorMsg = payload.message;
          }
          return;
        }
        state.isError = false;
        state.isSuccess = true;
        state.errorMsg = "";
        console.log(payload);
        state.submission.id = payload;
      })
      .addCase(submissionTypeChanged.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.response) {
          if (payload.response.status === 401) {
            state.isError = true;
            state.isSuccess = false;
            state.errorMsg = payload.message;
          }
          return;
        }
        state.isError = false;
        state.isSuccess = true;
        state.errorMsg = "";
        console.log(payload);
        state.submission.typeId = state.articleType.value;
      })
      .addCase(submissionFileUploaded.fulfilled, (state, { payload }) => {
        console.log(payload);
        if (payload.response) {
          if (payload.response.status === 401) {
            state.isError = true;
            state.isSuccess = false;
            state.errorMsg = payload.message;
          }
          return;
        }
        state.isError = false;
        state.isSuccess = true;
        state.errorMsg = "";
        // state.submission.attachments = payload;
      })
      .addCase(fetchSubmissionById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.response) {
          if (payload.response.status === 401) {
            state.isError = true;
            state.isSuccess = false;
            state.errorMsg = payload.message;
          }
          return;
        }
        state.isError = false;
        state.isSuccess = true;
        state.errorMsg = "";
        state.submission = payload;
        // state.steps.map((step) => {
        //   step.stepFelids.map((filed) => {
        //     console.log(
        //       typeof state.submission[filed.felidName],
        //       filed.felidName
        //     );
        //   });
        // });
      })
      .addMatcher(
        (action) =>
          [
            fetchSubmissionTypes.pending,
            submissionTypeSelected.pending,
            submissionFileUploaded.pending,
            fetchSubmissionById.pending,
            submissionTypeChanged.pending,
          ].includes(action.type),
        (state) => {
          state.isError = false;
          state.isLoading = true;
          state.isSuccess = false;
          state.errorMsg = "";
        }
      )
      .addMatcher(
        (action) =>
          [
            fetchSubmissionTypes.rejected,
            submissionTypeSelected.rejected,
            submissionFileUploaded.rejected,
            fetchSubmissionById.rejected,
            submissionTypeChanged.rejected,
          ].includes(action.type),
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
        }
      );
  },
});
export const fetchSubmissionByStatus = createAsyncThunk(
  `${sliceName}/fetchSubmissionByStatus`,
  async (status) => {
    try {
      const { data } = await getSubmissions();
      console.log(data);
    } catch (ex) {}
  }
);
export const fetchSubmissionById = createAsyncThunk(
  `${sliceName}/fetchSubmissionById`,
  async (id) => {
    try {
      console.log(id);
      const { data } = await getSubmissionById(id);
      return data;
    } catch (ex) {
      return ex;
    }
  }
);
export const fetchSubmissionTypes = createAsyncThunk(
  `${sliceName}/fetchSubmissionTypes`,
  async () => {
    try {
      const response = await getSubmissionTypes();
      return response.data;
    } catch (ex) {
      console.log(ex);
    }
  }
);
export const submissionTypeSelected = createAsyncThunk(
  `${sliceName}/submissionTypeSelected`,
  async (typeId) => {
    try {
      const response = await addSubmissionWithType(typeId);
      return response.data;
    } catch (ex) {
      console.log(ex);
      return ex;
    }
  }
);

export const submissionTypeChanged = createAsyncThunk(
  `${sliceName}/submissionTypeChanged`,
  async (typeId, state) => {
    try {
      debugger;
      const submission = { ...state.getState().UIS.submissionForm.submission };
      const response = await updateSubmission(submission.id, {
        typeId,
        step: 1,
      });
      return response.data;
    } catch (ex) {
      console.log(ex);
      return ex;
    }
  }
);
export const submissionUpdated = createAsyncThunk(
  `${sliceName}/submissionUpdated`,
  async (_, state) => {
    try {
      const { submission, activeStep } = {
        ...state.getState().UIS.submissionForm,
      };
      console.log(submission);
      const resp = await updateSubmission(submission.id, {
        ...submission,
        step: activeStep + 1,
      });
      return resp.data;
    } catch (ex) {
      return ex.response;
    }
  }
);
export const submissionFileUploaded = createAsyncThunk(
  `${sliceName}/submissionFileUploaded`,
  async ({ fileDetails, file }, state) => {
    try {
      if (file) {
        // const fileForm = new FormData();
        // fileForm.append("file", file);
        // console.log("fileForm: ", fileForm);

        state.dispatch(fileUploaded([{ ...fileDetails, fileId }]));
      } else {
        state.dispatch(fileUploaded([{ ...fileDetails }]));
      }

      const submission = { ...state.getState().UIS.submissionForm.submission };
      console.log(submission);
      const resp = await updateSubmission(submission.id, submission);
      return resp.data;
    } catch (ex) {
      return ex.response;
    }
  }
);
export const {
  articleTypeChanged,
  classificationsSelected,
  commentsAdded,
  editorRequested,
  fileUploaded,
  regionSelected,
  reviewersOpposed,
  reviewersSuggested,
  sectionSelected,
  stepChanged,
  stepsUpdated,
  titleAdded,
  abstractAdded,
  keywordsAdded,
  coAuthorsAdded,
  submissionReset,
  submissionEdited,
} = slice.actions;

export default slice.reducer;
