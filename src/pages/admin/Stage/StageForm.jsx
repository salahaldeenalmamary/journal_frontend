import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const StageForm = ({ onSubmit,Stage:intailStage }) => {
  const [Stage, setStage] = useState(intailStage||{
    id: 0,
    name: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStage((prevStage) => ({
      ...prevStage,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!Stage.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
     
      onSubmit(Stage);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={Stage.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          name="description"
          value={Stage.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Stage
      </Button>
    </Form>
  );
};

export default StageForm;
