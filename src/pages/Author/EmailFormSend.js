import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import ControlledEditor from '../../components/ControlledEditor';
const EmailFormSend = ({ show, handleClose }) =>{
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
      handleClose(); // Close the modal after submission
    };
  
    return (
     
       <Card style={{ width: '100%', maxWidth: '1000px', margin: 'auto' }}>
           <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
  
  
            <Form.Group controlId="body">
              <Form.Label>Letter Body:</Form.Label>
              <ControlledEditor></ControlledEditor>
            </Form.Group>
  
            <Button variant="primary" type="submit">
              Send Email
            </Button>
          </Form>
       </Card>
        
    );
  };

  export default EmailFormSend;