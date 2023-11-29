import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "../styles/SignUp.css";
import { Stack } from "react-bootstrap";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [userImg, setUserImage] = useState("");

  let { createUser } = useContext(UserContext);
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    createUser(
      username,
      password,
      email,
      first_name,
      last_name,
      city,
      state,
      zipcode,
      userImg
    )
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
        window.alert("Registration Failed: Can not create user");
      });
  }

  return (
    <div className="formwrap">
      <form className="register" onSubmit={handleSubmit}>
        <h3>REGISTER</h3>
        <br></br>
        <Stack gap={4} className="mx-auto">
          <div className="reg-input">
            <input
              placeholder="Username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            className="email"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="reg-input">
            <input
              placeholder="First Name"
              type="text"
              name="first_name"
              value={first_name}
              onChange={(e) => setFirst_Name(e.target.value)}
            />
            <input
              placeholder="Last Name"
              type="text"
              name="last_name"
              value={last_name}
              onChange={(e) => setLast_Name(e.target.value)}
            />
          </div>
          <div className="reg-input">
            <input
              placeholder="City"
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="State"
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <input
            placeholder="Zipcode"
            type="number"
            name="zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
          <input
            placeholder="Image URL"
            type="text"
            name="userImg"
            value={userImg}
            onChange={(e) => setUserImage(e.target.value)}
          />
          <button>Sign Up</button>
        </Stack>
      </form>
    </div>
  );
};

export default SignUp;
