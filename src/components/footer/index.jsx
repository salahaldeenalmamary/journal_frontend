// Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./footer.css";
import { LinkContainer } from "react-router-bootstrap";

const Footer = () => {
  return (
    <Container fluid className="mx-4">
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
        <div className="col mb-3">
          <a
            href="https://getbootstrap.com/"
            className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
          >
            OJW
            {/* <svg className="bi me-2" width="40" height="32">
              <use xlink:href="#bootstrap" />
            </svg> */}
          </a>
          <p className="text-body-secondary">&copy; 2023</p>
        </div>
        <div className="col mb-3"></div>
        <div className="col mb-3">
          <h5>Section</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <LinkContainer to={"./footer"}>
                <a className="nav-link p-0 text-body-secondary">Home</a>
              </LinkContainer>
            </li>
            <li className="nav-item mb-2">
              <LinkContainer to={"./footer"}>
                <a className="nav-link p-0 text-body-secondary">Features</a>
              </LinkContainer>
            </li>
            <li className="nav-item mb-2">
              <LinkContainer to={"./footer"}>
                <a className="nav-link p-0 text-body-secondary">Pricing</a>
              </LinkContainer>
            </li>
            <li className="nav-item mb-2">
              <LinkContainer to={"./footer"}>
                <a className="nav-link p-0 text-body-secondary">FAQs</a>
              </LinkContainer>
            </li>
            <li className="nav-item mb-2">
              <LinkContainer to={"./footer"}>
                <a className="nav-link p-0 text-body-secondary">About</a>
              </LinkContainer>
            </li>
          </ul>
        </div>
        <div className="col mb-3">
          <h5>Section</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <LinkContainer to={"./footer"}>
                <a className="nav-link p-0 text-body-secondary">Home</a>
              </LinkContainer>
            </li>
            <li className="nav-item mb-2">
              <LinkContainer to={"./footer"}>
                <a className="nav-link p-0 text-body-secondary">Features</a>
              </LinkContainer>
            </li>
            <li className="nav-item mb-2">
              <LinkContainer to={"./footer"}>
                <a className="nav-link p-0 text-body-secondary">Pricing</a>
              </LinkContainer>
            </li>
            <li className="nav-item mb-2">
              <LinkContainer to={"./footer"}>
                <a className="nav-link p-0 text-body-secondary">FAQs</a>
              </LinkContainer>
            </li>
            <li className="nav-item mb-2">
              <LinkContainer to={"./footer"}>
                <a className="nav-link p-0 text-body-secondary">About</a>
              </LinkContainer>
            </li>
          </ul>
        </div>
        <div className="col mb-3">
          <h5>Section</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <LinkContainer to={"./footer"}>
                <a className="nav-link p-0 text-body-secondary">Home</a>
              </LinkContainer>
            </li>
            <li className="nav-item mb-2">
              <LinkContainer to={"./footer"}>
                <a className="nav-link p-0 text-body-secondary">Features</a>
              </LinkContainer>
            </li>
            <li className="nav-item mb-2">
              <LinkContainer to={"./footer"}>
                <a className="nav-link p-0 text-body-secondary">Pricing</a>
              </LinkContainer>
            </li>
            <li className="nav-item mb-2">
              <LinkContainer to={"./footer"}>
                <a className="nav-link p-0 text-body-secondary">FAQs</a>
              </LinkContainer>
            </li>
            <li className="nav-item mb-2">
              <LinkContainer to={"./footer"}>
                <a className="nav-link p-0 text-body-secondary">About</a>
              </LinkContainer>
            </li>
          </ul>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
{
  /* <footer classNameName="bg-dark text-light mt-auto py-3">
  <Container>
    <Row>
      <Col>
        <p>© 2023 Your Company</p>
      </Col>
      <Col>
        <p>Contact: contact@yourcompany.com</p>
      </Col>
    </Row>
  </Container>
</footer>; */
}
