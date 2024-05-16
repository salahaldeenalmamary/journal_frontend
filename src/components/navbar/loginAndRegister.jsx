import { Button, Space } from "antd";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";

const LoginAndRegister = () => {
  return (
    <Space className="mx-3 mt-1" size={"middle"} align="center">
      <LinkContainer to="/login">
        <Button type="primary" ghost={true}>
          Login
        </Button>
      </LinkContainer>
      <LinkContainer to="/register">
        <Button type="primary" ghost={true}>
          Sign Up
        </Button>
      </LinkContainer>
    </Space>
  );
};

export default LoginAndRegister;
