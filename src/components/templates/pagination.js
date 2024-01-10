// PaginationComponent.js
import React from 'react';
import { Pagination,Card } from 'react-bootstrap';


const PaginationComponent = ({ totalPages, currentPage, onPageChange, itemsPerPage }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Card>
      <Pagination >
      <Pagination.First onClick={() => onPageChange(1)} />
      <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />

      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
      <Pagination.Last onClick={() => onPageChange(totalPages)} />

      <Pagination.Item disabled>{`Page ${currentPage} of ${totalPages} (${itemsPerPage} items per page)`}</Pagination.Item>
    </Pagination>
    </Card>
  );
};

export default PaginationComponent;
