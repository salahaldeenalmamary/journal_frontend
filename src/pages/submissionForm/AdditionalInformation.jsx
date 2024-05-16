import React from "react";
import { Card, Container, Row, Col, FormCheck } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
const AdditionalInformation = ({ answers, ...res }) => {
  const dispatch = useDispatch();
  const articleTypes = [
    { value: "none", label: "none" },
    { value: "full_length_article", label: "Full Length Article" },
    { value: "review", label: "Review" },
    { value: "short_communication", label: "Short Communication" },
    { value: "case_report", label: "Case Report" },
    { value: "editorial", label: "Editorial" },
    { value: "micro_article", label: "Micro Article" },
    { value: "video_article", label: "Video Article" },
  ];
  const handleSelectChange = (option) => {
    onOptionSelect(option);
    // setSelectedOptions(option);
  };
  return (
    <Card className="shadow ">
      <Card.Header>
        <Card.Title>Questions</Card.Title>
      </Card.Header>
      <Card.Body>
        <Container className="border border-dark rounded p-4 my-4">
          <Row>
            <p>
              Please suggest potential reviewers for this submission and provide
              specific reasons for your suggestion in the comments box for each
              person. Please note that the editorial office may not use your
              suggestions, but your help is appreciated and may speed up the
              selection of appropriate reviewers.
            </p>
          </Row>
          <Row className="align-items-center">
            <Col sm={2}>
              <h6 className="text-danger">Answer is Required</h6>
            </Col>
            <Col sm={3}>
              <Select
                hideSelectedOptions
                className=""
                options={articleTypes}
                // value={articleType}
                onChange={handleSelectChange}
              />
            </Col>
          </Row>
        </Container>
        <Container className="border border-dark rounded p-4 my-4">
          <Row>
            <p>
              Please suggest potential reviewers for this submission and provide
              specific reasons for your suggestion in the comments box for each
              person. Please note that the editorial office may not use your
              suggestions, but your help is appreciated and may speed up the
              selection of appropriate reviewers.
            </p>
          </Row>
          <Row className="">
            <Col sm={2}>
              <h6 className="text-danger">Answer is Required</h6>
            </Col>
            <Col sm={6}>
              <FormCheck
                className="mb-2"
                label="Please Select"
                name="questionTow"
                type="radio"
              />
              <FormCheck
                className="mb-2"
                label="I confirm that"
                name="questionTow"
                type="radio"
              />
            </Col>
          </Row>
        </Container>
        <Container className="border border-dark rounded p-4 my-4">
          <Row>
            <p>
              Please suggest potential reviewers for this submission and provide
              specific reasons for your suggestion in the comments box for each
              person. Please note that the editorial office may not use your
              suggestions, but your help is appreciated and may speed up the
              selection of appropriate reviewers.
            </p>
          </Row>
          <Row className="align-items-center">
            <Col sm={3}>
              <Select
                hideSelectedOptions
                id="selectTypes"
                className=""
                options={articleTypes}
                // value={articleType}
                onChange={handleSelectChange}
              />
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default AdditionalInformation;
