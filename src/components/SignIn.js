import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "../styles/SignIn.css";
import { Stack } from "react-bootstrap";

const SignIn = ({ user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //let { userId } = useParams();

  let { signInUser } = useContext(UserContext);
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    signInUser(username, password)
      .then(() => {
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
        window.alert(
          "Failed login! Check your username/password or Sign up to create an account"
        );
        navigate("/signin");
      });
  }

  return (
    <div className="login-wrap">
      <form onSubmit={handleSubmit} className="login">
        <h3>LOGIN</h3>
        <br />
        <Stack gap={4} className="mx-auto">
          <input
            className="loginput"
            placeholder="Username"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="loginput"
            placeholder="Password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Sign In</button>
        </Stack>
      </form>
    </div>
  );
};

export default SignIn;
