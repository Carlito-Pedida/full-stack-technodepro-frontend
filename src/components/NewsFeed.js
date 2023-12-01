import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostContext from "../contexts/PostContext";
import {
  CloseButton,
  Col,
  Container,
  Image,
  Modal,
  Row
} from "react-bootstrap";
import "../styles/NewsFeed.css";
import moment from "moment";
import Avatar from "react-avatar";
import UserContext from "../contexts/UserContext";
import { FaRegEdit, FaVideo } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineAddComment } from "react-icons/md";
import { PiShareFat } from "react-icons/pi";
import { GoThumbsup } from "react-icons/go";
import { ImImages } from "react-icons/im";
import { BsEmojiSmile } from "react-icons/bs";

function NewsFeed({ user }) {
  let params = useParams();
  let [newPost, setNewPost] = useState({
    postId: params.postId,
    post: ""
  });
  let [newImagePost, setNewImagePost] = useState({
    postId: params.postId,
    imageUrl: ""
  });

  let { writePost, imagePost } = useContext(PostContext);

  let { postId, post, imageUrl } = newPost;

  // function handleChange(event) {
  //   const { name, value } = event.target;
  //   setNewPost((prevValue) => ({ ...prevValue, [name]: value }));
  // }

  function handlePostChange(event) {
    setNewPost((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value };
    });
  }
  console.log(newPost);
  console.log(newImagePost);

  function handleImageChange(event) {
    setNewImagePost((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value };
    });
  }

  function createPost() {
    if (postId === undefined) {
      return writePost(newPost);
    }
  }
  function handlePostSubmit() {
    createPost(newPost)
      .then(() => {
        navigate("/newsfeed");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        navigate("/newsfeed");
      });
  }

  function postImage() {
    if (postId === undefined) {
      return imagePost(newImagePost);
    }
  }

  function handleImageSubmit() {
    postImage(newPost)
      .then(() => {
        navigate("/newsfeed");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        navigate("/newsfeed");
      });
  }

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

  // useEffect(() => {
  //   async function fetchData() {
  //     await getUserPosts().then((result) => setUserPosts(result));
  //   }
  //   fetchData();
  // }, []);

  let navigate = useNavigate();

  let { deletePost } = useContext(PostContext);

  function handleDelete(postId) {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      deletePost(postId)
        .then(() => {
          navigate("/newsfeed");
        })
        .catch((error) => {
          console.log(error);
          window.alert("You need to sign in to perform this operation");
          navigate("/newsfeed");
        });
    }
  }

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const [modalShow, setModalShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setModalShow(true);
  }

  return (
    <div className="feedwrap">
      <br />
      <div className="story-reel">
        <div className="story">
          <Avatar src={userPosts.userImg} size="40" round={true} />
          <h4>
            {userPosts.first_name} {userPosts.last_name}
          </h4>
        </div>
        <div className="story">
          <Avatar src={userPosts.userImg} size="40" round={true} />
          <h4>
            {userPosts.first_name} {userPosts.last_name}
          </h4>
        </div>
        <div className="story">
          <Avatar src={userPosts.userImg} size="40" round={true} />
          <h4>
            {userPosts.first_name} {userPosts.last_name}
          </h4>
        </div>
        <div className="story">
          <Avatar src={userPosts.userImg} size="40" round={true} />
          <h4>
            {userPosts.first_name} {userPosts.last_name}
          </h4>
        </div>
        <div className="story">
          <Avatar src={userPosts.userImg} size="40" round={true} />
          <h4>
            {userPosts.first_name} {userPosts.last_name}
          </h4>
        </div>
      </div>

      <br />

      <div className="d-flex align-items-center justify-content-center">
        <Avatar
          className="avatar me-2"
          src={userPosts.userImg}
          size="40"
          round={true}
        />{" "}
        <div className="d-flex">
          <form onSubmit={handlePostSubmit} key={postId}>
            <input
              size={47}
              className="share-input p-2 me-2"
              type="text"
              name="post"
              value={post}
              placeholder={`...What do you have in mind ${userPosts.first_name}?`}
              onChange={handlePostChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevents the default form submission
                  handlePostSubmit();
                }
              }}
            />
          </form>
          <form onSubmit={handleImageSubmit} key={postId}>
            <input
              className="share-input p-2"
              type="text"
              name="imageUrl"
              value={imageUrl}
              placeholder="...Image URL / optional"
              onChange={handleImageChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevents the default form submission
                  handleImageSubmit();
                }
              }}
            />
          </form>
        </div>
      </div>
      <div className="message-layer2 d-flex justify-content-evenly align-items-center mt-3">
        <Link>
          <div className="message-action align-items-center">
            <FaVideo size={"23px"} style={{ color: "red" }} />
            Live Video
          </div>
        </Link>
        <Link>
          <div className="message-action  align-items-center">
            <ImImages size={"23px"} style={{ color: "green" }} />
            Photo/video
          </div>
        </Link>
        <Link>
          <div className="message-action  align-items-center">
            <BsEmojiSmile size={"23px"} style={{ color: "orange" }} />
            Feeling/activity
          </div>
        </Link>
      </div>

      <div className="divider d-flex align-items-center my-4">
        <p className="wire text-center mx-3 mb-0">What's on the wire?</p>
      </div>

      <PostContext.Consumer>
        {({ allPost }) => {
          return (
            <div>
              <div>
                <div>
                  {allPost
                    ?.sort(
                      (a, b) =>
                        moment(b.createdAt).valueOf() -
                        moment(a.createdAt).valueOf()
                    )
                    .map((post, i) => {
                      return (
                        <Container key={i} fluid>
                          <div className="cardbody">
                            <div className="d-flex align-items-center justify-content-between p-3">
                              <div className="d-flex align-items-center">
                                <Avatar
                                  className="avatar me-2"
                                  src={post.User.userImg}
                                  size="40"
                                  round={true}
                                />{" "}
                                <div className="first_name">
                                  {post.User.first_name}
                                  <div className="timestamp">
                                    {moment
                                      .parseZone(post.createdAt)
                                      .local()
                                      .fromNow(true)}{" "}
                                    ago...
                                  </div>
                                </div>
                              </div>
                              {userPosts && post.userId == userPosts.userId ? (
                                <div className="d-flex">
                                  <Link
                                    className="editButton ms-3"
                                    to={`/post/${post.postId}/edit`}
                                    style={{ marginRight: "10px" }}
                                  >
                                    <FaRegEdit size={"15px"} />
                                  </Link>
                                  <Link
                                    className="deleteButton"
                                    to={"#"}
                                    onClick={handleDelete.bind(
                                      this,
                                      post.postId,
                                      post.userId
                                    )}
                                  >
                                    <FaRegTrashCan
                                      className="trash"
                                      size={"15px"}
                                    />
                                  </Link>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="main-post ps-3 pe-3 mb-2">
                              {post.post}
                            </div>
                            <div className="post-image">
                              <img
                                src={post.imageUrl}
                                onClick={() => {
                                  setSelectedPost(post);
                                  setModalShow(true);
                                  handleShow();
                                }}
                              />
                            </div>
                            <br />
                            <div className="horizontal-line"></div>
                            <div className="d-flex justify-content-around mb-2 mt-1">
                              <div className="responses">
                                <Link>
                                  <GoThumbsup
                                    className="post-resp"
                                    size={"17px"}
                                  />{" "}
                                  <strong className="post-resp">Like</strong>
                                </Link>
                              </div>
                              <div className="responses">
                                <Link>
                                  <MdOutlineAddComment
                                    className="post-resp"
                                    size={"17px"}
                                  />{" "}
                                  <strong className="post-resp">Comment</strong>
                                </Link>
                              </div>
                              <div className="responses">
                                <Link>
                                  <PiShareFat
                                    className="post-resp"
                                    size={"17px"}
                                  />{" "}
                                  <strong className="post-resp">Share</strong>
                                </Link>
                              </div>
                            </div>
                            <div className="horizontal-line"></div>
                            <br />
                          </div>
                        </Container>
                      );
                    })}
                </div>
              </div>
            </div>
          );
        }}
      </PostContext.Consumer>

      <Modal
        fullscreen
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <div>
          <Row className="modal-show">
            <Col xs={9} style={{ backgroundColor: "black", padding: 0 }}>
              <div className="p-3" data-bs-theme="dark">
                <CloseButton
                  className="pe-4 "
                  onClick={() => setModalShow(false)}
                />
              </div>
              <div className="pb-5 ps-5 pe-5 ms-1 me-1 mb-1">
                <Image
                  src={selectedPost?.imageUrl}
                  fluid
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            </Col>

            <Col className="side" xs={12} md={3}>
              <div className="d-flex justify-content-between m-2 p-3">
                <div className="d-flex align-items-center">
                  <Avatar
                    className="avatar me-2"
                    src={selectedPost?.User.userImg}
                    size="40"
                    round={true}
                  />{" "}
                  <div className="first_name">
                    {selectedPost?.User.first_name}
                    <div className="timestamp">
                      {moment
                        .parseZone(selectedPost?.createdAt)
                        .local()
                        .fromNow(true)}{" "}
                      ago...
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <Link
                    className="editButton ms-3"
                    to={`/post/${selectedPost?.postId}/edit`}
                    style={{ marginRight: "10px" }}
                  >
                    <FaRegEdit size={"15px"} />
                  </Link>
                  <Link
                    className="deleteButton"
                    to={"#"}
                    onClick={handleDelete.bind(
                      this,
                      selectedPost?.postId,
                      selectedPost?.userId
                    )}
                  >
                    <FaRegTrashCan className="trash" size={"15px"} />
                  </Link>
                </div>
              </div>
              <div className="p-3 mb-5">{selectedPost?.post}</div>

              <div className="horizontal-line"></div>
              <Container className="d-flex justify-content-around mb-2 mt-1">
                <div>
                  <GoThumbsup /> <strong className="post-resp">Like</strong>
                </div>
                <div>
                  <MdOutlineAddComment />{" "}
                  <strong className="post-resp">Comment</strong>
                </div>
                <div>
                  <PiShareFat /> <strong className="post-resp">Share</strong>
                </div>
              </Container>
              <div className="horizontal-line"></div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
}

export default NewsFeed;
