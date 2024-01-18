// ManuscriptForm.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, InputGroup } from 'react-bootstrap';
import DropdownSection from '../../components/DropdownSection';
import { BsArrowBarUp, BsArrowBarDown } from 'react-icons/bs';


const ManuscriptForm = () => {
  const [recommendation, setRecommendation] = useState('No Recommendation');


  const [overallRating, setOverallRating] = React.useState(0);

  const handleOverallRatingChange = (event) => {
    let value = event.target.value;
   
    value = Math.max(0, Math.min(parseInt(value), 100));

    setOverallRating(value);
  };

  const handleIncrement = () => {
    setOverallRating((prevRating) => Math.min(prevRating + 1, 100));
  };

  const handleDecrement = () => {
    setOverallRating((prevRating) => Math.max(prevRating - 1, 0));
  };
  const handleRecommendationChange = (event) => {
    setRecommendation(event.target.value);
  };


  const handleViewerAttachments = () => {
   
    console.log('Viewer Attachments action');
  };

  const handleProofAndPrint = () => {
   
    console.log('Proof & Print action');
  };

  const handleProcessCancel = () => {
  
    console.log('Process Cancel action');
  };

  const handleSave = () => {
   
    console.log('Save action');
  };

  return (


    <Container>

      <Card className="p-4">
      <Form className="p-4">
        <Row className="mb-6">
          <DropdownSection className="p-4"
            label="Recommendation"
            value={recommendation}
            options={['No Recommendation', 'Accept', 'Minor Revision', 'Major Revision', 'Reject', 'Editor Edit Complete']}
            onChange={handleRecommendationChange}
          />
          <Row className="mb-2 p-1" >
            <Col>
              <p>Overall Manuscript Rating (1-100): </p>
            </Col>
            <Col>
              <Form.Group controlId="overallRating">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Enter rating"
                    value={overallRating}
                    onChange={handleOverallRatingChange}
                  />
                  <Button variant="outline-secondary" onClick={handleIncrement}>
                    <BsArrowBarUp></BsArrowBarUp>  <i className="bi bi-caret-up-fill" style={{
                      backgroundColor: "#255384",
                      color: "#fff",
                    }}></i>
                  </Button>
                  <Button variant="outline-secondary" onClick={handleDecrement}>
                    <BsArrowBarDown>  <i className="bi bi-caret-down-fill"></i></BsArrowBarDown>  
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Row>




        <Row className="mb-3 p-4">
          <Col sm={7}>
            <Button variant="primary" onClick={handleViewerAttachments} className="me-2 ">
              Viewer Attachments
            </Button>
            <Button variant="primary" onClick={handleProofAndPrint} className="me-2">
              Proof & Print
            </Button>
            <Button variant="danger" onClick={handleProcessCancel} className="me-2">
              Process Cancel
            </Button>
            <Button variant="success" onClick={handleSave}>
              Save
            </Button>
          </Col>
        </Row>
      </Form>
      </Card>
      <hr className="my-4" />
    </Container>

  );
};

export default ManuscriptForm;
