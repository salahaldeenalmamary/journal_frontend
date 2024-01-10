import React, { useState } from "react";
import { Button, Card, Container, Form, Modal, Table } from "react-bootstrap";
import { BsTrash, BsPencil, BsDoorClosed } from "react-icons/bs";
import ActionButtons from "./ActionButtons";

const ReviewerFormDialog = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [reviewer, setReviewer] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    degree: "",
    position: "",
    institution: "",
    department: "",
    email: "",
    reason: "",
  });
  const [reviewersList, setReviewersList] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewer((prevReviewer) => ({
      ...prevReviewer,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (reviewer.firstName && reviewer.lastName && reviewer.email) {
      setReviewersList([...reviewersList, { ...reviewer }]);
      handleClose();
    } else {
      // Handle validation or display an error message
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleDelete = (index) => {
    const updatedReviewers = [...reviewersList];
    updatedReviewers.splice(index, 1);
    setReviewersList(updatedReviewers);
  };

  return (
    <Card>
      <Card.Header>
        {" "}
        Suggest Reviewers :
        <div>
          Please suggest potential reviewers for this submission and provide
          specific reasons for your suggestion in the comments box for each
          person. Please note that the editorial office may not use your
          suggestions, but your help is appreciated and may speed up the
          selection of appropriate reviewers.
        </div>{" "}
      </Card.Header>

      <Card.Body>
        <Container>
          <Button variant="primary" onClick={handleShow}>
            Add Reviewer
          </Button>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add/Update Reviewer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formFirstName">
                  <Form.Label>Given/First Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={reviewer.firstName}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formMiddleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="middleName"
                    value={reviewer.middleName}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formLastName">
                  <Form.Label>Family/Last Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={reviewer.lastName}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formDegree">
                  <Form.Label>Degree</Form.Label>
                  <Form.Control
                    type="text"
                    name="degree"
                    value={reviewer.degree}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formPosition">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    type="text"
                    name="position"
                    value={reviewer.position}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formInstitution">
                  <Form.Label>Institution *</Form.Label>
                  <Form.Control
                    type="text"
                    name="institution"
                    value={reviewer.institution}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formDepartment">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    name="department"
                    value={reviewer.department}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>E-mail *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={reviewer.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formReason">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="reason"
                    value={reviewer.reason}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleSubmit}>
                  Save Reviewer
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Given/First Name</th>
                <th>Middle Name</th>
                <th>Family/Last Name</th>
                <th>Degree</th>
                <th>Position</th>
                <th>Institution</th>
                <th>Department</th>
                <th>E-mail</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviewersList.map((reviewer, index) => (
                <tr key={index}>
                  <td>{reviewer.firstName}</td>
                  <td>{reviewer.middleName}</td>
                  <td>{reviewer.lastName}</td>
                  <td>{reviewer.degree}</td>
                  <td>{reviewer.position}</td>
                  <td>{reviewer.institution}</td>
                  <td>{reviewer.department}</td>
                  <td>{reviewer.email}</td>
                  <td>{reviewer.reason}</td>
                  <td>
                    <BsTrash
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      onClick={() => handleDelete(index)}
                    />
                    <BsPencil style={{ cursor: "pointer" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Card.Body>
      <Card.Footer>
        <ActionButtons {...props} />
      </Card.Footer>
    </Card>
  );
};

export default ReviewerFormDialog;
