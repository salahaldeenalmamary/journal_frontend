import React from "react";
import { Anchor, Col, Row } from "react-bootstrap";

import ContainerWithBadge from "../../common/containerWithBadge";
import { Form, Input } from "antd";

const LoginDetails = ({ formik }) => {
  const columnsSm = {
    label: { span: 6, offset: 0, order: 1 },
    input: { span: 12, offset: 0, order: 3 },
    link: { span: 6, offset: 0, order: 2 },
  };
  const columnsMd = {
    label: { span: 4, offset: 0, order: 1 },
    input: { span: 5, offset: 0, order: 2 },
    link: { span: 3, offset: 0, order: 3 },
  };
  const columnsLg = {
    label: { span: 4, offset: 0, order: 1 },
    input: { span: 4, offset: 0, order: 2 },
    link: { span: 4, offset: 0, order: 3 },
  };
  const columnsXl = {
    label: { span: 4, offset: 0, order: 1 },
    input: { span: 4, offset: 0, order: 2 },
    link: { span: 4, offset: 0, order: 3 },
  };
  return (
    <ContainerWithBadge label={"Login Details"}>
      <Form.Item name="username" label="Enter preferred user name">
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Re-type Password"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      {/* First Name Field */}
      {/* <Row className="mb-3 justify-content-md-between justify-content-lg-center">
        <Col
          sm={columnsSm.label}
          md={columnsMd.label}
          lg={columnsLg.label}
          xl={columnsXl.label}
          className="text-md-end"
        >
          <Form.Label
            htmlFor="usernameInput"
            className="col-form-label fw-bold"
          >
            Enter preferred user name
          </Form.Label>
        </Col>
        <Col
          sm={columnsSm.input}
          md={columnsMd.input}
          lg={columnsLg.input}
          xl={columnsXl.input}
        >
          <Form.Control
            type="text"
            name="username"
            id="usernameInput"
            className="border border-secondary"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username && (
            <Form.Text className="text-danger">
              {formik.errors.username}
            </Form.Text>
          )}
        </Col>
        <Col
          sm={columnsSm.link}
          md={columnsMd.link}
          lg={columnsLg.link}
          xl={columnsXl.link}
          className="text-end text-md-start"
        >
          <Anchor>test</Anchor>
        </Col>
      </Row> */}
      {/* Last Name Field */}
      {/* <Row className="mb-3 justify-content-md-between justify-content-lg-center">
        <Col
          sm={columnsSm.label}
          md={columnsMd.label}
          lg={columnsLg.label}
          xl={columnsXl.label}
          className="text-md-end"
        >
          <Form.Label
            htmlFor="passwordInput"
            className="col-form-label fw-bold"
          >
            Password
          </Form.Label>
        </Col>
        <Col
          sm={columnsSm.input}
          md={columnsMd.input}
          lg={columnsLg.input}
          xl={columnsXl.input}
        >
          <Form.Control
            type={"password"}
            name="password"
            id="passwordInput"
            className="border border-secondary"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <Form.Text className="text-danger">
              {formik.errors.password}
            </Form.Text>
          )}
        </Col>
        <Col
          sm={columnsSm.link}
          md={columnsMd.link}
          lg={columnsLg.link}
          xl={columnsXl.link}
          className="text-end text-md-start"
        >
          <Anchor>test</Anchor>
        </Col>
      </Row> */}
      {/* Email Field */}
      {/* <Row className="mb-3 justify-content-md-between justify-content-lg-center">
        <Col
          sm={columnsSm.label}
          md={columnsMd.label}
          lg={columnsLg.label}
          xl={columnsXl.label}
          className="text-md-end"
        >
          <Form.Label
            htmlFor="confirmPasswordInput"
            className="col-form-label fw-bold"
          >
            Re-type Password
          </Form.Label>
        </Col>
        <Col
          sm={columnsSm.input}
          md={columnsMd.input}
          lg={columnsLg.input}
          xl={columnsXl.input}
        >
          <Form.Control
            type={"password"}
            name="confirmPassword"
            id="confirmPasswordInput"
            className="border border-secondary"
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Form.Text className="text-danger">
              {formik.errors.confirmPassword}
            </Form.Text>
          )}
        </Col>
        <Col
          sm={columnsSm.link}
          md={columnsMd.link}
          lg={columnsLg.link}
          xl={columnsXl.link}
          className="text-end text-md-start"
        >
          <Anchor>test</Anchor>
        </Col>
      </Row> */}
    </ContainerWithBadge>
  );
};

export default LoginDetails;
