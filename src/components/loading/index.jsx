import React from "react";
import { Container, Spinner } from "react-bootstrap";

const Loading = () => {
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

export default Loading;
