import React, { useState } from 'react';
import { ListGroup, Form, Button, Container, Row, Col } from 'react-bootstrap';

const ClassificationListContent = ({ classifications, onSearch }) => {
  const [selectedClassifications, setSelectedClassifications] = useState([]);

  const handleCheckboxChange = (classification) => {
    // Toggle the selection of the classification
    setSelectedClassifications((prevSelected) => {
      if (prevSelected.includes(classification)) {
        return prevSelected.filter((item) => item !== classification);
      } else {
        return [...prevSelected, classification];
      }
    });
  };

  const handleSearch = () => {
   
    onSearch(selectedClassifications);
  };

  return (
    <Container>
      <Row>
        <Col>
          <ListGroup>
            {classifications.map((classification, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      id={`classification-${index}`}
                      label={classification.name}
                      checked={selectedClassifications.includes(classification.name)}
                      onChange={() => handleCheckboxChange(classification.name)}
                    />
                  </Col>
                  <Col>
                    <div className="text-right">
                      {`(${classification.reviewsCount} reviews)`}
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="text-center">
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const ClassificationList = () => {
  const classifications = [
    { name: 'Class A', reviewsCount: 10 },
    { name: 'Class B', reviewsCount: 5 },
    { name: 'Class C', reviewsCount: 8 },
  ];

  const handleSearch = (selectedClassifications) => {
  
    console.log('Selected Classifications:', selectedClassifications);
  };

  return (
    <div>
    
      <ClassificationListContent classifications={classifications} onSearch={handleSearch} />

    </div>
  );
};


export default ClassificationList;