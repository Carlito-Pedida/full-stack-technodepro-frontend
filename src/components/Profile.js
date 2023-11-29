import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useParams } from "react-router";
import moment from "moment";
import { Card, Col, Image, Row } from "react-bootstrap";
import "../styles/Profile.css";
import { Link } from "react-router-dom";

function Profile({ user }) {
  let params = useParams();
  const [userPosts, setUserPosts] = useState([]);

  let { getUserPosts } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      await getUserPosts(params.userId).then((result) => setUserPosts(result));
    }
    fetchData();
  }, [getUserPosts, params.userId]);

  function postCard() {
    let {
      userId,
      first_name,
      last_name,
      username,
      email,
      city,
      state,
      zipcode,
      createdAt,
      userImg,
      Posts
    } = userPosts;

    let postsByUser = [];
    postsByUser.push({ Posts });

    return (
      <div key={params.userId} t>
        <Card className="text-center">
          <Card.Header>
            <strong>Welcome back {username}!</strong>
          </Card.Header>
          <Card.Body>
            <div className="profilebod">
              <div>
                <Image src={userImg} roundedCircle height={150} width={150} />
              </div>
              <div className="cardtext">
                <Card.Title>
                  {first_name} {last_name}
                </Card.Title>
                <p>{email}</p>
                <p>
                  Location: {city} {state} {zipcode}{" "}
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <Link
                  type="button"
                  className="btn btn-primary btn-sm"
                  to={{
                    pathname: `/profile/${userId}/edit`,
                    state: { user: userPosts }
                  }}
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </Card.Body>
          <Card.Footer className="footer text-muted">
            Member Since: {moment.parseZone(createdAt).local().format("LL")}
          </Card.Footer>
        </Card>

        <div key={user}>
          <div className="profile-wrap">
            {Posts?.map((p, i) => {
              return (
                <div key={i}>
                  <Card>
                    <Card.Body className="message-card">
                      <img
                        className="post-img"
                        src={p.imageUrl}
                        alt="pic"
                        width="200"
                        height="260"
                      />
                      <div className="message">
                        <div className="message-post">{p.post}</div>
                        <div className="message-info">
                          {username} Posted:{" "}
                          {moment.parseZone(p.createdAt).local().format("LLLL")}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return postCard();
}

export default Profile;
