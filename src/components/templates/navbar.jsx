// Navbar.js
import React from "react";
import { Navbar, Nav, Button, Image } from "react-bootstrap";
import AuthorSubmissionForm from "../AuthorSubmissionForm";
import Admin from "../Admin";

const NavigationBar = () => {
  return (
    <Navbar className="bg-dark p-3 mb-3" expand="lg">
      <div className="container-fluid">
        <Navbar.Brand>
          <img
            src="data:image/png;base64,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"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle color="light" aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/author" className="text-secondary">
              Home
            </Nav.Link>
            <Nav.Link className="text-white">About</Nav.Link>
            <Nav.Link className="text-white">Contact</Nav.Link>
            <Nav.Link className="text-white"  href="/reviewerManagerMain">search</Nav.Link>
            <Nav.Link className="text-white"  href="/mainSubmainDetails">mainSubmainDetails</Nav.Link>
            <Nav.Link className="text-white"  href="/searchReviewerMain">searchReviewerMain</Nav.Link>
            <Nav.Link className="text-white" href="/AuthorSubmissionForm">
              
              Submission
            </Nav.Link>
            
            <Nav.Link className="text-white" href="/Admin">
              Admin
            </Nav.Link>
          </Nav>
          <Button href="/login" className="btn btn-dark btn-outline-light mx-3">
            Login
          </Button>
          <Button className="btn btn-warning">Sign Up</Button>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
