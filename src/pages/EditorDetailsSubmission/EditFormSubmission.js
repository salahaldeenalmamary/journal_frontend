import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, ListGroup } from 'react-bootstrap';

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

  const formDataArray = Object.entries(formValues).map(([key, value]) => ({ name: key, value }));

  return (
    <Card style={{ width: '100%', maxWidth: '1000px', margin: 'auto' }}>
      <Card.Header> <Row style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}>    <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
        close
      </Button>
        <Button variant="primary" type="submit" style={{ marginTop: '10px', marginLeft: '10px' }}>
          Save
        </Button>

        <Button variant="primary" type="submit" style={{ marginTop: '10px', marginLeft: '10px' }}>
          Save and close
        </Button>
      </Row></Card.Header>
      <Card.Body>

        <Form onSubmit={handleSubmit}>
          {formDataArray.map((formDataItem) => (
            <div key={formDataItem.name} className="mb">
              <Row>
                <Col>
                  <Form.Label>
                    {formDataItem.name !== 'BindedEditor'
                      && formDataItem.name !== 'ReviewersProposedbyEditors' && formDataItem.name !== 'AlternateReviewers' && formDataItem.name !== 'ProductionTasks' ? formDataItem.name.replace(/([A-Z])/g, ' $1') : ''}
                  </Form.Label>

                </Col>
                <Col>
                  {formDataItem.name === 'manuscriptNotescheck' ? (
                    <Form.Check
                      type="checkbox"
                      label={`Display ${formDataItem.name}`}
                      name={formDataItem.name}
                      checked={formDataItem.value}
                      onChange={handleCheckboxChange}
                    />
                  ) : (
                    <>
                      {formDataItem.name !== 'abstract' && formDataItem.name !== 'background' && formDataItem.name !== 'manuscriptNotes' && formDataItem.name !== 'BindedEditor'
                        && formDataItem.name !== 'ReviewersProposedbyEditors' && formDataItem.name !== 'AlternateReviewers' && formDataItem.name !== 'ProductionTasks' ? (
                        <Form.Control
                          type="text"
                          name={formDataItem.name}
                          value={formDataItem.value}
                          onChange={handleChange}
                        />
                      ) : null}
                    </>
                  )}
                </Col>
              </Row>
              {formDataItem.name === 'abstract' || formDataItem.name === 'background' || formDataItem.name === 'manuscriptNotes' ? (
                <Row>
                  <Col>
                    <Form.Control

                      as="textarea"
                      name={formDataItem.name}
                      value={formDataItem.value}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              ) : null}
            </div>
          ))}
        </Form>

        <h6> Binded Editor </h6>
        <ListGroup>
          {formValues.BindedEditor.map((editor, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="mb-1">Name: {editor.name}</h5>
                <h5 className="mb-1">Role: {editor.role}</h5>
                <p className="mb-1">Date Assign: {editor.dateAssign}</p>
                <p className="mb-1">Date Completed: {editor.dateCompleted}</p>
                <p className="mb-1">Elapsed Days: {editor.elapsedDays}</p>
                <p className="mb-1">Recommendation: {editor.recommendation}</p>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <h6> Alternate Reviewers </h6>
        <ListGroup>
          {formValues.AlternateReviewers.map((editor, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
              <div>
                <p className="mb-1">Name: {editor.name}</p>

              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h6> Reviewers Proposed by Editors </h6>
        <ListGroup>
          {formValues.ReviewersProposedbyEditors.map((editor, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
              <div>
                <p className="mb-1">Name: {editor.name}</p>

              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

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
