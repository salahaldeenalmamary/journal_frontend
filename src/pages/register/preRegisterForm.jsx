import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Anchor, Button, Col, Container, Form, Row } from "react-bootstrap";
import { preRegisterDataUploaded } from "../../store/UI/registerForm";
import ContainerWithBadge from "../../common/containerWithBadge";
const PreRegisterForm = () => {
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .matches(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Invalid email format"
      )
      .required("Email is required"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "Abdul-qader",
      lastName: "Alshaibah",
      email: "abdul2001sh@gmail.com",
    },
    validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      dispatch(preRegisterDataUploaded(values));
      navigate("new");
      // history("/author");
    },
  });
  return (
    <ContainerWithBadge label={"Choose a Registration Method"}>
      {/* <button onClick={() => navigate("./")}>Go Back One</button>
        <button onClick={() => navigate("../")}>Go Back Two</button> */}
      <Form onSubmit={formik.handleSubmit}>
        {/* First Name Field */}
        <Row className="mb-3 justify-content-between justify-content-lg-center">
          <Col
            sm={columnsSm.label}
            md={columnsMd.label}
            lg={columnsLg.label}
            xl={columnsXl.label}
            className="text-md-end"
          >
            <Form.Label
              htmlFor="inputEmail3"
              className="col-form-label fw-bold text-danger"
            >
              Given/First Name *
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
              name="firstName"
              id="inputEmail3"
              className="border border-secondary"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <Form.Text className="text-danger">
                {formik.errors.firstName}
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
        </Row>
        {/* Last Name Field */}
        <Row className="mb-3 justify-content-between justify-content-lg-center">
          <Col
            sm={columnsSm.label}
            md={columnsMd.label}
            lg={columnsLg.label}
            xl={columnsXl.label}
            className="text-md-end"
          >
            <Form.Label
              htmlFor="lastNameInput"
              className="col-form-label fw-bold text-danger"
            >
              Family/Last Name *
            </Form.Label>
          </Col>
          <Col
            sm={columnsSm.input}
            md={columnsMd.input}
            lg={columnsLg.input}
            xl={columnsXl.input}
          >
            <Form.Control
              type={"text"}
              name="lastName"
              id="lastNameInput"
              className="border border-secondary"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <Form.Text className="text-danger">
                {formik.errors.lastName}
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
        </Row>
        {/* Email Field */}
        <Row className="mb-3 justify-content-between justify-content-lg-center ">
          <Col
            sm={columnsSm.label}
            md={columnsMd.label}
            lg={columnsLg.label}
            xl={columnsXl.label}
            className="text-md-end"
          >
            <Form.Label
              htmlFor="emailInput"
              className="col-form-label fw-bold text-danger"
            >
              Email *
            </Form.Label>
          </Col>
          <Col
            sm={columnsSm.input}
            md={columnsMd.input}
            lg={columnsLg.input}
            xl={columnsXl.input}
          >
            <Form.Control
              type={"text"}
              name="email"
              id="emailInput"
              className="border border-secondary"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <Form.Text className="text-danger">
                {formik.errors.email}
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
        </Row>
        <Row className="justify-content-end">
          <Col sm={3}>
            <Button className="mx-auto shadow-sm rounded" type="submit">
              Continue
            </Button>
          </Col>
        </Row>
      </Form>

      <hr className="mb-4 border border-2 border-danger " />
      <p className="text-center">alwjdalmwdlawdmawd</p>
      <hr className="mt-4 border border-2 border-danger " />
      <Container className="d-flex justify-content-center gap-3">
        <Button variant="dark">Cancel</Button>
        <Button variant="dark">Forgot Your Login Details</Button>
      </Container>
    </ContainerWithBadge>
  );
};

export default PreRegisterForm;
