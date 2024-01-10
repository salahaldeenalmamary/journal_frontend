import React from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { BsDownload, BsShare } from "react-icons/bs";
// import html2pdf from "html2pdf.js";

// For converting HTML to PDF (include this in your project)

const ArticleView = ({ article }) => {
  const handleDownloadPDF = () => {
    const content = document.getElementById("article-content");
    const pdfOptions = {
      margin: 10,
      filename: "article.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Generate PDF and trigger download
    html2pdf()
      .from(content)
      .set(pdfOptions)
      .outputPdf((pdf) => {
        // Create a blob from the PDF content
        const blob = new Blob([pdf], { type: "application/pdf" });

        // Create a download link and trigger download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = pdfOptions.filename;
        link.click();

        // Open the PDF in a new tab
        window.open(link.href, "_blank");
      });
  };

  const handleShareSocialMedia = () => {
    // Placeholder function for social media sharing
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

export default ArticleView;
