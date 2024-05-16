import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const RoleModal = ({ role, show, onSubmit, onClose }) => {
  const [title, setTitle] = useState(role.name);
  useEffect(() => {
    if (role?.name) setTitle(role.name);
    else setTitle("");
  }, [role]);
  const handleModalSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...role, name: title });
  };
  const setModalTitle = () => {
    return role?.name ? "Edit Role" : "Add new Role";
  };
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{setModalTitle()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleModalSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Role title</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="enter role title"
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

export default RoleModal;
