import { useEffect } from "react";
import { Anchor, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loginImage from "../../assets/images/login-image.gif";
import LoginForm from "./LoginForm";
import ContainerWithBadge from "../../common/containerWithBadge";
import authService from "../../services/authService";
import { userLoggedInWithToken, roleChanged, loginApi } from "../../store/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authService.getCurrentUser()) {
      // dispatch(userLoggedInWithToken());
      // navigate("/main");
      window.location = "/main";
    }
  });
  return (
    <div className="container-fluid">
      <Row className="justify-content-center">
        <Col sm={11} lg={10} className="text-center bg-dark py-2">
          <h3 className="fw-normal fs-5 text-white">
            Welcome to sana`a Journal
          </h3>
          <h2 className="fw-bold fs-3 text-white">OJW Login</h2>
        </Col>
      </Row>
      <Row className="py-3 my-3 my-sm-0 justify-content-center align-items-center">
        <Col sm={6} md={4} lg={3} xxl={2}>
          <img
            src={loginImage}
            width="100%"
            className="img-fluid img-thumbnail"
            alt=""
          />
        </Col>
        <Col sm={11} md={6} xxl={6}>
          <ContainerWithBadge label={"Please Enter The Following"}>
            <LoginForm />

            <div className="d-flex justify-content-evenly flex-wrap gap-3 my-1 my-sm-3  ">
              <Anchor className="text-decoration-none">
                send login details
              </Anchor>
              <Anchor className="text-decoration-none">Register now</Anchor>
              <Anchor className="text-decoration-none">Login help</Anchor>
            </div>
            <hr className="mb-4 border border-2 border-danger " />
            <hr className="mt-4 border border-2 border-danger " />
          </ContainerWithBadge>
        </Col>
      </Row>
    </div>
  );
};
export default Login;
