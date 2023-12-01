import React, { useContext, useEffect, useState } from "react";
import { Figure } from "react-bootstrap";
import "../styles/Landing.css";
import "../styles/SignInLanding.css";
import UserContext from "../contexts/UserContext";
import { Link, useParams } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

function Landing({ user }) {
  const [userPosts, setUserPosts] = useState([]);
  let { getUserPosts } = useContext(UserContext);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const result = await getUserPosts();
        if (isMounted) {
          setUserPosts(result);
        }
      } catch (error) {
        if (isMounted) {
          if (error.response && error.response.status === 404) {
            console.clear();
          }
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const [showSignInModal, setShowSignInModal] = useState(false);

  const openSignInModal = () => {
    setShowSignInModal(true);
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {user && (
        <div className="landing-wrap">
          <div className="landing">
            <div className="pe-3">
              <h2 className="network">
                <strong>Welcome Back {userPosts.first_name}!</strong>
              </h2>

              <br />

              <h3 className="ask-user">What would you like to do today?</h3>
              <br />
              <h1 className="network">technode.com</h1>

              <p className="hassle">
                The hassle-free media platform for aspiring full-stack
                developers
              </p>
              <br />

              <p className="ask">
                <strong>
                  ask questions, share your thoughts, and help someone today!
                </strong>
              </p>
            </div>
            <div className="text-overlay">
              <img
                className="landing-img"
                width={600}
                alt="171x180"
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
              />
              <div className="text-links">
                <h4 className="text-link">
                  <strong>
                    {" "}
                    <Link to="/newsfeed" className="text-link1">
                      Check the latest news...
                    </Link>
                  </strong>{" "}
                </h4>

                <br />
                <h4 className="text-link">
                  <strong className="got-to-prof">
                    {" "}
                    <Link to={`/profile/${user.userId}`} className="text-link1">
                      Go to my profile...
                    </Link>
                  </strong>{" "}
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}
      {!user && (
        <div className="landing-wrap">
          <div className="landing">
            <div>
              <h1 className="network">Welcome to technode.com</h1>
              <h3 className="network">a haven for tech writers and readers</h3>
              <br />
              <p className="hassle">
                The hassle-free media platform for aspiring full-stack
                developers
              </p>
              <br />

              <p className="ask">
                <strong>
                  ask questions, share your thoughts, and help someone today!
                </strong>
              </p>
              <br />

              <div className="sign-in">
                <h3>
                  <strong className="sign-up">
                    <Link
                      type="Button"
                      to={openSignInModal}
                      className="nav-link"
                      onClick={openSignInModal}
                    >
                      Sign In Here
                    </Link>
                  </strong>{" "}
                  to access your account.
                  <br />
                </h3>
              </div>
            </div>
            <div className="landing-img">
              <SignUp />
              <SignIn
                show={showSignInModal}
                handleClose={closeSignInModal}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Landing;
