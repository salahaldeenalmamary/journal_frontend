// BookComponent.js
import React, { useState } from 'react';
import { Col, ListGroup, Row, Button } from 'react-bootstrap';
import { BsDownload, BsEye, BsCheckSquare ,BsShare } from 'react-icons/bs';
import Categories from "./Categories";
import { Link } from 'react-router-dom';
import ArticleDetails from '../artical/ArticleDetails';
import ArticleBody from './ArticleBody';

const BookComponent = ({ books }) => {
  const [selectedBooks, setSelectedBooks] = useState([]);

  const handleBookSelect = (bookId) => {
    setSelectedBooks((prevSelectedBooks) => {
      if (prevSelectedBooks.includes(bookId)) {
        return prevSelectedBooks.filter((id) => id !== bookId);
      } else {
        return [...prevSelectedBooks, bookId];
      }
    });
  };

  return (
    <Col>
      <Row>
        <Col md={3}>
          <Categories />
        </Col>
        <Col md={9}>
          <ListGroup>
            {books &&
              books.map((book) => (
                <ListGroup.Item
                  key={book.id}
                  className={`d-flex justify-content-between align-items-center ${
                    selectedBooks.includes(book.id) ? 'bg-primary text-white' : ''
                  }`}
                >
                  <Row>
                    <Col xs={3}>
                      <img src={book.cover_image} alt={book.title} className="img-fluid" />
                    </Col>
                    <Col xs={9}>
                      <h5>{book.title}</h5>
                      <p className="mb-1">{book.author}</p>
                      <p className="mb-1">{book.description}</p>
                      <p className="mb-1">
                        <strong>Genre:</strong> {book.genre.join(', ')}
                      </p>
                      <p className="mb-1">
                        <strong>Publication Year:</strong> {book.publication_year}
                      </p>
                    </Col>
                  </Row>
                  <div>
                   
                   <Col>
                   <Button variant="link" className="text-decoration-none"  >
                <BsDownload /> Download PDF
              </Button>
              <Button variant="link" className="text-decoration-none"   >
                <BsShare /> Share 
              </Button>
                    <Link to="/ArticleBody">
        <Button variant="link" className="text-decoration-none"  >
          <BsEye /> View Details
        </Button>
      </Link>
                    <Button
                      variant="link"
                      className={`text-decoration-none ${selectedBooks.includes(book.id) ? 'text-white' : ''}`}
                      onClick={() => handleBookSelect(book.id)}
                    >
                      <BsCheckSquare /> Select
                    </Button>
                   </Col>
                   
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </Col>
  );
};

export default BookComponent;
