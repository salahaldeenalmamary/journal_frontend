import React from "react";
import { Button, Result } from "antd";
import { LinkContainer } from "react-router-bootstrap";
const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <LinkContainer to="/home">
        <Button type="primary">Back Home</Button>
      </LinkContainer>
    }
  />
);
export default NotFound;
