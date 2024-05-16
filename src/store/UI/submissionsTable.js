import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortColumn: {
    path: "title",
    order: "asc",
  },
  pageSize: 4,
  currentPage: 1,
  toggleActions: true,
};

const slice = createSlice({
  name: "SubmissionsTable",
  initialState,
  reducers: {
    actionsToggled: (state) => {
      // console.log(state.toggleActions);
      state.toggleActions = !state.toggleActions;
    },
  },
});

export const { actionsToggled } = slice.actions;

export default slice.reducer;
