import { createSlice } from "@reduxjs/toolkit";
let date = new Date("March 21, 2012");
const initialState = {
  transferInformation: {
    correspondingAuthor: "Mumin",
    correspondingAuthorEmail: "muminRashed@gmail.com",
    authorComments: "Please Accept",
    coAuthors: "Mutaz",
    articleType: "Full length Article",
    shortTitle: "Poem",
    abstract: "About palastain",
    sectionCategory: "Literature",
    keywords: "gaza ",
    classifications: "Well-spoken",
    fileInventory: "Inventory",
    requestedEditor: "Qadoor",
    initialDateSubmitted: date.toDateString(),
    currentEditorialStatus: "under review",
    editorialStatusDate: date.toDateString(),
    finalDispositionTerm: "",
    correspondingEditor: "",
    manuscriptNotes: "",
    manuscriptNotesCheck: false,
  },
  editors: [
    {
      name: "Qadoor",
      role: "Editor in Chief",
      dateAssign: date.toDateString(),
      dateCompleted: date.toDateString(),
      elapsedDays: "2",
      recommendation: "Accept",
    },
  ],
  currentReviewers: [
    {
      name: "doctor",
      reviewState: "",
      invitationDate: date.toDateString(),
      acceptationDate: date.toDateString(),
      duoDate: date.toDateString(),
      completeDate: date.toDateString(),
      elapsedDays: "",
      recommendation: "",
    },
  ],
  alternateReviewers: [
    {
      name: "",
      email: "",
    },
  ],
  proposedReviewersByEditors: [],
  suggestedReviewersByAuthor: [],
};

const slice = createSlice({
  name: "SubmissionDetails",
  initialState,
  reducers: {},
});

export const {} = slice.actions;

export default slice.reducer;
