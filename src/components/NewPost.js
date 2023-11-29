import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/NewPost.css";
import { Stack } from "react-bootstrap";
import PostContext from "../contexts/PostContext";

const NewPost = () => {
  let params = useParams();
  let navigate = useNavigate();

  let [newPost, setNewPost] = useState({
    postId: params.postId
  });

  let { createPost } = useContext(PostContext);

  let { postId, post, imageUrl } = newPost;

  function handleChange(event) {
    setNewPost((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value };
    });
  }
  console.log(newPost);

  function create() {
    if (postId === undefined) {
      return createPost(newPost);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    create(newPost)
      .then(() => {
        navigate("/newsfeed");
      })
      .catch((error) => {
        console.log(error);
        navigate("/signin");
      });
  }

  return (
    <div className="newpostwrap">
      <form className="newform" onSubmit={handleSubmit} key={postId}>
        <h3>Post New Message</h3>
        <Stack gap={4} className="mx-auto">
          <textarea
            rows={4}
            cols={65}
            placeholder="what do you have in mind?"
            type="text"
            name="post"
            value={post}
            onChange={handleChange}
          />
          <input
            placeholder="Enter image URL"
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={handleChange}
          />
          <button>Submit</button>
        </Stack>
      </form>
    </div>
  );
};

export default NewPost;
