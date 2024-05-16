
import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

const CheckboxSection = ({ label, values, options, onChange }) => (
  <Form.Group as={Row} controlId={`checkbox-${label.toLowerCase().replace(/\s/g, '-')}`}>
    <Form.Label column sm={4}>
      {label}
    </Form.Label>
    <Col sm={8}>
      {options.map((option) => (
        <Form.Check
          key={option}
          type="checkbox"
          label={option}
          value={option}
          checked={values.includes(option)}
          onChange={onChange}
        />
      ))}
    </Col>
  </Form.Group>
);

export default CheckboxSection;
