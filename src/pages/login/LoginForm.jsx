import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { userLoggedInWithToken, roleChanged, loginApi } from "../../store/auth";
import { useEffect, useState } from "react";
const LoginForm = () => {
  const { isLoading, isError, errorMsg, isSuccess } = useSelector(
    (store) => store.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const handleSubmit = (values) => {
    debugger;
    const data = { ...values, selectedRole: role };
    dispatch(loginApi(data));
  };
  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Invalid email format"
      )
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      username: "editor121@gmail.com",
      password: "al@Admin12",
    },
    validationSchema,
 
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    formik.setFieldError("username", errorMsg);
  }, [errorMsg]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(roleChanged(role));
      // window.location = "/main";
    }
  }, [isSuccess]);

  return (
    // <FormikProvider value={formik}>
    <Form onSubmit={formik.handleSubmit}>
      {/* Username Field */}
      <Row className="mb-3 justify-content-md-between justify-content-lg-center">
        <Col md={2}>
          <Form.Label htmlFor="inputEmail3" className="col-form-label fw-bold">
            Username
          </Form.Label>
        </Col>
        <Col md={9} lg={5}>
          <Form.Control
            disabled={isLoading}
            type="email"
            name="username"
            id="inputEmail3"
            className="border border-secondary"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username && (
            <Form.Text className="text-danger">
              {formik.errors.username}
            </Form.Text>
          )}
        </Col>
      </Row>
      {/* Password Field */}
      <Row className="mb-3 justify-content-md-between justify-content-lg-center">
        <Col md={2}>
          <Form.Label
            htmlFor="inputPassword3"
            className="col-form-label fw-bold"
          >
            Password
          </Form.Label>
        </Col>
        <Col md={9} lg={5}>
          <Form.Control
            disabled={isLoading}
            type="password"
            name="password"
            id="inputPassword3"
            className="border border-secondary"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <Form.Text className="text-danger">
              {formik.errors.password}
            </Form.Text>
          )}
        </Col>
      </Row>
      {/* Role Buttons */}
      <div className="d-flex flex-wrap justify-content-evenly gap-3 m-0 p-0 mt-4">
        {/* Reviewer login */}
        <Button
          disabled={isLoading || !formik.isValid}
          variant="secondary"
          className="my-2 shadow-sm rounded"
          value="Reviewer"
          name="role"
          type="submit"
          onClick={(e) => {
            setRole(e.currentTarget.value);
            return formik.handleChange;
          }}
        >
          Reviewer login
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </Button>
        {/* Author login */}
        <Button
          disabled={isLoading || !formik.isValid}
          variant="secondary"
          className="my-2 shadow-sm rounded"
          value="Author"
          name="role"
          type="submit"
          onClick={(e) => {
            setRole(e.currentTarget.value);
            return formik.handleChange;
          }}
        >
          Author login
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </Button>
        {/* Editor login */}
        <Button
          disabled={isLoading || !formik.isValid}
          variant="secondary"
          className="my-2 shadow-sm rounded"
          value="Editor"
          name="role"
          type="submit"
          onClick={(e) => {
            setRole(e.currentTarget.value);
            return formik.handleChange;
          }}
        >
          Editor login
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </Button>
      </div>
    </Form>
    // </FormikProvider>
  );
};
// const LoginForm = (props) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     dispatch(login({ username, password, role }));
//     // const unsubscribe = store.subscribe(() => {
//     //   console.log(`${username} logged in`);
//     // });
//     // store.dispatch(login({ username, password, role }));
//     // unsubscribe();
//     navigate("/author");
//   };
//   console.log(props);
//   return (
//     <Form onSubmit={handleLogin}>
//       <Row className="mb-3 justify-content-md-between justify-content-lg-center">
//         <Col md={2}>
//           <Form.Label htmlFor="inputEmail3" className="col-form-label fw-bold">
//             Username
//           </Form.Label>
//         </Col>
//         <Col md={9} lg={5}>
//           <Form.Control
//             name="username"
//             value={username}
//             onChange={({ currentTarget }) => setUsername(currentTarget.value)}
//             className="border border-secondary"
//             id="inputEmail3"
//           />
//         </Col>
//       </Row>
//       <Row className="mb-3 justify-content-md-between justify-content-lg-center">
//         <Col md={2}>
//           <Form.Label
//             htmlFor="inputPassword3"
//             className="col-form-label fw-bold"
//           >
//             Password
//           </Form.Label>
//         </Col>
//         <Col md={9} lg={5}>
//           <Form.Control
//             name="password"
//             value={password}
//             onChange={({ currentTarget }) => setPassword(currentTarget.value)}
//             type="password"
//             className="border border-secondary"
//             id="inputPassword3"
//           />
//         </Col>
//       </Row>
//       <div className="d-flex flex-wrap justify-content-evenly gap-3 m-0 p-0 mt-4">
//         <Button
//           variant="secondary"
//           className="my-2 shadow-sm rounded"
//           value="author"
//           name="role"
//           type="submit"
//           onClick={({ currentTarget }) => setRole(currentTarget.value)}
//         >
//           Author login
//         </Button>
//         <Button
//           variant="secondary"
//           className="my-2 shadow-sm rounded"
//           value="reviewer"
//           type="submit"
//           onClick={({ currentTarget }) => setRole(currentTarget.value)}
//         >
//           Reviewer login
//         </Button>
//         <Button
//           variant="secondary"
//           className="my-2 shadow-sm rounded"
//           value="editor"
//           name="role"
//           type="submit"
//         >
//           Editor login
//         </Button>
//         <Button
//           variant="secondary"
//           className="my-2 shadow-sm rounded"
//           value="publisher"
//           type="submit"
//         >
//           Publisher login
//         </Button>
//       </div>
//     </Form>
//   );
// };
export default LoginForm;
