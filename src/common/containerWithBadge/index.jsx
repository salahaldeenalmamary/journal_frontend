// import { Badge, Card } from "antd";
import React from "react";
import { Badge, Container } from "react-bootstrap";

const ContainerWithBadge = ({ label, children }) => {
  return (
    // <Badge count={label}  status="default">
    //   <Card>{children}</Card>
    // </Badge>
    <Container
      fluid
      className="bg-body-tertiary border border-2 border-secondary-subtle  py-3 my-5 position-relative"
    >
      <Badge className="badge border border-2 text-dark bg-white border-dark-subtle mx-2 position-absolute top-0 translate-middle-y">
        {label}
      </Badge>
      {children}
    </Container>
  );
};

export default ContainerWithBadge;
