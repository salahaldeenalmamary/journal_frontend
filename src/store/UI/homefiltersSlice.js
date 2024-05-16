// filtersSlice.js
import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit';
import messages from "../../data/messages.json";
import {API_BASE} from "../../redux/api/const";
import { saveAs } from 'file-saver';

const API_BASE_URL = `${API_BASE}api/Home`;

export const fetchData = createAsyncThunk(
  'home/getAllArticle',
  async ({
    FilterCriterias = [],
    SelectedClassifications = [],
    SelectedSections = [],
    SelectedTypes = [],
    StartDate = '',
    EndDate = '',
    pageNumber = 1,
    pageSize = 20,
    SearchQuery = '',
    searchBy = '',
    sortBy= 'relevance',

    
  }) => {
    try {
      const url = `${API_BASE_URL}/all-articales`;


      const filterDto = {
        pageNumber: pageNumber,
        pageSize:pageSize,
        filterCriterias: FilterCriterias,
        selectedClassifications: SelectedClassifications,
        selectedSections: SelectedSections,
        selectedTypes: SelectedTypes,
        startDate: StartDate,
        endDate: EndDate,
        searchQuery: SearchQuery,
        searchBy:searchBy,
        sortBy: sortBy
      };
      console.log("salah"+ JSON.stringify(filterDto));

      

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify(filterDto),
      });

      if (!response.ok) {
        throw Error('Failed to fetch data');
      }

      
      return await response.json();
    } catch (error) {
      // Handle errors
      throw Error('Failed to fetch data');
    }
  }
);



export const fetchSelectedFilters = createAsyncThunk(
  'home/getAllSelectedFilter',
  async () => {
    try {
      // Construct the URL for fetching selected filters
      const url = `${API_BASE_URL}/selected-filters`;
      
      const response = await fetch(url, {
        method: 'GET',
        // Other options if needed
      });

      const data = await response.json();
      return data;
    } catch (error) {
      throw Error('Failed to fetch selected filters');
    }
  }
);






export const downloadfile = createAsyncThunk(
  'home/downloadSelectedFilters',
  async () => {
    try {
    
      const url = `${API_BASE_URL}/selected-filters/download`;

      const response = await fetch(url, {
        method: 'GET',
    
      });

      if (!response.ok) {
        throw new Error('Failed to download selected filters');
      }

    
      const filename = response.headers.get('Content-Disposition').split('filename=')[1];

     
      const blob = await response.blob();

    
      saveAs(blob, filename);

    } catch (error) {
      console.error('Error downloading selected filters:', error);
      throw error;
    }
  }
);






const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    selectedClassifacations: [],
  selectedSections: [],
  selectedFilters: {},
    Classifacations: [],
    selectedTypes: [],
    Types: [],
    Sections: [],
    startDate: '',
    endDate: '',
    filterCriterias: [{ type: 'title', condition: 'or', value: '' }],
    data: [],
    searchTerms: {
      searchBy: 'title',
      searchQuery: '',
    },
    selectedMessages: [],
    currentPage: 1,
    pageSize: 10,
    paged: [],
    totalCount: 0,
    loading: true,
    Openpandel: false,
    error: null, 
  
    sortBy: 'relevance', // Default sorting option
  },
  reducers: {
    
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setOpenpandel: (state, action) => {
      state.Openpandel = action.payload;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setFilterCriterias: (state, action) => {
      state.filterCriterias = action.payload;
    },
    addFilterCriteria: (state) => {
      state.filterCriterias.push({ type: 'name', condition: 'or', value: '' });
    },
    removeFilterCriteria: (state, action) => {
      state.filterCriterias.splice(action.payload, 1);
    },
    setFilterType: (state, action) => {
      const { index, type } = action.payload;
      state.filterCriterias[index].type = type;
    },
    setFilterCondition: (state, action) => {
      const { index, condition } = action.payload;
      state.filterCriterias[index].condition = condition;
    },
    setselectedClassifacations: (state, action) => {
    
      state.selectedClassifacations= action.payload;
    },
    setFilterValue: (state, action) => {
      const { index, value } = action.payload;
      state.filterCriterias[index].value = value;
    },
    toggleCheckbox: (state, action) => {
    console.log(action.payload);
      const { section, isChecked } = action.payload.index
      ;
      console.log(action.payload);
      const isSelected = state.selectedClassifacations.includes(section.id);
    
      if (isSelected) {
        state.selectedClassifacations = state.selectedClassifacations.filter((item) => item !== section.id);
      } else {
        state.selectedClassifacations.push(section.id);
      }
},

TypestoggleCheckbox: (state, action) => {
  console.log(action.payload);
    const { section, isChecked } = action.payload.index
    ;
    const isSelected = state.selectedTypes.includes(section.id);
  
    if (isSelected) {
      state.selectedTypes = state.selectedTypes.filter((item) => item !== section.id);
    } else {
      state.selectedTypes.push(section.id);
    }
},

    SectionstoggleCheckbox: (state, action) => {
      console.log(action.payload);
      const { section, isChecked } = action.payload.index;

  const isSelected = state.selectedSections.includes(section.id);

  if (isSelected) {
    state.selectedSections = state.selectedSections.filter((item) => item !== section.id);
  } else {
    state.selectedSections.push(section.id);
  }
    },
    
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPaged: (state, action) => {
      state.paged = action.payload;
      
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    submitFilters: (state) => {
  
      console.log('Filter Data:', {
    
        startDate: state.startDate,
        endDate: state.endDate,
        selectedSections:state.selectedSections,
        filterCriterias: state.filterCriterias,
        searchTerms: state.searchTerms.searchQuery,
        currentPage: state.currentPage,
        pageSize: state.pageSize,
        totalCount: state.totalCount,
        paged: state.paged,

      });
console.log( state.searchTerms.searchBy);
      
    },  setSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.data = [];
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
      
  state.data = action.payload.items; // Assuming the data array is in 'items' property
  
  // Update pagination information
  state.currentPage = action.payload.pageNumber;
  state.totalPages = action.payload.totalPages;
  state.totalCount = action.payload.totalCount;
       console.log( action.payload);
       
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message;
      });

      builder.addCase(fetchSelectedFilters.fulfilled, (state, action) => {
    
        state.Sections = action.payload.selectedSections;
       
        state.Classifacations = action.payload.selectedClassifications;
        state.Types=action.payload.selectedTypes;
        console.log(action.payload);
        state.loading = false;
      })
  },
  

});

export const {
  setStartDate,
  setEndDate,
  setFilterCriterias,
  addFilterCriteria,
  removeFilterCriteria,
  setFilterType,
  setFilterCondition,
  setFilterValue,
  setSelectedFilters,
  toggleCheckbox,
  SectionstoggleCheckbox,
  TypestoggleCheckbox,
  submitFilters, 
  setSearchTerms,
  setCurrentPage,
  setselectedClassifacations,
  setPaged,
  setTotalCount,
  setSortBy, setOpenpandel
  
} = filtersSlice.actions;

export default filtersSlice.reducer;
