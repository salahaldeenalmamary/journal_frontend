import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col,Card, Dropdown, Divider} from 'antd';
import LoadReferenceProgressBar from '../../common/progressIndicator/LoadReferenceProgressBar';
import FilterBar from './FiltersBar';
import PersistentHeader from './PersistentHeader';
import { BottomDrawer } from '../../common/BottomDrawer';
import {
  setStartDate,
  setEndDate,
  setFilterCriterias,
  addFilterCriteria,
  removeFilterCriteria,
  setFilterType,
  setFilterCondition,
  setFilterValue,
  setSortBy,setOpenpandel,
  
  fetchSelectedFilters,
  TypestoggleCheckbox,
   SectionstoggleCheckbox,
setSearchTerms,
  setPaged,
  setTotalCount,
  submitFilters,
  fetchData,setselectedClassifacations,
  setCurrentPage,toggleCheckbox,
  setSelectedFilters // Import the new action
} from '../../store/UI/homefiltersSlice';
import SearchBar from './SearchBar';
import FiltersBar from './FiltersBar';
import ArticlesContainer from './ArticlesContainer';
import Pagination from '../../common/pagination';
import { BsX } from 'react-icons/bs';
import { event } from 'jquery';
import SearchCriteriaIndex from './searchCriteriaIndex';
import OffcanvasT from './canvans';
import { classificationsSelected } from '../../store/UI/submissionForm';
// ... (imports)
import DrawerContent from './DrawerContent';
const HomePage = () => {
  const dispatch = useDispatch();
  const {
    data,
    searchTerms,
    pageSize,
    paged,
    
    totalCount,
    StartDate,
    EndDate,
    SelectedClassifications,
    SelectedTypes,
    SelectedSections,
    startDate,
    endDate,
    filterCriterias,
    Types,
    sortBy ,
    Classifacations,
    Sections,
    selectedClassifacations,
    selectedTypes,
    selectedSections,
  } = useSelector((state) => state.UIS.homefilters);
  const loading = useSelector((state) => state.UIS.homefilters.loading);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMenue, setcurrentMenue] = useState(1);

  const handlecurrentMenue = (e) => {
    setcurrentMenue(e);
  };
  const fetchDataButtonClick = async ({
  
  } = {}) => {

    try {
      
      await dispatch(
        fetchData({
          pageNumber: currentPage,
          pageSize: pageSize,
          FilterCriterias: filterCriterias,
          SelectedClassifications: selectedClassifacations,
          SelectedSections: selectedSections,
          SelectedTypes: selectedTypes,
          StartDate: startDate,
          EndDate: endDate,
          SearchQuery:   searchTerms.searchQuery,
          searchBy:   searchTerms.searchBy,
        
          sortBy:sortBy
        })
      );
      await dispatch(fetchSelectedFilters());
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    
    fetchDataButtonClick();

    console.log(data);
  }, [   dispatch,
    currentPage,
    pageSize,
   searchTerms.searchBy,
   
    StartDate,
    EndDate,
    sortBy

  
 
  ]);
