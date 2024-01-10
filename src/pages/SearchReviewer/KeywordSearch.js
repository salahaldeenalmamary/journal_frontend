import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs'; // Import search icon from react-icons

const KeywordSearch = ({ onSearch, children }) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    
    onSearch(keyword);
  };

  return (
    <div className="p-3">
      <Form>
        <Form.Group controlId="keyword">
          <Form.Control
            type="text"
            placeholder="Enter keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSearch}>
          <BsSearch className="mr-2" /> Search
        </Button>
      </Form>
      {children} 
    </div>
  );
};

export default KeywordSearch;
