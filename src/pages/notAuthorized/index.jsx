import React from "react";
import { Button, Result } from "antd";
import { LinkContainer } from "react-router-bootstrap";
const NotAuthorized = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <LinkContainer to="/home">
        <Button type="primary">Back Home</Button>
      </LinkContainer>
    }
  />
);
export default NotAuthorized;
