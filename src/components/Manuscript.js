import React from "react";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import ControlledEditor from "./ControlledEditor";
import AuthorFormStep from "./AuthorFormStep";
import ActionButtons from "./ActionButtons";

const Manuscript = (props) => {
  const headerStyle = {
    backgroundColor: "#255384", // Customize the color as needed
    color: "#fff", // Text color
    padding: "1px", // Add padding for better appearance
    marginBottom: "2px", // Add margin for separation
  };
  return (
    <Accordion defaultActiveKey="0">
      {/* Title */}
      <Accordion.Item className="show" as={Card.Header} eventKey="0">
        <div className="rows">
          <Accordion.Button style={headerStyle}
            type="button"
            className="col-12 border m-2 text-start"
          >
            Title
          </Accordion.Button>
        </div>
        <Accordion.Body>
          <Card.Body>
            <Form.Group controlId="formTitle">
              <Form.Label>Title:</Form.Label>
              <ControlledEditor></ControlledEditor>
            </Form.Group>
          </Card.Body>
        </Accordion.Body>
      </Accordion.Item>

      {/* Abstract */}
      <Accordion.Item as={Card.Header} eventKey="1">
        <div className="rows">
          <Accordion.Button
            type="button"  style={headerStyle}
            className="col-12 border m-2 text-start"
          >
            Abstract
          </Accordion.Button>
        </div>
        <Accordion.Body>
          <Card.Body>
            <Form.Group controlId="formAbstract">
              <Form.Label>Abstract:</Form.Label>
              <ControlledEditor></ControlledEditor>
            </Form.Group>
          </Card.Body>
        </Accordion.Body>
      </Accordion.Item>

      {/* Keywords */}
      <Accordion.Item as={Card.Header} eventKey="2">
        <div className="rows">
          <Accordion.Button  style={headerStyle}
            type="button"
            className="col-12 border m-2 text-start"
          >
            Keywords
          </Accordion.Button>
        </div>
        <Accordion.Body>
          <Card.Body>
            <Form.Group controlId="formKeywords">
              <Form.Label>Keywords:</Form.Label>
              <Form.Control type="text" placeholder="Enter keywords" />
            </Form.Group>
          </Card.Body>
        </Accordion.Body>
      </Accordion.Item>

      {/* Authors */}
      <Accordion.Item as={Card.Header} eventKey="3">
        <div className="rows">
          <Accordion.Button
            type="button"  style={headerStyle}
            className="col-12 border m-2 text-start"
          >
            Authors
          </Accordion.Button>
        </div>
        <Accordion.Body>
          <Card.Body>
            <Form.Group controlId="formAuthors">
              <Form.Label>Authors:</Form.Label>
              <AuthorFormStep />
            </Form.Group>
          </Card.Body>
        </Accordion.Body>
      </Accordion.Item>

      {/* Funding Information */}
      <Accordion.Item as={Card.Header} eventKey="4">
        <div className="rows">
          <Accordion.Button
            type="button"   style={headerStyle}
            className="col-12 border m-2 text-start"
          >
            Funding Information
          </Accordion.Button>
        </div>

        <Accordion.Body>
          <Card.Body>
            <Form.Group controlId="formFunding">
              <Form.Label>Funding Information:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter funding information"
              />
            </Form.Group>
          </Card.Body>
        </Accordion.Body>
      </Accordion.Item>

      {/* Submit Button */}
      <ActionButtons {...props} />
    </Accordion>
  );
};

export default Manuscript;
