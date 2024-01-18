import React, { useState } from "react";
import { Modal, Button, Form, Col, Row, Table } from "react-bootstrap";

const AuthorFormDialog = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    institution: "",
    country: "",
    roles: [],
  });

  const [validated, setValidated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (role) => {
    const roles = formData.roles.includes(role)
      ? formData.roles.filter((r) => r !== role)
      : [...formData.roles, role];

    setFormData({
      ...formData,
      roles,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity()) {
     
      onHide(); 
    } else {
      setValidated(true);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-info">Author Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          method=""
        >
          {/* Given/First Name */}
          <Form.Group as={Row} controlId="formFirstName">
            <Form.Label column sm={4}>
              Given/First Name*
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter given/first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Field is required
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Middle Name */}
          <Form.Group as={Row} controlId="formMiddleName">
            <Form.Label column sm={4}>
              Middle Name
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter middle name"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          {/* Family/Last Name */}
          <Form.Group as={Row} controlId="formLastName">
            <Form.Label column sm={4}>
              Family/Last Name*
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter family/last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Field is required
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Academic Degree(s) */}
          <Form.Group as={Row} controlId="formAcademicDegree">
            <Form.Label column sm={4}>
              Academic Degree(s)
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter academic degree(s)"
                name="academicDegree"
                value={formData.academicDegree}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          {/* E-mail Address */}
          <Form.Group as={Row} controlId="formEmail">
            <Form.Label column sm={4}>
              E-mail Address*
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="email"
                placeholder="Enter e-mail address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Field is required
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* ORCID */}
          <Form.Group as={Row} controlId="formOrcid">
            <Form.Label column sm={4}>
              ORCID
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter ORCID"
                name="orcid"
                value={formData.orcid}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          {/* Institution */}
          <Form.Group as={Row} controlId="formInstitution">
            <Form.Label column sm={4}>
              Institution*
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter institution"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Field is required
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Country or Region */}
          <Form.Group as={Row} controlId="formCountry">
            <Form.Label column sm={4}>
              Country or Region
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                as="select"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="">Select a country</option>
                <option value="ANGUILLA">Anguilla</option>
                {/* Add other countries as needed */}
              </Form.Control>
            </Col>
          </Form.Group>

          {/* Contributor Roles */}
          <Form.Group as={Row} controlId="formRoles">
            <Form.Label column sm={4}>
              Contributor Roles
            </Form.Label>
            <Col sm={8}>
              <Form.Check
                type="checkbox"
                label="Conceptualization"
                checked={formData.roles.includes("Conceptualization")}
                onChange={() => handleCheckboxChange("Conceptualization")}
              />
              {/* Add other checkboxes for contributor roles as needed */}
            </Col>
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const AuthorTable = ({ authors }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Institution</th>
          <th>Country</th>
          {/* Add more columns as needed */}
        </tr>
      </thead>
      <tbody>
        {authors.map((author, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{author.firstName}</td>
            <td>{author.middleName}</td>
            <td>{author.lastName}</td>
            <td>{author.email}</td>
            <td>{author.institution}</td>
            <td>{author.country}</td>
            {/* Add more cells as needed */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const AuthorFormStep = () => {
  const [showForm, setShowForm] = useState(false);
  const [authors, setAuthors] = useState([]);

  const handleShowForm = () => setShowForm(true);

  const handleCloseForm = () => setShowForm(false);

  const handleSaveAuthor = (author) => {
    setAuthors([...authors, author]);
    handleCloseForm();
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShowForm}>
        Add Author
      </Button>

      <AuthorFormDialog
        show={showForm}
        onHide={handleCloseForm}
        onSave={handleSaveAuthor}
      />

      <AuthorTable authors={authors} />
    </div>
  );
};

export default AuthorFormStep;
