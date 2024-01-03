import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";

const NewUser = () => {
  const [showSignInModal, setShowSignInModal] = useState(true);

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
      <h4 className="network">
        Welcome to <br />
        TechNodePro!
      </h4>

      <div className="sign-in">
        <h4>
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
        </h4>
        <div className="landing-img">
          <SignIn
            show={showSignInModal}
            handleClose={closeSignInModal}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default NewUser;
