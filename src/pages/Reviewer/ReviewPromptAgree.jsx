import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ReviewPromptAgree = () => {
  return (
    <Container style={styles.container}>
      <Alert variant="info" style={styles.message}>
        Thank you for agreeing to review Manuscript Number. To view the manuscript, please click the 'Pending Assignments'
        link below.
      </Alert>
      <div >
        <Link to="/paddingAssignmentsReViewer">
          <Button variant="primary">Pending Assignments</Button>
        </Link>
        <Link to="/reviews">
          <Button variant="secondary">Main Menu</Button>
        </Link>
      </div>
    </Container>
  );
};

const styles = {
  container: {
    marginTop: '20px',
    textAlign: 'center',
  },
  message: {
    marginBottom: '20px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
};

export default ReviewPromptAgree;
