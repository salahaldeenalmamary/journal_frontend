import { Button, Form } from "antd";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../utils/submitButton";
const SubmissionButtons = ({
  isFinalStep,
  isFirstStep,
  nextStep,
  previousStep,
  saveChanges,
  form,
}) => {
  // const navigate = useNavigate();
  const handleBack = () => {
    previousStep();
    // navigate(previousStep);
  };

  const handleNext = () => {
    nextStep();
    // navigate(nextStep);
  };
  const handleSaveChanges = () => {
    saveChanges();
  };
  return (
    <Container className="d-flex justify-content-end my-3">
      <Button
        type="primary"
        size="large"
        className="mx-2 shadow"
        onClick={handleSaveChanges}
      >
        Save Changes
      </Button>
      {!isFirstStep && (
        <Button
          type="primary"
          size="large"
          className="mx-2 shadow"
          onClick={handleBack}
        >
          Back
        </Button>
      )}
      {!isFinalStep && (
        <Button
          type="primary"
          size="large"
          className="mx-2 shadow"
          onClick={handleNext}
        >
          Next
        </Button>
      )}
      {isFinalStep && (
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <SubmitButton form={form} size="large" className="mx-2 shadow">
            Finish
          </SubmitButton>
        </Form.Item>
      )}
    </Container>
  );
};
export default SubmissionButtons;
