import React , { useState } from 'react';
import { Table, Button, Form,Modal,Card } from 'react-bootstrap';
import { BsTrash, BsCheck, BsDash } from 'react-icons/bs';

const ProposedReviewerTable = ({ reviewers, handleDelete, handleCheckboxChange }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Proposed By</th>
          <th>Date Proposed</th>
          <th>Notes</th>
          <th>Invited</th>
          <th>Alternate</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {reviewers.map((reviewer) => (
          <tr key={reviewer.id}>
            <td>{reviewer.name}</td>
            <td>{reviewer.proposedBy}</td>
            <td>{reviewer.dateProposed}</td>
            <td>{reviewer.notes}</td>
            <td className="text-center align-middle">
              <Form.Check
                type="checkbox"
                checked={reviewer.invited}
                onChange={() => handleCheckboxChange(reviewer.id, 'invited')}
              />
            </td>
            <td className="text-center align-middle">
              <Form.Check
                type="checkbox"
                checked={reviewer.alternate}
                onChange={() => handleCheckboxChange(reviewer.id, 'alternate')}
              />
            </td>
            <td className="text-center align-middle">
              <Button variant="danger" onClick={() => handleDelete(reviewer.id)}>
                <BsTrash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};





const ProposedReviewer = () => {
  const [proposedReviewers, setProposedReviewers] = useState([
    {
      id: 1,
      name: 'Reviewer 1',
      proposedBy: 'Author 1',
      dateProposed: '2022-01-01',
      notes: ' dolor sit amet.',
      invited: false,
      alternate: false,
    },
    {
      id: 2,
      name: 'Reviewer 1',
      proposedBy: 'Author 1',
      dateProposed: '2022-01-01',
      notes: ' dolor sit amet.',
      invited: false,
      alternate: false,
    },
    {
      id: 3,
      name: 'Reviewer 1',
      proposedBy: 'Author 1',
      dateProposed: '2022-01-01',
      notes: ' dolor sit amet.',
      invited: false,
      alternate: false,
    },
    {
      id: 4,
      name: 'Reviewer 1',
      proposedBy: 'Author 1',
      dateProposed: '2022-01-01',
      notes: ' dolor sit amet.',
      invited: true,
      alternate: false,
    },
 
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReviewerId, setSelectedReviewerId] = useState(null);

  const handleDelete = (id) => {
    setSelectedReviewerId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    const updatedReviewers = proposedReviewers.filter((reviewer) => reviewer.id !== selectedReviewerId);
    setProposedReviewers(updatedReviewers);
    setShowDeleteModal(false);
  };

  const handleCheckboxChange = (id, type) => {
    const updatedReviewers = proposedReviewers.map((reviewer) =>
      reviewer.id === id ? { ...reviewer, [type]: !reviewer[type] } : reviewer
    );
    setProposedReviewers(updatedReviewers);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedReviewerId(null);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card>
            <Card.Header>Proposed Reviewers</Card.Header>
            <Card.Body>
              <ProposedReviewerTable
                reviewers={proposedReviewers}
                handleDelete={handleDelete}
                handleCheckboxChange={handleCheckboxChange}
              />
            </Card.Body>
          </Card>

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Reviewer</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this reviewer?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteConfirmed}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProposedReviewer;
