import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
const EmailFormDialog = ({ show, handleClose }) =>{
    const [formData, setFormData] = useState({
      from: '',
      to: '',
      purpose: '',
      subject: '',
      attachment: null,
      body: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        attachment: file,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log('Form data submitted:', formData);
      // You can add your logic to send an email or perform other actions
      handleClose(); // Close the modal after submission
    };
  
    return (
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Email Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="from">
              <Form.Label>From:</Form.Label>
              <Form.Control
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                required
              />
            </Form.Group>
  
            <Form.Group controlId="to">
              <Form.Label>To:</Form.Label>
              <Form.Control
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                required
              />
            </Form.Group>
  
            <Form.Group controlId="purpose">
              <Form.Label>Letter Purpose:</Form.Label>
              <Form.Control
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
              />
            </Form.Group>
  
            <Form.Group controlId="subject">
              <Form.Label>Letter Subject:</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </Form.Group>
{/*   
            <Form.Group controlId="attachment">
              <Form.Label>Attachment File:</Form.Label>
              <Form.File
                name="attachment"
                onChange={handleFileChange}
                accept=".pdf, .doc, .docx"
              />
            </Form.Group> */}
  
            <Form.Group controlId="body">
              <Form.Label>Letter Body:</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="body"
                value={formData.body}
                onChange={handleChange}
                required
              />
            </Form.Group>
  
            <Button variant="primary" type="submit">
              Send Email
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  export default EmailFormDialog;