import React, { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import TransferInformation from "./transferInformation";
import Editors from "./editors";
import Reviewers from "./reviewers";

const EditFormSubmission = ({ initialValues, onSubmit }) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormValues((prevData) => ({ ...prevData, [name]: checked }));
  };

  const formDataArray = Object.entries(formValues).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <Card>
      <Card.Header>
        <Container className="d-flex column-gap-3 justify-content-center">
          <Button variant="primary" type="submit">
            close
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button variant="primary" type="submit">
            Save and close
          </Button>
        </Container>
      </Card.Header>
      <Card.Body>
        <Container>
          <TransferInformation />
          <Editors />
          <Reviewers />
          <Button className="btn-lg float-end m-4">Save</Button>
        </Container>
        {/* <h6> Production Tasks </h6>
        <ListGroup>
          {formValues.ProductionTasks .map((editor, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
              <div>
              editor. SubmissionTargetOnlinePublication:'',
              editor.Date:'',
              editor.TargetNumberofPages:'',
              editor.BlackandWhiteImageCount:'',
              editor.SubmissionTargetPublicationDate:'',
              editor.SubmissionTargetVolume:'',
editorSubmissionTargetIssue:'',
ColorImageCount:'',
ProductionNotes:'',
                <p className="mb-1">Name: {editor.name}</p>
            
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup> */}
      </Card.Body>
    </Card>
  );
};

export default EditFormSubmission;
