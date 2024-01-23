import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card} from 'react-bootstrap';





const AddSectionPolicyOfSectionsForm = ({ onSubmit, sectionPolicyOfSections }) => {
  const [sectionPolicyOfSectionsFormData, setSectionPolicyOfSectionsFormData] = useState({
    sectionPolicyId: 0,
    sectionId: 0,
    name: '',
    description: 'string',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionPolicyOfSectionsFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(sectionPolicyOfSectionsFormData);
    // Clear the form fields after submission
    setSectionPolicyOfSectionsFormData({
      sectionPolicyId: 0,
      sectionId: 0,
      name: '',
      description: 'string',
    });
  };

  return (
    <Container className="mt-2">
      <Card>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formSectionPolicy">
                <Form.Label>Section Policy</Form.Label>
                <Form.Control
                  as="select"
                  name="sectionPolicyId"
                  value={sectionPolicyOfSectionsFormData.sectionPolicyId}
                  onChange={handleChange}
                >
                  <option value={0} disabled>Select Section Policy</option>
                  {sectionPolicyOfSections.map((sectionPolicy) => (
                    <option key={sectionPolicy.id} value={sectionPolicy.id}>
                      {sectionPolicy.text}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formSectionname">
                <Form.Label>Section Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Section Name"
                  name="name"  
                  value={sectionPolicyOfSectionsFormData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formSectiondescription">
                <Form.Label>Section description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Section description"
                  name="description" 
                  value={sectionPolicyOfSectionsFormData.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-2">
                Add Section Policy of Section
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default AddSectionPolicyOfSectionsForm;