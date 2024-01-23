import React, { useState } from 'react';
import {Button, Modal } from 'react-bootstrap';
import CategoryForm from './CategoryForm';

const AddCategoryForm = ({ onSubmit }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleAdd = (category) => {
    onSubmit(category);
    setShowDialog(false);
  };

  return (
    <>
      <Button variant="primary" className="mt-2" onClick={() => setShowDialog(true)}>
        Add Category
      </Button>

      <Modal show={showDialog} onHide={() => setShowDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm onSubmit={handleAdd} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCategoryForm;
