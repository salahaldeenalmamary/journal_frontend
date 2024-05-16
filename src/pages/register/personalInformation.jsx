import React, { useMemo } from "react";
import { Anchor, Col, Row } from "react-bootstrap";
import { Form, Input, InputNumber, Radio, Select } from "antd";
// import Select from "react-select";
import countryList from "react-select-country-list";
import ContainerWithBadge from "../../common/containerWithBadge";
const PersonalInformation = ({ formik }) => {
  const options = useMemo(() => countryList().getData(), []);

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
    <ContainerWithBadge label={"Personal Information"}>
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="firstName"
        label="Given/First Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="middleName"
        label="Middle Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Family/Last Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Degree"
        name="degree"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Preferred Name" name="nickName">
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Country"
        name="region"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Please select a country" options={options} />
      </Form.Item>
      <Form.Item
        label="Available as a Reviewer?"
        name="isAcceptToBeReviewer"
        rules={[
          {
            required: true,
            message: "Please pick an item!",
          },
        ]}
      >
        <Radio.Group>
          <Radio value={true}>yes</Radio>
          <Radio value={false}>no</Radio>
        </Radio.Group>
      </Form.Item>
      {/* First Name Field */}
      {/* <Row className="mb-3 justify-content-between justify-content-lg-center">
        <Col
          sm={columnsSm.label}
          md={columnsMd.label}
          lg={columnsLg.label}
          xl={columnsXl.label}
          className="text-md-end"
        >
          <Form.Label
            htmlFor="titleInput"
            className="col-form-label fw-bold text-danger"
          >
            Title *
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
            name="title"
            id="titleInput"
            className="border border-secondary"
            {...formik.getFieldProps("title")}
          />
        </Col>
        <Col
          sm={columnsSm.link}
          md={columnsMd.link}
          lg={columnsLg.link}
          xl={columnsXl.link}
          className="text-end text-md-start"
        >
          {formik.touched.title && formik.errors.title && (
            <Form.Text className="text-danger">{formik.errors.title}</Form.Text>
          )}
        </Col>
      </Row> */}
      {/* First Name Field */}
      {/* <Row className="mb-3 justify-content-between justify-content-lg-center">
        <Col
          sm={columnsSm.label}
          md={columnsMd.label}
          lg={columnsLg.label}
          xl={columnsXl.label}
          className="text-md-end"
        >
          <Form.Label
            htmlFor="firstNameInput"
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
            id="firstNameInput"
            className="border border-secondary"
            {...formik.getFieldProps("firstName")}
          />
        </Col>
        <Col
          sm={columnsSm.link}
          md={columnsMd.link}
          lg={columnsLg.link}
          xl={columnsXl.link}
          className="text-end text-md-start"
        >
          {formik.touched.firstName && formik.errors.firstName && (
            <Form.Text className="text-danger">
              {formik.errors.firstName}
            </Form.Text>
          )}
        </Col>
      </Row> */}
      {/* Last Name Field */}
      {/* <Row className="mb-3 justify-content-between justify-content-lg-center">
        <Col
          sm={columnsSm.label}
          md={columnsMd.label}
          lg={columnsLg.label}
          xl={columnsXl.label}
          className="text-md-end"
        >
          <Form.Label
            htmlFor="middleNameInput"
            className="col-form-label fw-bold"
          >
            Middle Name
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
            name="middleName"
            id="middleNameInput"
            className="border border-secondary"
            {...formik.getFieldProps("middleName")}
          />
        </Col>
        <Col
          sm={columnsSm.link}
          md={columnsMd.link}
          lg={columnsLg.link}
          xl={columnsXl.link}
          className="text-end text-md-start"
        >
          {formik.touched.middleName && formik.errors.middleName && (
            <Form.Text className="text-danger">
              {formik.errors.middleName}
            </Form.Text>
          )}
        </Col>
      </Row> */}
      {/* Email Field */}
      {/* <Row className="mb-3 justify-content-between justify-content-lg-center">
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
        </Col>
        <Col
          sm={columnsSm.link}
          md={columnsMd.link}
          lg={columnsLg.link}
          xl={columnsXl.link}
          className="text-end text-md-start"
        >
          {formik.touched.lastName && formik.errors.lastName && (
            <Form.Text className="text-danger">
              {formik.errors.lastName}
            </Form.Text>
          )}
        </Col>
      </Row> */}
      {/* <Row className="mb-3 justify-content-between justify-content-lg-center">
        <Col
          sm={columnsSm.label}
          md={columnsMd.label}
          lg={columnsLg.label}
          xl={columnsXl.label}
          className="text-md-end"
        >
          <Form.Label
            htmlFor="degreeInput"
            className="col-form-label fw-bold text-danger"
          >
            Degree *
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
            name="degree"
            id="degreeInput"
            className="border border-secondary"
            {...formik.getFieldProps("degree")}
          />
        </Col>
        <Col
          sm={columnsSm.link}
          md={columnsMd.link}
          lg={columnsLg.link}
          xl={columnsXl.link}
          className="text-end text-md-start"
        >
          {formik.touched.degree && formik.errors.degree && (
            <Form.Text className="text-danger">
              {formik.errors.degree}
            </Form.Text>
          )}
        </Col>
      </Row> */}
      {/* <Row className="mb-3 justify-content-between justify-content-lg-center">
        <Col
          sm={columnsSm.label}
          md={columnsMd.label}
          lg={columnsLg.label}
          xl={columnsXl.label}
          className="text-md-end"
        >
          <Form.Label
            htmlFor="nickNameInput"
            className="col-form-label fw-bold"
          >
            Preferred Name
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
            name="nickName"
            id="nickNameInput"
            className="border border-secondary"
            {...formik.getFieldProps("nickName")}
          />
        </Col>
        <Col
          sm={columnsSm.link}
          md={columnsMd.link}
          lg={columnsLg.link}
          xl={columnsXl.link}
          className="text-end text-md-start"
        >
          {formik.touched.nickName && formik.errors.nickName && (
            <Form.Text className="text-danger">
              {formik.errors.nickName}
            </Form.Text>
          )}
        </Col>
      </Row> */}
      {/* <Row className="mb-3 justify-content-between justify-content-lg-center">
        <Col
          sm={columnsSm.label}
          md={columnsMd.label}
          lg={columnsLg.label}
          xl={columnsXl.label}
          className="text-md-end"
        >
          <Form.Label
            htmlFor="phoneInput"
            className="col-form-label fw-bold text-danger"
          >
            Phone *
          </Form.Label>
        </Col>
        <Col
          sm={columnsSm.input}
          md={columnsMd.input}
          lg={columnsLg.input}
          xl={columnsXl.input}
        >
          <Form.Control
            inputMode={"tel"}
            pattern="[0-9]{9}"
            name="phone"
            id="phoneInput"
            className="border border-secondary"
            {...formik.getFieldProps("phone")}
          />
        </Col>
        <Col
          sm={columnsSm.link}
          md={columnsMd.link}
          lg={columnsLg.link}
          xl={columnsXl.link}
          className="text-end text-md-start"
        >
          {formik.touched.phone && formik.errors.phone && (
            <Form.Text className="text-danger">{formik.errors.phone}</Form.Text>
          )}
        </Col>
      </Row> */}
      {/* <Row className="mb-3 justify-content-between justify-content-lg-center">
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
            inputMode={"email"}
            name="email"
            id="emailInput"
            className="border border-secondary"
            {...formik.getFieldProps("email")}
          />
        </Col>
        <Col
          sm={columnsSm.link}
          md={columnsMd.link}
          lg={columnsLg.link}
          xl={columnsXl.link}
          className="text-end text-md-start"
        >
          {formik.touched.email && formik.errors.email && (
            <Form.Text className="text-danger">{formik.errors.email}</Form.Text>
          )}
        </Col>
      </Row> */}
      {/* <Row className="mb-3 justify-content-between justify-content-lg-center">
        <Col
          sm={columnsSm.label}
          md={columnsMd.label}
          lg={columnsLg.label}
          xl={columnsXl.label}
          className="text-md-end"
        >
          <Form.Label
            htmlFor="universityInput"
            className="col-form-label fw-bold text-danger"
          >
            University *
          </Form.Label>
        </Col>
        <Col
          sm={columnsSm.input}
          md={columnsMd.input}
          lg={columnsLg.input}
          xl={columnsXl.input}
        >
          <Form.Control
            inputMode={"university"}
            name="university"
            id="universityInput"
            className="border border-secondary"
            {...formik.getFieldProps("university")}
          />
        </Col>
        <Col
          sm={columnsSm.link}
          md={columnsMd.link}
          lg={columnsLg.link}
          xl={columnsXl.link}
          className="text-end text-md-start"
        >
          {formik.touched.university && formik.errors.university && (
            <Form.Text className="text-danger">
              {formik.errors.university}
            </Form.Text>
          )}
        </Col>
      </Row>
      <Row className="mb-3 justify-content-between justify-content-lg-center">
        <Col
          sm={columnsSm.label}
          md={columnsMd.label}
          lg={columnsLg.label}
          xl={columnsXl.label}
          className="text-md-end"
        >
          <Form.Label htmlFor="countryInput" className="col-form-label fw-bold">
            Country
          </Form.Label>
        </Col>
        <Col
          sm={columnsSm.input}
          md={columnsMd.input}
          lg={columnsLg.input}
          xl={columnsXl.input}
        >
          <Select
            // className="w-50 pl-4 my-5"
            options={options}
            // value={region}
            // onChange={handleRegionSelection}
          />
        </Col>
        <Col
          sm={columnsSm.link}
          md={columnsMd.link}
          lg={columnsLg.link}
          xl={columnsXl.link}
          className="text-end text-md-start"
        >
          {formik.touched.country && formik.errors.country && (
            <Form.Text className="text-danger">
              {formik.errors.country}
            </Form.Text>
          )}
        </Col>
      </Row> */}
      {/* <Row className="mb-3 justify-content-between justify-content-lg-center align-items-center">
        <Col
          sm={columnsSm.label}
          md={columnsMd.label}
          lg={columnsLg.label}
          xl={columnsXl.label}
          className="text-md-end"
        >
          <Form.Label
            htmlFor="isAcceptToBeReviewerInput"
            className="col-form-label fw-bold"
          >
            Available as a Reviewer?
          </Form.Label>
        </Col>
        <Col
          sm={columnsSm.input}
          md={columnsMd.input}
          lg={columnsLg.input}
          xl={columnsXl.input}
        >
          <Form.Check
            inline
            reverse
            className="ms-4"
            label="Yes"
            id="isAcceptToBeReviewerInput"
            onClick={(e) => console.log(e.currentTarget.value)}
            name="isAcceptToBeReviewer"
            {...formik.getFieldProps("isAcceptToBeReviewer")}
          /> */}
      {/* <Form.Check
            inline
            reverse
            className="ms-4"
            value="false"
            label="No"
            name="isAcceptToBeReviewer"
            type="radio"
            {...formik.getFieldProps("isAcceptToBeReviewer")}
          /> */}
      {/* <Form.Control
            type={"isAcceptToBeReviewer"}
            name="isAcceptToBeReviewer"
            id="isAcceptToBeReviewerInput"
            className="border border-secondary"
            {...formik.getFieldProps("isAcceptToBeReviewer")}
          /> */}
      {/* </Col>
        <Col
          sm={columnsSm.link}
          md={columnsMd.link}
          lg={columnsLg.link}
          xl={columnsXl.link}
          className="text-end text-md-start"
        >
          {formik.touched.isAcceptToBeReviewer &&
            formik.errors.isAcceptToBeReviewer && (
              <Form.Text className="text-danger">
                {formik.errors.isAcceptToBeReviewer}
              </Form.Text>
            )}
        </Col>
      </Row> */}
    </ContainerWithBadge>
  );
};

export default PersonalInformation;
