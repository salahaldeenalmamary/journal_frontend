// ReviewForm.js
import React, { useState } from 'react';
import { Container, Card, Button, Form,Row,Col } from 'react-bootstrap';
import DropdownSection from '../../components/DropdownSection';
import CheckboxSection from '../../components/CheckboxSection';
import RadioSection from '../../components/RadioSection';

const QuestionsReviewer = () => {
  const [willingToReview, setWillingToReview] = useState('');
  const [overallRating, setOverallRating] = useState([]);
  const [expeditedDecision, setExpeditedDecision] = useState('');
  const [reviewerCommentsToAuthor, setReviewerCommentsToAuthor] = useState('');
  const [reviewerCommentsToEditor, setReviewerCommentsToEditor] = useState('');
  const [transferConsentInfo, setTransferConsentInfo] = useState('');
  const [transferConsentReview, setTransferConsentReview] = useState('');

  const handleWillingToReviewChange = (event) => {
    setWillingToReview(event.target.value);
  };

  const handleOverallRatingChange = (event) => {
    const { value } = event.target;
    setOverallRating((prevRatings) => {
      return prevRatings.includes(value)
        ? prevRatings.filter((rating) => rating !== value)
        : [...prevRatings, value];
    });
  };

  const handleExpeditedDecisionChange = (event) => {
    setExpeditedDecision(event.target.value);
  };

  const handleReviewerCommentsToAuthorChange = (event) => {
    setReviewerCommentsToAuthor(event.target.value);
  };

  const handleReviewerCommentsToEditorChange = (event) => {
    setReviewerCommentsToEditor(event.target.value);
  };

  const handleTransferConsentInfoChange = (event) => {
    setTransferConsentInfo(event.target.value);
  };

  const handleTransferConsentReviewChange = (event) => {
    setTransferConsentReview(event.target.value);
  };
  const handleViewerAttachments = () => {
   
    console.log('Viewer Attachments action');
  };

  const handleProofAndPrint = () => {
   
    console.log('Proof & Print action');
  };

  const handleProcessCancel = () => {
  
    console.log('Process Cancel action');
  };

  const handleSubmit = () => {
   
    console.log('Form submitted:', {
      willingToReview,
      overallRating,
      expeditedDecision,
      reviewerCommentsToAuthor,
      reviewerCommentsToEditor,
      transferConsentInfo,
      transferConsentReview,
    });
  };


  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Review Questions</Card.Title>
          <hr className="my-4" />
          <RadioSection
            label="Are you willing to review the revision of this manuscript?"
            value={willingToReview}
            options={['Yes', 'No']}
            onChange={handleWillingToReviewChange}
          />
        
          <hr className="my-4" />

          <CheckboxSection
            label="What is your overall rating of the paper?"
            values={overallRating}
            options={[
              '0 - Reject without resubmit',
              '1 - Reject with significant re-organization and revision',
              '2 - Reject with revision',
              '3 - Accept with minor revision',
              '4 - Outstanding',
            ]}
            onChange={handleOverallRatingChange}
          />
<hr className="my-4" />
          <RadioSection
            label="For this expedited paper, please confirm if the paper should be accepted or rejected."
            value={expeditedDecision}
            options={['Please select a response', 'Accept', 'Reject']}
            onChange={handleExpeditedDecisionChange}
          />
<hr className="my-4" />
          <Form.Group controlId="reviewerCommentsToAuthor">
            <Form.Label>Reviewer Comments to Author</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reviewerCommentsToAuthor}
              onChange={handleReviewerCommentsToAuthorChange}
            />
          </Form.Group>
          <hr className="my-4" />
          <Form.Group controlId="reviewerCommentsToEditor">
            <Form.Label>Reviewer Comments to Editor</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reviewerCommentsToEditor}
              onChange={handleReviewerCommentsToEditorChange}
            />
          </Form.Group>
          <hr className="my-4" />
          <Card.Title className="mt-4">Transfer Authorization</Card.Title>

          <RadioSection
            label="If this submission is transferred to another publication, do we have your consent to include your identifying information?"
            value={transferConsentInfo}
            options={['Yes', 'No']}
            onChange={handleTransferConsentInfoChange}
          />
<hr className="my-4" />
          <RadioSection
            label="If this submission is transferred to another publication, do we have your consent to include your review?"
            value={transferConsentReview}
            options={['Yes', 'No']}
            onChange={handleTransferConsentReviewChange}
          />
<hr className="my-4" />
<Row className="mb-3 p-4">
          <Col sm={7}>
            <Button variant="primary" onClick={handleViewerAttachments} className="me-2 ">
              Viewer Attachments
            </Button>
            <Button variant="primary" onClick={handleProofAndPrint} className="me-2">
              Proof & Print
            </Button>
            <Button variant="danger" onClick={handleProcessCancel} className="me-2">
              Process Cancel
            </Button>
            <Button variant="success"onClick={handleSubmit}>
              Save
            </Button>
          </Col>
        </Row>
       
        </Card.Body>
      </Card>
      
    </Container>
  );
};

export default QuestionsReviewer;
