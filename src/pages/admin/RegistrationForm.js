import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import RadioSection from '../../components/RadioSection';

const RegistrationForm = () => {
  const [user, setUser] = useState({
    firstName: '',
    email: '',
    phone: '',
    password: '',
    middleName: '',
    lastName: '',
    nickName: '',
    degree: '',
    university: '',
    country: '',
    roles: [],
  });

  const handleTransferConsentInfoChange = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      roles: value.target.value,
    }));
  };

  const [errors, setErrors] = useState({
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!user.email) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (!user.phone) {
      newErrors.phone = 'Phone is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Perform your form submission logic here
      console.log('User submitted:', user);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={user.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter phone"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          isInvalid={!!errors.phone}
        />
        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
      </Form.Group>

      

      <RadioSection
        label="Roles"
        value={user.roles}
        options={['Author', 'Reviewer', 'Editor', 'Publisher']}
        onChange={handleTransferConsentInfoChange}
      />

      <hr className="my-4" />
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default RegistrationForm;
