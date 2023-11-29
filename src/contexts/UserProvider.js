import axios from "axios";
import UserContext from "./UserContext";
import { useEffect, useState } from "react";
//import { useEffect, useState } from "react";

export const UserProvider = (props) => {
  let [allUsers, setAllUsers] = useState([]);
  const baseUrl = "http://localhost:3004/technode/user/";

  useEffect(() => {
    async function fetchData() {
      await getAllUsers();
    }
    fetchData();
  }, []);

  function getAllUsers() {
    return axios.get(baseUrl).then((response) => setAllUsers(response.data));
  }

  function createUser(
    username,
    password,
    email,
    first_name,
    last_name,
    city,
    state,
    zipcode,
    userImg
  ) {
    let user = {
      username,
      password,
      email,
      first_name,
      last_name,
      city,
      state,
      zipcode,
      userImg
    };

    return axios.post(baseUrl, user).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function signInUser(username, password) {
    let user = { username, password };

    return axios.post(`${baseUrl}login`, user).then((response) => {
      localStorage.setItem("myUserToken", response.data.token);
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function getUserPosts(userId) {
    const url = "http://localhost:3004/technode/user/posts/";
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`
    };

    return axios.get(url + userId, { headers }).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function getProfile(userId) {
    const url = "http://localhost:3004/technode/user/current/";
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`
    };

    return axios.get(url + userId, { headers }).then((response) => {
      console.log(response);
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function getCurrentUser(userId) {
    const url = "http://localhost:3004/technode/user/current/";
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`
    };

    return axios.get(url + userId, { headers }).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function updateUserProfile(user) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    };

    return axios
      .put(baseUrl + user.userId, user, { headers })
      .then((response) => {
        console.log(response.data);
        getAllUsers();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  return (
    <UserContext.Provider
      value={{
        allUsers,
        getUserPosts,
        createUser,
        signInUser,
        updateUserProfile,
        getCurrentUser,
        getProfile
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
