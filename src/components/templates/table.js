import React, { useState, useRef  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Form, FormControl, Pagination, Dropdown, FormCheck, Row, Card , Button, Modal, NavLink} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomPagination = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <Pagination className="justify-content-center mt-3">
      <Pagination.First
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {Array.from({ length: totalPages }).map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};





const DynamicTable = ({ columns, data,actions }) => {
    const [showColumnModal, setShowColumnModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const initialVisibility = {};
    columns.forEach(column => {
      initialVisibility[column.accessor] = true;
    });
    return initialVisibility;
  });

  const filteredData = data.filter(row => {
    return Object.entries(row).some(([key, value], index) => {
      if (searchOption === 'all') {
        return (
          columnVisibility[key] &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        return (
          columnVisibility[key] &&
          key === searchOption &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    });
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = page => setCurrentPage(page);

  const handleItemsPerPageChange = selectedValue => {
    setItemsPerPage(parseInt(selectedValue, 10));
    setCurrentPage(1);
  };

  const handleSearchOptionChange = selectedOption => {
    setSearchOption(selectedOption);
    setSearchTerm('');
  };

  const handleColumnVisibilityChange = (columnAccessor, isVisible) => {
    setColumnVisibility(prevVisibility => ({
      ...prevVisibility,
      [columnAccessor]: isVisible,
    }));
  };

  const dropdownRef = useRef();

  const handleCheckboxClick = (e, columnAccessor) => {
    e.stopPropagation(); // Prevent dropdown from closing
    handleColumnVisibilityChange(columnAccessor, e.target.checked);
  };

  const handleDropdownToggle = isOpen => {
    if (isOpen) {
      dropdownRef.current.addEventListener('click', stopPropagation);
    } else {
      dropdownRef.current.removeEventListener('click', stopPropagation);
    }
  };

  const stopPropagation = e => {
    e.stopPropagation();
  };
  const handleActionClick = (action, row) => {
    // Customize the modal content based on the action and row data
    const content = `Performing action: ${action.label} on item ${row.id}`;
    

    // Execute the action onClick
    action.onClick(row);
  };
  const handleShowColumnModal = () => setShowColumnModal(true);
  const handleCloseColumnModal = () => setShowColumnModal(false);

  return (
  <Card>
    <Card.Body>
    <div className="table-container">
      {/* Search Bar */}
    <Card>
    <Row>
      <Form className="mb-3">
        <FormControl
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Form>

      {/* Search by option dropdown */}
      <Dropdown className="mb-3 btn-xs">
        <Dropdown.Toggle variant="light" id="searchOptionDropdown">
          Search by: {searchOption === 'all' ? 'All Columns' : searchOption}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSearchOptionChange('all')}>
         الكل
          </Dropdown.Item>
          {columns.map(column => (
            <Dropdown.Item
              key={column.accessor}
              onClick={() => handleSearchOptionChange(column.accessor)}
            >
              {column.Header}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Items per page dropdown */}
      <Dropdown className="mb-3">
        <Dropdown.Toggle  variant="light"  id="itemsPerPageDropdown">
          Items per Page: {itemsPerPage}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {[5, 10, 20].map(value => (
            <Dropdown.Item
              key={value}
              onClick={() => handleItemsPerPageChange(value)}
            >
              {value}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Show Column Modal Button */}
      <Button className="mb-3" variant="light"  bordered hover onClick={handleShowColumnModal}>
        Show Column Modal
      </Button>

      {/* Column visibility modal */}
      <Modal show={showColumnModal} onHide={handleCloseColumnModal}>
        <Modal.Header closeButton>
          <Modal.Title>Column Visibility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown
            ref={dropdownRef}
            onToggle={handleDropdownToggle}
            show={true}
          >
            <Dropdown.Toggle  variant="light" id="columnVisibilityDropdown">
              Column Visibility
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {columns.map(column => (
                <Dropdown.Item key={column.accessor}>
                  <FormCheck
                    type="checkbox"
                    id={`checkbox-${column.accessor}`}
                    label={column.Header}
                    checked={columnVisibility[column.accessor]}
                    onClick={e => handleCheckboxClick(e, column.accessor)}
                  />
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseColumnModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </Row>
    </Card>

      {/* Table */}
      {/* Table */}
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            {columns
              .filter(column => columnVisibility[column.accessor])
              .map(column => (
                <th key={column.accessor}>{column.Header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* First cell with list of actions */}
              <td>
                {actions.map(action => (
                  <Link key={action.id} variant={action.variant} onClick={() => handleActionClick(action, row)}>
                    {action.label}
                    <br />
                  </Link>
                ))}
              </td>

              {/* Render other cells based on column visibility */}
              {columns
                .filter(column => columnVisibility[column.accessor])
                .map(column => (
                  <td key={column.accessor}>{row[column.accessor]}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
    </Card.Body>
  </Card>
  );
};

export default DynamicTable;
