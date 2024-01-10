import React, { useState } from 'react';
import { Table, Button, Form, Row, Col, Container } from 'react-bootstrap';

const SearchReviewersTabOne = () => {
  const [searchCriteria, setSearchCriteria] = useState([{ attribute: '', condition: '', selector: '', value: '', combineOperator: 'AND' }]);

  const handleAddRow = () => {
    setSearchCriteria((prevCriteria) => [...prevCriteria, { attribute: '', condition: '', selector: '', value: '', combineOperator: 'AND' }]);
  };

  const handleRemoveRow = (index) => {
    setSearchCriteria((prevCriteria) => prevCriteria.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    setSearchCriteria((prevCriteria) => {
      const updatedCriteria = [...prevCriteria];
      updatedCriteria[index][field] = value;
      return updatedCriteria;
    });
  };

  const handleApplySearch = () => {
  
    console.log('Applying search:', searchCriteria);
  
  };

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Is/Is Not</th>
            <th>Selector</th>
            <th>Value</th>
            <th> </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {searchCriteria.map((criteria, index) => (
            <tr key={index}>
              <td>
                <Form.Control as="select" value={criteria.attribute} onChange={(e) => handleChange(index, 'attribute', e.target.value)}>
                
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  
                </Form.Control>
              </td>
              <td>
                <Form.Control as="select" value={criteria.condition} onChange={(e) => handleChange(index, 'condition', e.target.value)}>
                
                  <option value="is">Is</option>
                  <option value="isNot">Is Not</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control as="select" value={criteria.selector} onChange={(e) => handleChange(index, 'selector', e.target.value)}>
                 
                  <option value="startsWith">Starts With</option>
                  <option value="endsWith">Ends With</option>
                
                </Form.Control>
              </td>
              <td>
                <Form.Control type="text" value={criteria.value} onChange={(e) => handleChange(index, 'value', e.target.value)} />
              </td>
              <td>
                <Form.Control as="select" value={criteria.combineOperator} onChange={(e) => handleChange(index, 'combineOperator', e.target.value)}>
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                </Form.Control>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleRemoveRow(index)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="justify-content-end">
        <Col xs="auto">
          <Button variant="primary" onClick={handleAddRow}>
            Add Row
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={handleApplySearch}>
            Apply Search
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchReviewersTabOne;
