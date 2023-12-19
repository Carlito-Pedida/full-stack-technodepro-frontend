import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button, CloseButton } from "react-bootstrap";
import UserContext from "../contexts/UserContext";

import "../styles/SignIn.css";

const SignIn = ({ show, handleClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  let { signInUser } = useContext(UserContext);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    const savedRememberMe = localStorage.getItem("rememberMe");

    if (savedUsername && savedPassword && savedRememberMe) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(savedRememberMe === "true");
    }
  }, []);

  const handleRememberMeChange = () => {
    if (rememberMe) {
      setRememberMe(false);
    } else {
      setRememberMe(true);
      window.alert("WARNING! Select only if you trust this device!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (rememberMe) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("rememberMe", rememberMe);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }

    signInUser(username, password)
      .then(() => {
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
        window.alert("Failed Login");
      });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <div className="form-wrap">
          <div className="form-case">
            <Modal.Body>
              <CloseButton onClick={handleClose} />
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center mx-3 mb-0">Sign In</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center mb-4">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                </div>

                <Button
                  className="mb-3 w-100"
                  variant="primary "
                  size="sm"
                  type="submit"
                >
                  Sign In
                </Button>
              </Form>
              <p className="register">
                Not a member yet?{" "}
                <a className="register-link" href="/">
                  Sign Up Here
                </a>{" "}
                it's free!
              </p>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SignIn;
