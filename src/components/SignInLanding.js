import React, { useContext, useEffect, useState } from "react";
import { Figure } from "react-bootstrap";
import UserContext from "../contexts/UserContext";
import "../styles/SignInLanding.css";
import { Link } from "react-router-dom";

const SignInLanding = ({ user }) => {
  const [userPosts, setUserPosts] = useState([]);
  let { getUserPosts } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      await getUserPosts().then((result) => setUserPosts(result));
    }
    fetchData();
  }, []);

  return (
    <div className="signlanding-wrap">
      <div className="signlanding">
        <div className="pe-3">
          <h2 className="network">
            <strong>Welcome Back {userPosts.first_name}!</strong>
          </h2>

          <br />

          <h3 className="ask-user">What would you like to do today?</h3>
          <br />
        </div>
        <div className="text-overlay">
          <img
            className="signlanding-img"
            width={600}
            alt="171x180"
            src="https://images.unsplash.com/photo-1687603827201-922149337146?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div className="text-links">
            <h4 className="text-link1">
              <strong className="newscheck">
                {" "}
                <Link href="/newsfeed">Check the latest news here...</Link>
              </strong>{" "}
            </h4>
            <br />
            <h4 className="text-link2">
              <strong className="got-to-prof">
                {" "}
                <a href="/newsfeed">Go to my profile...</a>
              </strong>{" "}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInLanding;
