import React from 'react';
import {  Button, Row, Table,Card,Col} from 'react-bootstrap';
import {  FaTrash, FaEdit } from 'react-icons/fa';

const SectionPolicyOfSectionsTable = ({ sectionPolicyOfSections, onDelete, onUpdate }) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Section Policy ID</th>
                  <th>Section ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sectionPolicyOfSections.map((sectionPolicyOfSection) => (
                  <tr key={sectionPolicyOfSection.id}>
                    <td>{sectionPolicyOfSection.sectionPolicyId}</td>
                    <td>{sectionPolicyOfSection.sectionId}</td>
                    <td>{sectionPolicyOfSection.name}</td>
                    <td>{sectionPolicyOfSection.description}</td>
                    <td>
                      <Button variant="danger" onClick={() => onDelete(sectionPolicyOfSection.id)}>
                        <FaTrash />
                      </Button>{' '}
                      <Button variant="info" onClick={() => onUpdate(sectionPolicyOfSection)}>
                        <FaEdit />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SectionPolicyOfSectionsTable;