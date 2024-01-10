import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { Row, Col ,Button} from "react-bootstrap";
import FiltersBar from "./FiltersBar";
import Paginate from "../../utils/paginate";
import ArticlesContainer from "./ArticlesContainer";
import Pagination from "../../common/pagination/pagination";
import messages from "../../data/messages.json";
import ReviewerManagerMain from "../SelectReviewer/MainselectedReviewer";


const HomePage = () => {
  const [tempMessages, setTempMessages] = useState(messages);
  //   const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    searchBy: "title",
    searchQuery: "",
  });
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchBy, setSearchBy] = useState();
 

  const handlePageChange = (page) => {
    // Add logic here to fetch and update data for the selected page
    setCurrentPage(page);
  };
  const handleSearchConfirmation = (terms) => {
    setSearchTerms(terms);
  };
  const handleSearch = () => {
    const initMessages = [...tempMessages];
    const searchBy = searchTerms.searchBy.toLowerCase();
    const searchQuery = searchTerms.searchQuery.toLocaleLowerCase();

    // Filter messages based on the search term and criteria
    const filtered = initMessages.filter((message) => {
      const searchField = message[searchBy].toLowerCase();
      return searchField.includes(searchQuery);
    });
    // set Pagination
    const paged = Paginate(filtered, currentPage, pageSize);
    // Set the filtered messages in the state
    // setFilteredMessages(filtered);
    return {
      totalCount: filtered.length,
      paged,
    };
  };
  const { paged, totalCount } = handleSearch();
  return (
    <div>
      <SearchBar
        searchTerms={searchTerms}
        onConfirmSearch={handleSearchConfirmation}
      />
      <Row>
        <Col>
          <FiltersBar />
        </Col>
        <Col md={9}>
          <ArticlesContainer articles={paged} />
        </Col>
      </Row>
      <Row>
        <Pagination
          currentPage={currentPage}
          itemsCount={totalCount}
          pageSize={pageSize}
        />
      </Row>
    

    
    </div>
  );

};

export default HomePage;
