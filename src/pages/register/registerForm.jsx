import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { preRegisterDataUploaded } from "../../store/UI/registerForm";
import { Button, Container } from "react-bootstrap";
import LoginDetails from "./loginDetails";
import PersonalInformation from "./personalInformation";
import { register } from "../../store/auth";
import { Form } from "antd";
import SubmitButton from "../../utils/submitButton";

const RegisterForm = () => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 8,
      },
      lg: {
        span: 8,
      },
      xl: {
        span: 8,
      },
      xxl: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
      md: {
        span: 10,
      },
      lg: {
        span: 8,
      },
      xl: {
        span: 8,
      },
      xxl: {
        span: 8,
      },
    },
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  const { isLoading, isError, isSuccess, errorMsg } = useSelector(
    (store) => store.auth
  );
  useEffect(() => {
    if (isSuccess) {
      alert(
        "You have been registered successfully check your email for confirmation "
      );
      // window.location = "/login";
      // navigate("/login");
    }
  }, [isSuccess]);
  const handleSubmit = (data) => {
    delete data.confirmPassword;
    delete data.title;
    delete data.username;
    dispatch(register(data));
    console.log(data);
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("User Name is required"),
    password: Yup.string()
      .min(6, "Passwords must be at least 6 characters.")
      // .lowercase()
      // .uppercase()
      .matches(
        /[A-Z]/g,
        "Passwords must have at least one uppercase ('A'-'Z')."
      )
      .matches(/[0-9]/g, "Passwords must have at least one digit ('0'-'9').")
      .matches(
        /[a-z]/g,
        "Passwords must have at least one non alphanumeric character."
      )
      .required("Password Name is required"),
    confirmPassword: Yup.string().required("Confirm Password is required"),
    title: Yup.string().required("Title is required"),
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is required"),
    degree: Yup.string().required("Degree is required"),
    nickName: Yup.string(),
    phone: Yup.number()
      .max(999999999, "Phone must contain at most '9' digits")
      .min(100000000, "Phone must contain at least '9' digits")
      .required("Phone is required"),
    email: Yup.string()
      .matches(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Invalid email format"
      )
      .required("Email is required"),
    university: Yup.string().required("University is required"),
    isAcceptToBeReviewer: Yup.boolean().required("answer is required"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "Abdul-qader",
      lastName: "Alshaibah",
      email: "abdul2001sh@gmail.com",
      username: "A7kMember",
      password: "A7k-qadoor",
      confirmPassword: "A7k-qadoor",
      title: "Eng",
      middleName: "Abdul-wali",
      degree: "master",
      nickName: "Qadoor",
      phone: "773225233",
      university: "sana'a",
      country: "yemen",
      isAcceptToBeReviewer: true,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Container>
      <Form {...formItemLayout} form={form} onFinish={onFinish}>
        <LoginDetails formik={formik} />
        <PersonalInformation formik={formik} />
        <Form.Item>
          <SubmitButton form={form} size="large" className="mx-2 shadow">
            Sign up
          </SubmitButton>
          {/* <Button type="submit">
            Sign up
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm ms-2"
                role="status"
                aria-hidden="true"
              ></span>
            )}
          </Button> */}
        </Form.Item>
      </Form>
    </Container>
  );
};

export default RegisterForm;
