import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const PermissionModal = ({ permission, show, onSubmit, onClose }) => {
  const [title, setTitle] = useState(permission.name);
  useEffect(() => {
    if (permission?.name) setTitle(permission.name);
    else setTitle("");
  }, [permission]);
  const handleModalSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...permission, name: title });
  };
  const setModalTitle = () => {
    return permission?.name ? "Edit Permission" : "Add new permission";
  };
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{setModalTitle()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleModalSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>permission title</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Permission Title"
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Save
          </Button>{" "}
          <Button variant="danger" onClick={onClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PermissionModal;
