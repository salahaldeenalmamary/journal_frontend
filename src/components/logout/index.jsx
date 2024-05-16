import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import auth from "../../services/authService";

const Logout = () => {
  useEffect(() => {
    auth.logout();
    // navigate('/')
    window.location = "/login";
  }, []);
  return (
    <Container
      fluid
      className="d-flex align-items-center mx-4 justify-content-center my-4 py-4 "
    >
      <h1 className="display-1 fw-bold me-5">Loading...</h1>
      <Spinner
        style={{ width: "4rem", height: "4rem" }}
        role="status"
        aria-hidden="true"
      ></Spinner>
    </Container>
  );
};

export default Logout;
