import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Container } from 'react-bootstrap';

const SearchReviewersTabOne = ({ attributes }) => {
  const [searchCriteria, setSearchCriteria] = useState([{ attribute: '', condition: '', selector: '', value: '', combineOperator: 'AND' }]);

  useEffect(() => {
    // Ensure attributes is an array before setting it as the default attribute for the first row
    if (Array.isArray(attributes) && attributes.length > 0) {
      setSearchCriteria((prevCriteria) => [
        {
          ...prevCriteria[0],
          attribute: attributes[0], // Set the default attribute from the props
        },
      ]);
    }
  }, [attributes]);

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

  const headerStyle = {
    backgroundColor: "#255384",
    color: "#fff",
    padding: "15px",
    marginBottom: "2px",
  };

  return (
    <Container>
      <Table striped bordered hover>
        <thead style={headerStyle}>
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
                  {attributes.map((attribute) => (
                    <option key={attribute} value={attribute}>
                      {attribute}
                    </option>
                  ))}
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
