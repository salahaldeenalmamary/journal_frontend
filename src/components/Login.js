import { useState } from "react";
import loginImage from "../assets/images/login-image.gif";
import { Anchor, Badge, Col, Row } from "react-bootstrap";
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [store, setStore] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    // const unsubscribe = store.subscribe(() => {
    //   console.log(`${username} logged in`);
    // });
    // store.dispatch(login({ username, password, role }));
    // unsubscribe();
    props.history.push("/author");
  };
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
      <Row className="py-3 my-3 my-sm-0 justify-content-center">
        <div className="d-none d-md-block col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2 ">
          <img
            src={loginImage}
            width="100%"
            className="img-fluid img-thumbnail"
            alt=""
          />
        </div>
        <Col
          sm={11}
          md={8}
          lg={7}
          xxl={8}
          className="bg-body-tertiary border border-2 border-secondary-subtle py-3 my-3 my-md-0"
        >
          <span className="badge border border-2 text- border-dark-subtle position-absolute top-0 start-0 translate-middle">
            Please Enter The Following
          </span>
          <form onSubmit={handleLogin}>
            <div className="row mb-3 justify-content-md-between justify-content-lg-center">
              <label htmlFor="inputEmail3" className="col-md-2 col-form-label">
                Username
              </label>
              <div className="col-md-9 col-lg-6">
                <input
                  name="username"
                  value={username}
                  onChange={({ currentTarget }) =>
                    setUsername(currentTarget.value)
                  }
                  className="form-control  border border-secondary"
                  id="inputEmail3"
                />
              </div>
            </div>
            <div className="row mb-3 justify-content-md-between justify-content-lg-center">
              <label
                htmlFor="inputPassword3"
                className="col-md-2 col-form-label"
              >
                Password
              </label>
              <div className="col-md-9 col-lg-6">
                <input
                  name="password"
                  value={password}
                  onChange={({ currentTarget }) =>
                    setPassword(currentTarget.value)
                  }
                  type="password"
                  className="form-control border border-secondary"
                  id="inputPassword3"
                />
              </div>
            </div>
            <div className="row justify-content-around  align-content-between m-0 p-0 mt-4">
              <button
                className="btn my-2 btn-sm btn-secondary shadow-sm rounded col-5 col-sm-4 col-md-3 col-xl-2 "
                value="author"
                name="role"
                type="submit"
                onClick={({ currentTarget }) => setRole(currentTarget.value)}
              >
                Author login
              </button>
              <button
                className="btn my-2 btn-sm btn-secondary shadow-sm rounded col-5 col-sm-4 col-md-3 col-xl-2 "
                value="reviewer"
                type="submit"
                onClick={({ currentTarget }) => setRole(currentTarget.value)}
              >
                Reviewer login
              </button>
              <div className="w-100 d-block d-md-none"></div>{" "}
              <button
                className="btn my-2 btn-sm btn-secondary shadow-sm rounded col-5 col-sm-4 col-md-3 col-xl-2 "
                value="editor"
                name="role"
                type="submit"
              >
                Editor login
              </button>
              <div className="w-100 d-none d-md-block d-xl-none"></div>
              <button
                className="btn my-2 btn-sm btn-secondary shadow-sm rounded col-5 col-sm-4 col-md-3 col-xl-2 "
                value="publisher"
                type="submit"
              >
                Publisher login
              </button>
            </div>
          </form>

          <Row className="justify-content-center flex-wrap gap-3 my-1 my-sm-3  ">
            <Anchor className="text-decoration-none col-3">
              send login details
            </Anchor>
            <Anchor className="text-decoration-none col-3">Register now</Anchor>
            <Anchor className="text-decoration-none col-3">Login help</Anchor>
          </Row>
          <hr className="mb-4 border border-2 border-danger " />
          <hr className="mt-4 border border-2 border-danger " />
        </Col>
      </Row>
    </div>
  );
};
export default Login;
