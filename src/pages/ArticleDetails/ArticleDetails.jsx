import React from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";

const ArticleDetails = () => {
  const article = {
    title: "Sample Article",
    author: "John Doe",
    abstract:
      "This is a sample abstract for the article.The sense of taste is stimulated when nutrients or other chemical compoundsThe sense of taste is stimulated when nutrients or other chemical compounds",
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
          <h2>{article.title}</h2>
          <p className="text-muted">{article.author}</p>
          <p>{article.abstract}</p>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Details</Card.Title>
              <ul className="list-unstyled">
                <li>
                  <strong>Published Date:</strong> {article.publishedDate}
                </li>
                <li>
                  <strong>Category:</strong> {article.category}
                </li>
                <li>
                  <strong>Tags:</strong>{" "}
                  {article.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </li>
              </ul>
              <Button variant="outline-primary" onClick={handleDownloadPDF}>
                <BsDownload /> Download PDF
              </Button>
              <Button
                variant="outline-secondary"
                className="mt-2"
                onClick={handleShareSocialMedia}
              >
                <BsShare /> Share on Social Media
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body id="article-content">
              <Card.Title>Article Content</Card.Title>
              <Card.Text>{article.content}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body id="article-content">
              <Card.Title>Article Content</Card.Title>
              <Card.Text>{article.content}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleDetails;
