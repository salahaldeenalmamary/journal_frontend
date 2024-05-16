import React, { useState } from 'react';
import { Button } from 'antd';
import SearchBar from './SearchBar';

const PersistentHeader = ({
  searchTerms,
  handleSearch,
  handleSearchTermsChange,
  handleSortChange,
  sortBy,
}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
    
        <div style={{ position: 'fixed', top: 40, width: '100%', backgroundColor: 'white', zIndex: 999 }}>
          <SearchBar
            searchTerms={searchTerms}
            onSearch={handleSearch}
            onSearchTermsChange={handleSearchTermsChange}
            onSortChange={handleSortChange}
            sortBy={sortBy}
          />
        </div>
     
    </>
  );
};

export default PersistentHeader;
