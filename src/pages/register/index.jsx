import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (authService.getCurrentUser()) {
      navigate("/main");
    }
  });
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Register;
export { default as PreRegisterForm } from "./preRegisterForm";
export { default as RegisterForm } from "./registerForm";
