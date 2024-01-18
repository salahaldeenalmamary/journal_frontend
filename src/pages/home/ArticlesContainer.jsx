import React, { useState } from "react";
import { ListGroup, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsDownload, BsEye, BsCheckSquare, BsShare } from "react-icons/bs";

const ArticlesContainer = ({ articles: books }) => {
  const [selectedBooks, setSelectedBooks] = useState(books);

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
    <ListGroup>
      {books &&
        books.map((book) => (
          <ListGroup.Item
            key={book.id}
            className={`d-flex justify-content-between align-items-center ${
              selectedBooks.includes(book.id) ? "bg-primary text-white" : ""
            }`}
            style={{
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <Row>
              <Col xs={3}>
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="img-fluid"
                  style={{ maxWidth: "100%", borderRadius: "5px" }}
                />
              </Col>
              <Col xs={9}>
                <h5 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {book.title}
                </h5>
                <p className="mb-2">{book.author}</p>
                <p className="mb-2">{book.description}</p>
                <p className="mb-2">
                  <strong>Genre:</strong> {book.genre.join(", ")}
                </p>
                <p className="mb-2">
                  <strong>Publication Year:</strong> {book.publication_year}
                </p>
              </Col>
            </Row>
            <div>
              <Col>
                <Button variant="link" className="text-decoration-none">
                  <BsDownload /> Download PDF
                </Button>
                <Button variant="link" className="text-decoration-none">
                  <BsShare /> Share
                </Button>
                <Link to={`/ArticleDetails/${book.id}`}>
                  <Button variant="link" className="text-decoration-none">
                    <BsEye /> View Details
                  </Button>
                </Link>
                <Button
                  variant="link"
                  className={`text-decoration-none ${
                    selectedBooks.includes(book.id) ? "text-white" : ""
                  }`}
                  onClick={() => handleBookSelect(book.id)}
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    padding: "5px 10px",
                    marginRight: "10px",
                  }}
                >
                  <BsCheckSquare /> Select
                </Button>
              </Col>
            </div>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default ArticlesContainer;