//  selectedClassifacations,selectedSections, selectedTypes

  const handleCheckboxChange = (keys) => {
    dispatch(setselectedClassifacations( keys ));
      
  };

  const handleCheckboxChangeS = (index, isChecked) => {
    dispatch(SectionstoggleCheckbox({ index, isChecked }));
   
    
   
  };

  const handleCheckboxChangeType = (index, isChecked) => {
    dispatch(TypestoggleCheckbox({ index, isChecked }));
    
    
  };

  const handleStartDateChange = (event) => {
    dispatch(setStartDate(event));
  };

  const handleEndDateChange = (event) => {
    dispatch(setEndDate(event));
  };

  const handleAddFilter = () => {
    dispatch(addFilterCriteria());
  };

  const handleFilterTypeChange = (type, index) => {
    dispatch(setFilterType({ index, type }));
    dispatch(submitFilters());
  };

  const handleFilterConditionChange = (condition, index) => {
    dispatch(setFilterCondition({ index, condition }));
    
  };
  const MenueClick = (e) => {
    const { value } = e.item.props; 
    console.log(value);
    setcurrentMenue(value);
    
  };
  const handleFilterValueChange = (value, index) => {
    dispatch(setFilterValue({ index, value }));
  };

  const handleRemoveFilter = (index) => {
    dispatch(removeFilterCriteria(index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitFilters());
    console.log(e.value);
   
  };

 

 
  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(submitFilters());
    fetchDataButtonClick();
    dispatch( setOpenpandel(false));
  
  };
 
  const handleSearchTermsChange = (newSearchTerms) => {
    dispatch(setSearchTerms(newSearchTerms));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (value) => {
    dispatch(setSortBy(value));
    dispatch(submitFilters());
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700); // Assuming 768px as mobile breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Listen to window resize event

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, [currentMenue]);
  return (
    <div > 
   
   
   

     
        <Row >
          <Col xs={9} sm={7} md={7} lg={7} xl={7} >
          {!isMobile && ( 
              
                  <DrawerContent  
                  handleApplySearch={handleSearch}
                  onMenuClick={MenueClick}
                    showAdvanced={true}
                    segment={currentMenue}
                    startDate={startDate}
                    endDate={endDate}
                    filterCriterias={filterCriterias}
                    Types={Types}
                    Classifacations={Classifacations}
                    Sections={Sections}
                    selectedClassifacations={selectedClassifacations}
                    selectedTypes={selectedTypes}
                    selectedSections={selectedSections}
                    handleStartDateChange={handleStartDateChange}
                    handleEndDateChange={handleEndDateChange}
                    handleAddFilter={handleAddFilter}
                    handleFilterTypeChange={handleFilterTypeChange}
                    handleFilterConditionChange={handleFilterConditionChange}
                    handleFilterValueChange={handleFilterValueChange}
                    handleRemoveFilter={handleRemoveFilter}
                    handleCheckboxChangeType={handleCheckboxChangeType}
                    handleCheckboxChange={handleCheckboxChange}
                    handleCheckboxChangeS={handleCheckboxChangeS}
                  />
              
              )}
        
          </Col>  
          <Col  xs={24} sm={15} md={16} lg={16} xl={16} >
          

<SearchBar 
      searchTerms={searchTerms}
      onSearch={handleSearch}
      onSearchTermsChange={handleSearchTermsChange}
      onSortChange={handleSortChange}
      sortBy={sortBy}
    >
        {isMobile &&( 
          <BottomDrawer   >
            <DrawerContent handleApplySearch={handleSearch}
            onMenuClick={MenueClick}
            segment={currentMenue}
              showAdvanced={true}
              startDate={startDate}
              endDate={endDate}
              filterCriterias={filterCriterias}
              Types={Types}
              Classifacations={Classifacations}
              Sections={Sections}
              selectedClassifacations={selectedClassifacations}
              selectedTypes={selectedTypes}
              selectedSections={selectedSections}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
              handleAddFilter={handleAddFilter}
              handleFilterTypeChange={handleFilterTypeChange}
              handleFilterConditionChange={handleFilterConditionChange}
              handleFilterValueChange={handleFilterValueChange}
              handleRemoveFilter={handleRemoveFilter}
              handleCheckboxChangeType={handleCheckboxChangeType}
              handleCheckboxChange={handleCheckboxChange}
              handleCheckboxChangeS={handleCheckboxChangeS}
            />

          </BottomDrawer>
        )}

       
  
   
    </SearchBar>
 
 
  
  
    <Divider/>
  
   
  <ArticlesContainer
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: pageSize,
      position: "bottom",
    }}
    loading={loading}
    articles={data}
    style={{ overflowY: 'hidden' }} // Hide inner scrollbar
  />


          </Col>
          
        </Row>
      
    
    
      {/* <Row>
        <Pagination
          currentPage={currentPage}
          itemsCount={totalCount}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </Row> */}
    </div>
  );
};

export default HomePage;
