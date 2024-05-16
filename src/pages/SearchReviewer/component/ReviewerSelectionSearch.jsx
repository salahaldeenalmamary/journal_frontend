import React, { useState } from 'react';
import { Radio ,Row } from 'antd';

const ReviewerSelectionSearch = ({ onSelect }) => {
  const [selection, setSelection] = useState(1); // Initial selection value

  const handleSelectionChange = (e) => {
    const value = e.target.value;
    setSelection(value); 
    onSelect(value); 
  };

  return ( <Row> <span> Search Reviewer In :      </span>  <Radio.Group onChange={handleSelectionChange}>
    <Radio value={1}>Only Reviewers</Radio>
    <Radio value={2}>Editor Reviewers</Radio>
    <Radio value={3}>Entire Database </Radio>
  </Radio.Group></Row>
    
  );
};

export default ReviewerSelectionSearch;
