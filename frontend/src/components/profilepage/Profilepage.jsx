import React, { useEffect, useState } from "react";
import "./ProfilePage.css";

export default function Profilepage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    country: "",
    image: "",
  });

  const [editMode, setEditMode] = useState(false);

  // Simulate fetching data from a database
  useEffect(() => {
    // This would normally come from your API:
    const fetchedUser = {
      name: "Abhilasha Sharma",
      email: "abhilasha@example.com",
      country: "India",
      image: "https://i.pravatar.cc/150?img=5", // random avatar
    };
    setUser(fetchedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In real app: send updated data to backend
    console.log("Updated user:", user);
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={user.image}
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-info">
          {editMode ? (
            <>
              <input
                name="name"
                value={user.name}
                onChange={handleChange}
                className="profile-input"
              />
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                className="profile-input"
              />
              <input
                name="country"
                value={user.country}
                onChange={handleChange}
                className="profile-input"
              />
            </>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>{user.country}</p>
            </>
          )}
        </div>

        <div className="profile-actions">
          {editMode ? (
            <button onClick={handleSave} className="save-btn">
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="edit-btn"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
