import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';

const EmailFormSend = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    purpose: '',
    subject: '',
    attachment: '',
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
   
  };

  return (
    <Container>
      <h3 className="mt-4 mb-3">Send Email Notification</h3>
      <Card>
        <Form onSubmit={handleSubmit} encType="multipart/form-data" className="p-4">
          <Form.Group controlId="from">
            <Form.Label>From:</Form.Label>
            <Form.Control type="text" name="from" value={formData.from} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="to">
            <Form.Label>To:</Form.Label>
            <Form.Control type="text" name="to" value={formData.to} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="purpose">
            <Form.Label>Letter Purpose:</Form.Label>
            <Form.Control type="text" name="purpose" value={formData.purpose} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="subject">
            <Form.Label>Letter Subject:</Form.Label>
            <Form.Control type="text" name="subject" value={formData.subject} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="attachment">
            <Form.Label>Attachment File:</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>

          <Form.Group controlId="body">
            <Form.Label>Letter Body:</Form.Label>
            <Form.Control as="textarea" rows={4} name="body" value={formData.body} onChange={handleChange} required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Send Email
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default EmailFormSend;
