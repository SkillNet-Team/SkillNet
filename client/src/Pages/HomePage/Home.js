import React, { useState, useEffect } from 'react';
import './Home.css'; // Import the CSS file for styling
import defaultImg from "../../Images/default.png";

const Home = ({ isLoggedIn }) => {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const user = localStorage.getItem("user");

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`);
      const data = await response.json();

      if (response.ok) {
        setBackendData(data.filter((u) => (u._id !== JSON.parse(user).id)));
      }
    }

    fetchUsers();
  }, []);

  const sendRequest = async (id) => {
    console.log(id);
    const user = localStorage.getItem("user");

    if (!user) return;

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requests: ["PUSH", JSON.parse(user).id] })
    });

    if (res.ok) alert("Successfully sent swap request!");
    else alert("There was an error sending your swap request.");
  }

  // Helper function to generate star icons based on rating
  // const generateStars = (rating) => {
  //   const stars = [];
  //   for (let i = 0; i < 5; i++) {
  //     if (i < rating) {
  //       stars.push(<span key={i} className="star-icon">&#9733;</span>); // Full star
  //     } else {
  //       stars.push(<span key={i} className="star-icon">&#9734;</span>); // Empty star
  //     }
  //   }
  //   return stars;
  // };

  return (
    <div className="home-container">
      <h2 className="home-title">Skills that match you!</h2>
      {(backendData.length === 0) ? (
        <p>No skills for you at the moment. Please check back later.</p>
      ) : (
        <div className="card-container">
          {backendData.map((user) => (
            <div className="card" key={user._id}>
              <img src={(user.profilePicture === "") ? defaultImg : user.profilePicture} alt="pfp" className="card-image" />
              <div className="card-details">
                <h3 className="card-name">{user.firstName} {user.lastName}</h3>
                <p className="card-profession">{(user.occupation === "") ? "No occupation" : user.occupation}</p>
                <button
                  className="swap-button"
                  onClick={() => sendRequest(user._id)}
                  disabled={!isLoggedIn}
                >
                  Swap
                </button>
                <p className="warning">Please sign in to use this functionality.</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
