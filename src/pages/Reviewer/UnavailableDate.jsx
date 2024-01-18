import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const UnavailableDate = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    firstSubstituteName: '',
    firstSubstituteEmail: '',
    secondSubstituteName: '',
    secondSubstituteEmail: '',
    thirdSubstituteName: '',
    thirdSubstituteEmail: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      // Handle form submission
      console.log(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.startDate) errors.startDate = 'Start Date is required';
    if (!data.endDate) errors.endDate = 'End Date is required';
    if (!data.reason) errors.reason = 'Reason is required';
    if (!data.firstSubstituteName) errors.firstSubstituteName = 'First Substitute Name is required';
    if (!data.firstSubstituteEmail) errors.firstSubstituteEmail = 'First Substitute E-mail is required';



    return errors;
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>

        <h3> Unavailable Date:</h3>
        <hr className="my-4" />

        <Form.Group controlId="startDate">
          <Row>
            <Col sm={3}>
              <Form.Label>Start Date:</Form.Label>
            </Col>
            <Col sm={3}>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                isInvalid={!!errors.startDate}
              />
              <Form.Control.Feedback type="invalid">{errors.startDate}</Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="endDate">
          <Row>
            <Col sm={3}> <Form.Label>End Date:</Form.Label></Col>
            <Col sm={3}>   <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              isInvalid={!!errors.endDate}
            /></Col>
            <Form.Control.Feedback type="invalid">{errors.endDate}</Form.Control.Feedback></Row>
        </Form.Group>


        <Form.Group controlId="reason">
          <Form.Label>Reason:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            isInvalid={!!errors.reason}
          />
          <Form.Control.Feedback type="invalid">{errors.reason}</Form.Control.Feedback>
        </Form.Group>


        <h3>Substitute Information:</h3>


        <Form.Group controlId="firstSubstituteName">
          <Form.Label>First Substitute Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstSubstituteName"
            value={formData.firstSubstituteName}
            onChange={handleChange}
            isInvalid={!!errors.firstSubstituteName}
          />
          <Form.Control.Feedback type="invalid">{errors.firstSubstituteName}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="firstSubstituteEmail">
          <Form.Label>First Substitute E-mail:</Form.Label>
          <Form.Control
            type="email"
            name="firstSubstituteEmail"
            value={formData.firstSubstituteEmail}
            onChange={handleChange}
            isInvalid={!!errors.firstSubstituteEmail}
          />
          <Form.Control.Feedback type="invalid">{errors.firstSubstituteEmail}</Form.Control.Feedback>
        </Form.Group>
        <hr className="my-4" />

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default UnavailableDate;
