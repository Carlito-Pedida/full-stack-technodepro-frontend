import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostContext from "../contexts/PostContext";
import { Stack } from "react-bootstrap";
import UserContext from "../contexts/UserContext";

const EditUserPost = ({ user }) => {
  let params = useParams();
  let navigate = useNavigate();

  const [userPosts, setUserPosts] = useState({});

  let { getUserPosts } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      await getUserPosts().then((result) => setUserPosts(result));
    }
    fetchData();
  }, []);

  let [editPost, setEditPost] = useState({
    postId: params.postId,
    post: "",
    imageUrl: ""
  });
  console.log(editPost);

  let { getOnePost, updatePost } = useContext(PostContext);

  let { postId, post, imageUrl } = editPost;

  useEffect(() => {
    if (postId === undefined) return;
    async function fetch() {
      await getOnePost(postId).then((post) => setEditPost(post));
    }
    fetch();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setEditPost((prevValue) => ({ ...prevValue, [name]: value }));
  }

  function updateMessage() {
    return updatePost(editPost);
  }

  function handleSubmit(event) {
    event.preventDefault();

    updateMessage(editPost)
      .then(() => {
        if (!editPost.ok) {
          alert("Your Post has been updated!");
        }
        navigate(`/profile/${userPosts.userId}`);
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("You need to be Signed In to perform this operation");
        navigate(`/profile/${userPosts.userId}`);
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
            placeholder="Type at your heart's content!"
            type="text"
            name="post"
            value={post}
            onChange={handleChange}
          />
          <input
            placeholder="Enter image URL (optional)"
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

export default EditUserPost;
