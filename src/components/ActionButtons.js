import React, { useState } from "react";

import { Row, Col, Button, Card } from "react-bootstrap";
const ActionButtons = ({
  currentStep,
  totalSteps,
  nextStep,
  previousStep,
  lastStep,
  valid,
}) => {
  const handleBack = () => {
    previousStep();
  };

  const handleNext = () => {
    nextStep();
  };

  const handleFinish = () => {
    lastStep();
  };

  return (
    <Row className="justify-content-end my-1">
      {currentStep > 1 && (
        <Button className="btn-md mx-2" onClick={handleBack}>
          Back
        </Button>
      )}
      {currentStep < totalSteps && (
        <Button
          className={`btn-md mx-2 ${valid && "disabled"}`}
          onClick={handleNext}
          disabled={valid}
        >
          Next
        </Button>
      )}
      {currentStep === totalSteps && (
        <Button
          className={`btn-md mx-2 ${valid && "disabled"}`}
          onClick={handleFinish}
          disabled={valid}
        >
          Finish
        </Button>
      )}
    </Row>
  );
};
export default ActionButtons;
