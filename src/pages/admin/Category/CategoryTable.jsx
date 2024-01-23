import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';

const CategoryTable = ({ categories, onDelete, onUpdate }) => {
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
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td>
              <Button variant="danger" onClick={() => onDelete(category.id)}>
                <FaTrash />
              </Button>{' '}
              <Button variant="info" onClick={() => onUpdate(category)}>
                <FaEdit />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CategoryTable;
