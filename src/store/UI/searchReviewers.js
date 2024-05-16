import { createSlice } from "@reduxjs/toolkit";

const searchCriteria = [
  {
    rowNo: 1,
    attribute: "",
    condition: "",
    selector: "",
    value: "",
    isInclusive: true,
    combineOperator: "AND",
  },
];

const initialState = {
  searchCriteria,
  targetKeys: [],
  byclassfication:false,
  byuserid:false,
  searchin: 3,
  selectedUserIds:[],
};

const slice = createSlice({
  name: "SearchReviewers",
  initialState,
  reducers: {
    criteriaUpdated: (state, action) => {
      state.searchCriteria = action.payload;
      state.targetKeys =[];
      state.byclassfication=false;
      state.byuserid=false;
    },
    targetKeysUpdated: (state, action) => {
      state.targetKeys = action.payload;
      console.log( state.targetKeys.length);
      state.byclassfication=true;
      state.byuserid=false;
      state.searchCriteria =[];
    },
    Setsearchin: (state, action) => {
      state.searchin=action.payload;
    },
    addSelectedUserId: (state, action) => {
      state.selectedUserIds.push(action.payload);
    },
    removeSelectedUserId: (state, action) => {
      state.selectedUserIds = state.selectedUserIds.filter(id => id !== action.payload);
    },
    clearSelectedUserIds: (state) => {
      state.selectedUserIds = [];
    },
    IsSelectedUserIds: (state) => {
      state.byuserid=true;
    },
   
  },
 
});

export const { criteriaUpdated, targetKeysUpdated,Setsearchin, addSelectedUserId, removeSelectedUserId, clearSelectedUserIds , IsSelectedUserIds } = slice.actions;

export default slice.reducer;
