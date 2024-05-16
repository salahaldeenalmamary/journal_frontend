// RadioSection.js
import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

const RadioSection = ({ label, value, options, onChange }) => (
  <Form.Group as={Row} controlId={`radio-${label.toLowerCase().replace(/\s/g, '-')}`}>
    <Form.Label column sm={4}>
      {label}
    </Form.Label>
    <Col sm={8}>
      {options.map((option) => (
        <Form.Check
          key={option}
          type="radio"
          label={option}
          value={option}
          checked={value === option}
          onChange={onChange}
        />
      ))}
    </Col>
  </Form.Group>
);

export default RadioSection;
