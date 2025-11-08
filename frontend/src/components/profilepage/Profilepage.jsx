// ProfilePage.jsx
import React, { useState } from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    country: "",
    email: "user_12345@anon.com",
    preferences: [],
  });

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePreferenceChange = (pref) => {
    setProfile((prev) => {
      const prefs = prev.preferences.includes(pref)
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref];
      return { ...prev, preferences: prefs };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  const preferencesList = [
    "Politics",
    "Technology",
    "Sports",
    "Entertainment",
    "Business",
    "Science",
    "Health",
  ];

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          {/* first letter of the username */}
          <div className="avatar">U</div>  
          {/* username here */}
          <h2>User Profile</h2>
          <p>Manage your account details and preferences</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <label>Full Name (Required)</label>
          <input
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            placeholder="e.g., Jane Doe"
            required
          />

          <label>Username</label>
          <input
            name="username"
            value={profile.username}
            onChange={handleInputChange}
            placeholder="e.g., news_reader_jane"
          />

          <label>Country</label>
          <select
            name="country"
            value={profile.country}
            onChange={handleInputChange}
          >
            <option value="">Select your country</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
          </select>

          <label>Email Address (Read-Only)</label>
          <input type="email" value={profile.email} readOnly />

          <label>News Preferences</label>
          <div className="preferences-grid">
            {preferencesList.map((pref) => (
              <button
                type="button"
                key={pref}
                onClick={() => handlePreferenceChange(pref)}
                className={`preference-btn ${
                  profile.preferences.includes(pref) ? "active" : ""
                }`}
              >
                {pref}
              </button>
            ))}
          </div>

          <button type="submit" className="save-btn">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

/* ProfilePage.css */
