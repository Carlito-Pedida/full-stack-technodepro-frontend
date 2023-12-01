import React, { useContext, useState, useEffect } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link, Outlet, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "../styles/Home.css";
import Avatar from "react-avatar";
import SignIn from "./SignIn";

function Navigation({ user }) {
  let { userId } = useParams();
  const [userPosts, setUserPosts] = useState({});

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
      <Navbar
        fixed="top"
        className="navbar-collapse navbar"
        bg=""
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src="/brand-logo.png"
              width="30"
              height="30"
              className="d-inline-block align-center logo"
              alt="logo"
            />
            <span> </span>
            <strong>technode</strong>
          </Navbar.Brand>

          <Nav className="d-flex align-items-center justify-content-end flex-grow-1 pe-3 color-white">
            <Link to="/" className="nav-link">
              <strong>Main</strong>
            </Link>
            {user && (
              <React.Fragment>
                <Link
                  to={`/profile/${user.userId}`}
                  className="nav-link"
                  key={userId}
                >
                  <strong className="">Hello {user.first_name}!</strong>
                </Link>
                <Link to={`/profile/${user.userId}`} className="nav-link">
                  <Avatar
                    className="avatar"
                    src={userPosts.userImg}
                    size="40"
                    round={true}
                  />
                </Link>

                <Link to="/signout" className="nav-link">
                  <strong>SignOut</strong>
                </Link>
              </React.Fragment>
            )}

            {!user && (
              <React.Fragment>
                <Link
                  to={openSignInModal}
                  className="nav-link"
                  onClick={openSignInModal}
                >
                  <strong>Sign In</strong>
                </Link>
                <Link to="/" className="nav-link">
                  <strong>Sign Up</strong>
                </Link>
                <Link to="/newsfeed" className="nav-link">
                  <strong>News Feed</strong>
                </Link>
                <Link to="/post/new" className="nav-link">
                  <strong>Post New</strong>
                </Link>
              </React.Fragment>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Stack gap={3} className="col-md-10 mx-auto mt-3">
        <Outlet />
      </Stack>
      <SignIn
        show={showSignInModal}
        handleClose={closeSignInModal}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default Navigation;
