import React from 'react';
import {  Button, Table } from 'react-bootstrap';
import {  FaTrash, FaEdit } from 'react-icons/fa';

const  SectionPolicyTable = ({ sectionPolicies, onDelete, onUpdate }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Text</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {sectionPolicies.map((sectionPolicy) => (
          <tr key={sectionPolicy.id}>
            <td>{sectionPolicy.id}</td>
            <td>{sectionPolicy.text}</td>
            <td>
              <Button variant="danger" onClick={() => onDelete(sectionPolicy.id)}>
                <FaTrash />
              </Button>{' '}
              <Button variant="info" onClick={() => onUpdate(sectionPolicy)}>
                <FaEdit />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SectionPolicyTable;