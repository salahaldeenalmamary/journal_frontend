
import React from "react";
import { Container, Row, Col, Card, Badge, Button, Form } from "react-bootstrap";
const ReviewerFeedback  = () => {
    const article = {
      title: "Find Reviewers using Scopus video",
      author: "Carol Bergin (Reviewer 1)",
      reviewerRecommendationTerm: "N/A",
      overallReviewerManuscriptRating: "N/A",
      rateReview: "N/A",
      customReviewQuestions: [
        "Are you willing to review the revision of this manuscript?",
        "What is your overall rating of the paper?",
        "For this expedited paper, please confirm if the paper should be accepted or rejected.",
      ],
      manuscriptRatingQuestions: [
        "Paper can be accepted after the minor revision",
        "Please rate on a scale of 1-3 (1 being the lowest and 3 being the highest) on 'The subject addressed in this article is worthy of investigation'.",
        "Please rate on a scale of 1-3 (1 being the lowest and 3 being the highest) on 'The information presented was new'.",
        "Please rate on a scale of 1-3 (1 being the lowest and 3 being the highest) on 'The conclusions were supported by the data'.",
      ],
      commentsToAuthor: "Please make the minor revisions as advised.",
      commentsToEditor: "Please make the minor revisions as advised.",
      transferAuthorization: "Yes",
      minorRevisionResponse: "Yes",
      acceptWithMinorRevisionResponse: "3",
    };
    const headerStyle = {
      backgroundColor: "#255384", // Customize the color as needed
      color: "#fff", // Text color
      padding: "15px", // Add padding for better appearance
      marginBottom: "2px", // Add margin for separation
    };
  
    return (
      <Container className="mt-4">
        <Row>
          <Col>
            <div style={headerStyle}>
              <h2>{article.title}</h2>
              <p className="text-muted">{article.author}</p>
            </div>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title style={headerStyle}>Reviewer Recommendation Term: </Card.Title>
                {article.reviewerRecommendationTerm}
                <Card.Title style={headerStyle}>Overall Reviewer Manuscript Rating: </Card.Title>
                {article.overallReviewerManuscriptRating}
                <Card.Title style={headerStyle}>Rate Review:</Card.Title>
                {article.rateReview}
                <Card.Title style={headerStyle}>Custom Review Question(s):</Card.Title>
                <ul>
                  {article.customReviewQuestions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
                <Card.Title style={headerStyle}>Manuscript Rating Question(s):</Card.Title>
                <ul>
                  {article.manuscriptRatingQuestions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
                <Card.Title style={headerStyle}>Comments to Author:</Card.Title>
                {article.commentsToAuthor}
                <Card.Title style={headerStyle}>Comments to Editor: </Card.Title>
                {article.commentsToEditor}
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title style={headerStyle} >Transfer Authorization: {article.transferAuthorization}</Card.Title>
                <Card.Title>Minor Revision: {article.minorRevisionResponse}</Card.Title>
                <Card.Title>Response to 'Accept with Minor Revision': {article.acceptWithMinorRevisionResponse}</Card.Title>
              </Card.Body>
            </Card>
            {/* <Button variant="outline-primary">
              <BsDownload /> Download PDF
            </Button>
            <Button variant="outline-secondary" className="ml-2">
              <BsShare /> Share on Social Media
            </Button> */}
          </Col>
        </Row>
      </Container>
    );
  };