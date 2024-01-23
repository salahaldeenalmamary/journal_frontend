import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';

const StageTable = ({ stages, onDelete, onUpdate }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {stages.map((Stage) => (
          <tr key={Stage.id}>
            <td>{Stage.id}</td>
            <td>{Stage.name}</td>
            <td>{Stage.description}</td>
            <td>
              <Button variant="danger" onClick={() => onDelete(Stage.id)}>
                <FaTrash />
              </Button>{' '}
              <Button variant="info" onClick={() => onUpdate(Stage)}>
                <FaEdit />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StageTable;
