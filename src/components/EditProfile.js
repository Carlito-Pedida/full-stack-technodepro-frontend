import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UserContext from "../contexts/UserContext";

const EditProfile = ({ user }) => {
  let params = useParams();
  let navigate = useNavigate();

  let [editProfile, setEditProfile] = useState({
    userId: params.userId,
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    zipcode: "",
    userImg: ""
  });

  let { updateUserProfile, getUserPosts } = useContext(UserContext);

  let {
    userId,
    username,
    password,
    email,
    first_name,
    last_name,
    city,
    state,
    zipcode,
    userImg
  } = editProfile;

  useEffect(() => {
    if (userId !== undefined) return;
    async function fetch() {
      await getUserPosts(userId, user).then((response) =>
        setEditProfile(response)
      );
    }
    fetch();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setEditProfile((prevValue) => ({ ...prevValue, [name]: value }));
  }

  function updateProfile() {
    return updateUserProfile(editProfile);
  }

  function handleSubmit(event) {
    event.preventDefault();

    updateProfile(editProfile)
      .then(() => {
        if (!editProfile.ok) {
          alert("Your Profile has been updated!");
        }
        navigate(`/profile/${userId}`);
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Profile edit unsuccesful");
        navigate(`/profile/${userId}`);
      });
  }

  function handleCancel(event) {
    event.preventDefault();
    navigate(`/profile/${params.userId}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>First Name</label>
          <input
            placeholder="First Name"
            type="text"
            name="first_name"
            value={first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            type="text"
            name="last_name"
            value={last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City</label>
          <input
            placeholder="City"
            type="text"
            name="city"
            value={city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>State</label>
          <input
            placeholder="State"
            type="text"
            name="state"
            value={state}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Zipcode</label>
          <input
            placeholder="State"
            type="number"
            name="zipcode"
            value={zipcode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            placeholder="Image URL"
            type="text"
            name="userImg"
            value={userImg}
            onChange={handleChange}
          />
        </div>
        <button size="sm" variant="primary" type="submit">
          Confirm Profile Update
        </button>
      </form>
      <div className="d-grid mt-3">
        <button
          size="sm"
          variant="secondary"
          type="submit"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
