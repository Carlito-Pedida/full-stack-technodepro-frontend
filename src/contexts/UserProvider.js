import axios from "axios";
import UserContext from "./UserContext";
import { useEffect, useState } from "react";
//import { useEffect, useState } from "react";

export const UserProvider = (props) => {
  const baseUrl = "http://localhost:3004/technode/user/";

  function getAllUsers() {
    return axios.get(baseUrl).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
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

  function getOneUser(userId) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`
    };

    return axios.get(baseUrl + userId, { headers }).then((response) => {
      getAllUsers();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function updateUserProfile(user) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`
    };

    return axios
      .put(baseUrl + user.userId, user, { headers })
      .then((response) => {
        getAllUsers();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  return (
    <UserContext.Provider
      value={{
        getAllUsers,
        getUserPosts,
        createUser,
        signInUser,
        updateUserProfile,
        getOneUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
