// reviewerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from "../../config.json";
import { useApiWithMessage } from '../../common/Notification';
import http from "../../services/httpService";

const { apiUrl } = config;

export const selectedReviewer = createAsyncThunk(
  'reviewer/selectedReviewer',
  async (reviewer, thunkAPI) => {
    const { callApi } = useApiWithMessage();
    try {
      return await callApi(
        async () => {
         
          const response = await http.post(`${apiUrl}/ReviewerSelected/selected`, reviewer);
          return response.data;
        },
        'Loading reviewer...',
        'Reviewer selection succeeded!',
      
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const selectedReviewerInvite = createAsyncThunk(
  'reviewer/selectedReviewer1',
  async (reviewer, thunkAPI) => {
    const { callApi } = useApiWithMessage();
    try {
      return await callApi(
        async () => {
         
          const response = await http.post(`${apiUrl}/ReviewerSelected/selected-invite`, reviewer);
          return response.data;
        },
        'Loading reviewer...',
       
      
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeselectedreviewers = createAsyncThunk(
  'reviewer/remove-selected-reviewers',
  async (reviewer, thunkAPI) => {
    const { callApi } = useApiWithMessage(); // Use the hook within the thunk

    try {
      return await callApi(
        // API call function
        async () => {
          const response = await http.post(`${apiUrl}/ReviewerSelected/remove-selected-reviewers`, reviewer);
          return response.data;
        },
      
        'Removing selected reviewers...',
     
        'Selected reviewers removed successfully!',
        
        'Failed to remove selected reviewers!'
      );
    } catch (error) {
      // Handle errors
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Define async thunk for inviting after selection
export const inviteAfterSelected = createAsyncThunk(
  'reviewer/inviteAfterSelected',
  async (dto, thunkAPI) => {
    const { callApi } = useApiWithMessage(); // Use the hook within the thunk

    try {
      return await callApi(
        // API call function
        async () => {
          console.log(dto);
          const response = await http.post(`${apiUrl}/ReviewerSelected/Invite`, dto
          );
          return response.data;
        },
       
        'Inviting reviewers after selection...',
        // Success message
    
      );
    } catch (error) {
    
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const Uninvite = createAsyncThunk(
  'reviewer/Uninvite',
  async (dto, thunkAPI) => {
    const { callApi } = useApiWithMessage(); // Use the hook within the thunk

    try {
      return await callApi(
       
        async () => {
          console.log(dto);
          const response = await http.post(`${apiUrl}/ReviewerSelected/Uninvite`, dto);
          return response.data;
        },
       
        'Inviting reviewers after selection...',
        // Success message
    
      );
    } catch (error) {
    
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const AlternatereviewerLinkInvite = createAsyncThunk(
  'reviewer/LinkInvite',
  async (linkInvite, thunkAPI) => {
    const { callApi } = useApiWithMessage(); // Use the hook within the thunk

    try {
      return await callApi(
       
        async () => {
          console.log(linkInvite);
          const response = await http.post(`${apiUrl}/ReviewerSelected/LinkInvite`, linkInvite
          );
          return response.data;
        },
       
        'Inviting reviewers after selection...',
        // Success message
    
      );
    } catch (error) {
    
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getReviewerDetails = createAsyncThunk(
  'reviewer/getReviewerDetails',
  async (userid, thunkAPI) => {
    try {
      const response = await http.get(`${apiUrl}/ReviewerSelected/ReviewerDetails?userid=${userid}`);
      console.log(response.data);
      return response.data;
     
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getReviewerClassification = createAsyncThunk(
  'reviewer/getReviewerClassification',
  async (_, thunkAPI) => {
    try {
      const response = await http.get(`${apiUrl}/ReviewerSelected/Reviwerclassification`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getReviewerClassificationwithIds = createAsyncThunk(
  'reviewer/getReviewerClassificationids',
  async (classificationIds, thunkAPI) => {
    try {
      const response = await http.get(`${apiUrl}/ReviewerSelected/reviwerclassification`, {
        params: { classificationIds }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getReviewerStatisticsForUsersAsync = createAsyncThunk(
  'reviewer/getReviewerStatisticsForUsersAsync',
  async (filters, thunkAPI) => {
    try {
      const response = await http.post(`${apiUrl}/ReviewerSelected/SearchSelectedReviewer`, filters);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const GetReviewerByuserIds = createAsyncThunk(
  'reviewer/getReviewerByuserIds',
  async (user, thunkAPI) => {
    try {
      const response = await http.post(`${apiUrl}/ReviewerSelected/Reviewers-invite`, user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getReviewerbyclassficationForUsersAsync = createAsyncThunk(
  'reviewer/getReviewerbyclassficationForUsersAsync',
  async (filters, thunkAPI) => {
    try {
      const response = await http.post(`${apiUrl}/ReviewerSelected/SearchReviewerWithClassfication`, filters);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getReviewerSelectedSubmissions = createAsyncThunk(
  'reviewer/getReviewerSelectedSubmissions',
  async (submissionId, thunkAPI) => {
    try {
      const response = await http.get(`${apiUrl}/ReviewerSelected/ReviewerSubmission?submissionId=${submissionId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  selectedReviewerData: null,
  selectedReviewerInviteData:null,
  reviewerClassificationData: [],
  reviewerStatsForUsers: [],
  reviewerStatsByClassification: [],
  reviewerSelectedSubmissions: {},
  inviteAfterSelectedData: null,
  selectedRows:[],
  ReviewerByuserIds:[],
  ReviewerDetails:null,
  loading: false,
  error: null,
inviteData:[],
alternativeData:[],
proposeData:[],

};


const editorreviewerSlice = createSlice({
    name: 'reviewer',
    initialState,
    reducers: {
      updateselectedReviewerInviteData:(state, action) => {
        // state.selectedReviewerInviteData
      },
      setInviteData:(state, action) => {
        state.inviteData=action.payload;
      },
      setAlternativeData:(state, action) => {state.alternativeData=action.payload;},
      setProposeData:(state, action) => {state.proposeData=action.payload;},
      setClear:(state, action) =>{
        state.inviteData=[];
        state.alternativeData=[];
        state.proposeData=[];
        
      },
      setSelectedAs: (state, action) => {
        let { userid, isSelectedAs, nodes } = action.payload;
    
        
        if (!nodes && !isSelectedAs) {
            nodes = null;
        }
    
        const dataIndex = state.reviewerStatsForUsers.data.findIndex(item => item.userid === userid);
        
        if (dataIndex !== -1) {
          const newData = [...state.reviewerStatsForUsers.data];
          const isSelected = newData[dataIndex].isSelectedAs === isSelectedAs;
      
          newData[dataIndex].isSelectedAs = isSelected ? undefined : isSelectedAs;
    
          const selectedRowIndex = state.selectedRows.findIndex(row => row.userid === userid);
      
          if (selectedRowIndex !== -1 && isSelected) {
            state.selectedRows = state.selectedRows.filter(row => row.userid !== userid);
          } else if (!isSelected && selectedRowIndex === -1) {
            state.selectedRows.push({ userid, isSelectedAs, nodes }); 
          }
      
          state.reviewerStatsForUsers = {
            ...state.reviewerStatsForUsers,
            data: newData,
          };
    
          console.log(state.selectedRows);
        }
    }
    
      
    },

    extraReducers: (builder) => {
      
       builder
      .addCase(selectedReviewer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })  .addCase(GetReviewerByuserIds.pending, (state) => {
        state.loading = true;
        state.error = null;
      }) 
      
      .addCase(AlternatereviewerLinkInvite.pending, (state) => {
        state.loading = true;
        state.error = null;
      }) 
      .addCase(Uninvite.pending, (state) => {
        state.loading = true;
        state.error = null;
      }) 
      .addCase(getReviewerDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       .addCase(selectedReviewerInvite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      .addCase(removeselectedreviewers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviewerClassification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviewerClassificationwithIds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
        .addCase(getReviewerStatisticsForUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviewerbyclassficationForUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviewerSelectedSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(inviteAfterSelected.pending, (state) => {
        state.loading = true;
        state.error = null;
        
      }) .addCase(selectedReviewer.fulfilled, (state, action) => {
        state.selectedReviewerData = action.payload;
        state.loading = false;
        
        if (action.payload.data!=null) {
          state.selectedRows= action.payload.data;
        }
        state.selectedReviewerInviteData=null;
      })  .addCase(selectedReviewerInvite.fulfilled, (state, action) => {
        state.selectedReviewerInviteData = action.payload.data;

        state.loading = false;
      })
      .addCase(getReviewerClassification.fulfilled, (state, action) => {
        state.reviewerClassificationData = action.payload.data;
        state.loading = false;
      })    .addCase(getReviewerClassificationwithIds.fulfilled, (state, action) => {
        state.reviewerClassificationData = action.payload.data;
        state.loading = false;
      }) 
      
      .addCase(AlternatereviewerLinkInvite.fulfilled, (state, action) => {
      
        state.loading = false;
      }).addCase(removeselectedreviewers.fulfilled, (state, action) => {
       state.selectedReviewerInviteData=null;
        state.loading = false;
        
      })
      .addCase(Uninvite.fulfilled, (state, action) => {
     //   state.selectedReviewerInviteData=null;
         state.loading = false;
         
       })
      .addCase(getReviewerStatisticsForUsersAsync.fulfilled, (state, action) => {
        state.reviewerStatsForUsers = action.payload;
        console.log(action.payload);
        state.loading = false;
      }) .addCase(GetReviewerByuserIds.fulfilled, (state, action) => {
        state.reviewerStatsForUsers = action.payload;
        console.log(action.payload);
        state.loading = false;
      }).addCase(getReviewerDetails.fulfilled, (state, action) => {
        state.ReviewerDetails = action.payload.data;
       console.log( action.payload.data);
        state.loading = false;
      })
      .addCase(getReviewerbyclassficationForUsersAsync.fulfilled, (state, action) => {
        state.reviewerStatsForUsers = action.payload;
        state.loading = false;
      })
      .addCase(getReviewerSelectedSubmissions.fulfilled, (state, action) => {
        state.reviewerSelectedSubmissions = action.payload.data;
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(inviteAfterSelected.fulfilled, (state, action) => {
        state.inviteAfterSelectedData = action.payload;
        state.loading = false;

      })
        
      
        .addMatcher(
          (action) => {
            return [
              selectedReviewer.rejected,
              getReviewerClassification.rejected,
              getReviewerStatisticsForUsersAsync.rejected,
              getReviewerbyclassficationForUsersAsync.rejected,
              getReviewerSelectedSubmissions.rejected,
              inviteAfterSelected.rejected,
              getReviewerDetails.rejected,
            ].includes(action.type);
          },
          (state, action) => {
            state.loading = false;
            state.error = action.payload;
          }
        )
       ;
    },
  });

  export const { setSelectedAs ,setAlternativeData,setInviteData,setProposeData, setClear} = editorreviewerSlice.actions;
export default editorreviewerSlice.reducer;
