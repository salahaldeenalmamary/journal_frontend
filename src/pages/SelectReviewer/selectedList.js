import React, { useState } from 'react';
import { Form, Button, ListGroup, Modal, Card, FormGroup } from 'react-bootstrap';
import { BsTrash, BsArrowRightShort, BsEnvelope } from 'react-icons/bs';

const ReviewerManager = () => {
  const [selectedReviewer, setSelectedReviewer] = useState('');
  const [invitedReviewers, setInvitedReviewers] = useState([
    { id: 1, name: 'Reviewer 1', invitedDate: new Date('2022-01-01') },
    { id: 4, name: 'Reviewer 2', invitedDate: new Date('2022-02-01') },
  ]);
  const [alternateReviewers, setAlternateReviewers] = useState([
    { id: 2, name: 'Reviewer 4', invitedDate: new Date('2022-01-01') },
    { id: 4, name: 'Reviewer 2', invitedDate: new Date('2022-02-01') },
  ]);
  const [message, setMessage] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSwapDialog, setShowSwapDialog] = useState(false);
  const [selectedInvitedReviewer, setSelectedInvitedReviewer] = useState(null);
  const [selectedAlternateReviewer, setSelectedAlternateReviewer] = useState(null);
  const handleReviewerChange = (e) => {
    setSelectedReviewer(e.target.value);
  };

  const handleInviteAlternate = () => {
  
    setShowInviteModal(true);
  };

  const handleSendInvite = () => {
    // For demonstration purposes, just move the reviewer from Alternate to Invited
    setAlternateReviewers(alternateReviewers.filter((r) => r !== selectedReviewer));
    setInvitedReviewers([...invitedReviewers, selectedReviewer]);
    setShowInviteModal(false);
    setMessage('');
  };

  const handleUninvite = (reviewerName, isAlternate) => {
    if (isAlternate) {
      setAlternateReviewers((prevAlternateReviewers) =>
        prevAlternateReviewers.filter((r) => r.name !== reviewerName)
      );
    } else {
      setInvitedReviewers((prevInvitedReviewers) =>
        prevInvitedReviewers.filter((r) => r.name !== reviewerName)
      );
    }
  };

  const handlePromoteToInvited = (reviewer) => {
    setAlternateReviewers(alternateReviewers.filter((r) => r !== reviewer));
    setInvitedReviewers([...invitedReviewers, reviewer]);
  };

 

  const handleSwapDialogClose = () => {
    setShowSwapDialog(false);
  };

  const handleSwap = () => {
    if (selectedInvitedReviewer && selectedAlternateReviewer) {
      setInvitedReviewers((prevInvitedReviewers) =>
        prevInvitedReviewers.map((reviewer) =>
          reviewer.id === selectedInvitedReviewer.id
            ? { ...reviewer, invitedDate: new Date() } 
            : reviewer
        )
      );

      setAlternateReviewers((prevAlternateReviewers) =>
        prevAlternateReviewers.map((reviewer) =>
          reviewer.id === selectedAlternateReviewer.id
            ? { ...reviewer, invitedDate: new Date() } 
            : reviewer
        )
      );

      handleSwapDialogClose();
    }
  };
  const handleSwapDialogOpen = (reviewer) => {
    setSelectedReviewer(reviewer);
    setShowSwapDialog(true);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card>
            <Card.Header>Selected Reviewers</Card.Header>
            <Card>
              <Button variant="secondary" block>
                Invited Reviewers:
              </Button>
              <Card.Body>
                <ListGroup>
                  {invitedReviewers.map((reviewer) => (
                    <ListGroup.Item
                      key={reviewer.name}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        {reviewer.name}
                        {reviewer.invitedDate && (
                          <small className="text-muted ml-2">
                            Invited on {reviewer.invitedDate.toLocaleDateString()}
                          </small>
                        )}
                      </div>
                      <div>
                        <Button
                          variant="danger"
                          onClick={() => handleUninvite(reviewer.name, false)}
                          className="ml-2"
                        >
                          <BsTrash />
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
            <Card>
              <Button variant="secondary">
                Alternate Reviewers:
              </Button>
              <Card.Body>
                <ListGroup>
                  {alternateReviewers.map((reviewer) => (
                    <ListGroup.Item
                      key={reviewer.name}
                      className="d-flex justify-content-between align-items-center"
                    >
                      {reviewer.name}
                      <div>
                        <Button
                          variant="danger"
                          onClick={() => handleUninvite(reviewer.name, true)}
                          className="ml-2"
                        >
                          <BsTrash />
                        </Button>
                        <Button variant="info" onClick={handleInviteAlternate} className="ml-2">
                          <BsEnvelope />
                        </Button>
                        <Button
                          variant="info"
                          onClick={() => handlePromoteToInvited(reviewer)}
                          className="ml-2"
                        >
                          <BsArrowRightShort />
                        </Button>
                        <Button
                          variant="info"
                          onClick={() => handleSwapDialogOpen(reviewer)}
                          className="ml-2"
                        >
                          Swap
                        </Button>
                        
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
            {/* Invite Modal */}
            <Modal show={showInviteModal} onHide={() => setShowInviteModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Send Invitation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="inviteMessage">
                  <Form.Label>Invite Message:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your invitation message"
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowInviteModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSendInvite}>
                  Send Invite
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Swap Dialog */}
             {/* Swap Dialog */}
             <Modal show={showSwapDialog} onHide={handleSwapDialogClose}>
            <Modal.Header closeButton>
              <Modal.Title>Select Reviewers to Swap</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="selectInvitedReviewer">
                <Form.Label>Select Invited Reviewer:</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) =>
                    setSelectedInvitedReviewer(
                      invitedReviewers.find((reviewer) => reviewer.id === parseInt(e.target.value))
                    )
                  }
                >
                  <option value="">Select...</option>
                  {invitedReviewers.map((reviewer) => (
                    <option key={reviewer.id} value={reviewer.id}>
                      {reviewer.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="selectAlternateReviewer">
                <Form.Label>Select Alternate Reviewer:</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) =>
                    setSelectedAlternateReviewer(
                      alternateReviewers.find((reviewer) => reviewer.id === parseInt(e.target.value))
                    )
                  }
                >
                  <option value="">Select...</option>
                  {alternateReviewers.map((reviewer) => (
                    <option key={reviewer.id} value={reviewer.id}>
                      {reviewer.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleSwapDialogClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSwap}>
                Swap
              </Button>
            </Modal.Footer>
          </Modal>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReviewerManager;
