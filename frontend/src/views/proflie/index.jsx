import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import "./styles.css";

export default function ProfilePage (props){
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api");
      setProfile(response.data);
    } catch (err) {
      setError(err.response?.data?.errorMsg || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Header />

      <div className="profile">
        <h2>User Profile</h2>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        )}
      </div>

      <Footer />
    </>
  );
};
