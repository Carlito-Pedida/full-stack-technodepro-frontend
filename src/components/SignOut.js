import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function SignOut() {
  const [user, setUser] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    try {
      const jwt = localStorage.removeItem("myUserToken");
      const userToken = jwtDecode(jwt);
      setUser(userToken);
    } catch (ex) {}
    window.location = "/";
  }, []);
}

export default SignOut;
