
import React from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { BsDownload, BsEye, BsCheckSquare, BsShare } from "react-icons/bs";

const ArticleDetails = () => {
  const article = {
    title: "Sample Article",
    author: "John Doe",
    abstract:
      "This is a sample abstract for the article. The sense of taste is stimulated when nutrients or other chemical compounds activate specialized receptor cells within the oral cavity. Taste helps us decide what to eat and influences how efficiently we digest these foods.",
    content:
      "The sense of taste is stimulated when nutrients or other chemical compounds activate specialized receptor cells within the oral cavity. Taste helps us decide what to eat and influences how efficiently we digest these foods. Human taste abilities have been shaped, in large part, by the ecological niches our evolutionary ancestors occupied and by the nutrients they sought. Early hominoids sought nutrition within a closed tropical forest environment, probably eating mostly fruit and leaves, and early hominids left this environment for the savannah and greatly expanded their dietary repertoire. They would have used their sense of taste to identify nutritious food items. The risks of making poor food selections when foraging not only entail wasted energy and metabolic harm from eating foods of low nutrient and energy content, but also the harmful and potentially lethal ingestion of toxins. The learned consequences of ingested foods may subsequently guide our future food choices. The evolved taste abilities of humans are still useful for the one billion humans living with very low food security by helping them identify nutrients. But for those who have easy access to tasty, energy-dense foods our sensitivities for sugary, salty and fatty foods have also helped cause over nutrition-related diseases, such",
    publishedDate: "2023-01-01",
    category: "Science",
    tags: ["React", "Bootstrap", "Journal"],
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-3">{article.title}</h2>
          <p className="text-muted mb-2">{article.author}</p>
          <p className="mb-4">{article.abstract}</p>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">Details</Card.Title>
              <ul className="list-unstyled mb-4">
                <li>
                  <strong>Published Date:</strong> {article.publishedDate}
                </li>
                <li>
                  <strong>Category:</strong> {article.category}
                </li>
                <li>
                  <strong>Tags:</strong>{" "}
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="primary" className="mr-1">
                      {tag}
                    </Badge>
                  ))}
                </li>
              </ul>
              <Button variant="primary" className="mr-2">
                <BsDownload /> Download PDF
              </Button>
              <Button variant="secondary">
                <BsShare /> Share
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">Article Content</Card.Title>
              <Card.Text>{article.content}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleDetails;
