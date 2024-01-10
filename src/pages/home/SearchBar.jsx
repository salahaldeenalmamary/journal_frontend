import React, { useState } from "react";
import {
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Card,
  Dropdown,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

function SearchBar({ searchTerms, onConfirmSearch }) {
  const [searchQuery, setSearchQuery] = useState(searchTerms.searchQuery);
  const [searchBy, setSearchBy] = useState(searchTerms.searchBy);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchByChange = (value) => {
    setSearchBy(value);
  };

  const handleSearch = () => {
    onConfirmSearch({ searchQuery, searchBy });
  };

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch((prev) => !prev);
  };

  return (
    <Card body className="shadow-sm mb-3">
      <Form>
        <Row className="align-items-center">
          <Col xs={6} md={8}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={4} md={2}>
            <Button variant="outline-success" block onClick={handleSearch}>
              <BsSearch /> Search
            </Button>
          </Col>
        </Row>
        {showAdvancedSearch && (
          <div>
            <Col xs={2} md={2}>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" block>
                  Search By:{" "}
                  {searchBy.charAt(0).toUpperCase() + searchBy.slice(1)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {["title", "author", "description"].map((option) => (
                    <Dropdown.Item
                      key={option}
                      onClick={() => handleSearchByChange(option)}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </div>
        )}

        <Button variant="link" onClick={toggleAdvancedSearch}>
          {showAdvancedSearch ? "Hide Advanced Search" : "Show Advanced Search"}
        </Button>
      </Form>
    </Card>
  );
}

export default SearchBar;
