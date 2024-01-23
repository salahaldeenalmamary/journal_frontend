import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';



export const  AddSectionPolicyForm = ({ onSubmit }) => {
  const [sectionPolicy, setSectionPolicy] = useState({
    id: 0,
    text: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionPolicy((prevSectionPolicy) => ({
      ...prevSectionPolicy,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(sectionPolicy);
    setSectionPolicy({
      id: 0,
      text: '',
    });
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group controlId="formId">
              <Form.Label>SectionPolicy ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ID"
                name="id"
                value={sectionPolicy.id}
                onChange={handleChange}
              />
            </Form.Group> */}

            <Form.Group controlId="formText">
              <Form.Label>SectionPolicy Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Text"
                name="text"
                value={sectionPolicy.text}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-2">
              <FaPlus /> Add SectionPolicy
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default  AddSectionPolicyForm;