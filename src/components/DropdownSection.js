// DropdownSection.js
import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

const DropdownSection = ({ label, value, options, onChange }) => (
  <Form.Group as={Row} controlId={`dropdown-${label.toLowerCase().replace(/\s/g, '-')}`}>
    <Form.Label column  sm={4} >
      {label}
    </Form.Label>
    <Col sm={8}>
      <Form.Control as="select" value={value} onChange={onChange}>
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Form.Control>
    </Col>
  </Form.Group>
);

export default DropdownSection;
