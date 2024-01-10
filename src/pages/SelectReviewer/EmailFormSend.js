import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import EmailFormDialog from './EmailFormDialog'; // Adjust the path based on your file structure

const EmailFormSend = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleShowEmailForm = () => {
    setShowEmailForm(true);
  };

  const handleCloseEmailForm = () => {
    setShowEmailForm(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShowEmailForm}>
        Open Email Form
      </Button>

      <EmailFormDialog show={showEmailForm} handleClose={handleCloseEmailForm} />
    </div>
  );
};

export default EmailFormSend;
