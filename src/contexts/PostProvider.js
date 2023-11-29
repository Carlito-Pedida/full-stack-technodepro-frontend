import axios from "axios";
import { useEffect, useState } from "react";
import PostContext from "./PostContext";

export const PostProvider = (props) => {
  const [allPost, setAllPost] = useState([]);
  const baseUrl = "http://localhost:3004/technode/post/";

  useEffect(() => {
    async function fetchData() {
      await getAllPosts();
    }
    fetchData();
  }, []);

  function getAllPosts() {
    return axios.get(baseUrl).then((response) => setAllPost(response.data));
  }
  function createPost(post) {
    // let token = localStorage.getItem("myUserToken");
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`
    };

    return axios.post(baseUrl, post, { headers }).then((response) => {
      getAllPosts();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function writePost(post) {
    // let token = localStorage.getItem("myUserToken");
    let url = "http://localhost:3004/technode/post/write";
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`
    };

    return axios.post(url, post, { headers }).then((response) => {
      getAllPosts();
      return new Promise((resolve) => resolve(response.data));
    });
  }
  function imagePost(imageUrl) {
    // let token = localStorage.getItem("myUserToken");
    let url = "http://localhost:3004/technode/post/image";
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`
    };

    return axios.post(url, imageUrl, { headers }).then((response) => {
      getAllPosts();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function getOnePost(postId) {
    return axios.get(baseUrl + postId).then((response) => {
      getAllPosts();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function updatePost(post, userId) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`
    };

    return axios
      .put(baseUrl + post.postId, { ...post, userId }, { headers })
      .then((response) => {
        getAllPosts();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function deletePost(postId) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`
    };
    return axios.delete(baseUrl + postId, { headers }).then((response) => {
      getAllPosts();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  return (
    <PostContext.Provider
      value={{
        allPost,
        getOnePost,
        createPost,
        writePost,
        imagePost,
        updatePost,
        deletePost
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
