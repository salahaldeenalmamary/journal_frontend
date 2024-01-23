import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import StageForm from './StageForm';

const AddStageForm = ({ onSubmit }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleAdd = (Stage) => {
    onSubmit(Stage);
    setShowDialog(false);
  };

  return (
    <>
      <Button variant="primary" className="mt-2" onClick={() => setShowDialog(true)}>
        Add Stage
      </Button>

      <Modal show={showDialog} onHide={() => setShowDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Stage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StageForm onSubmit={handleAdd} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddStageForm;
