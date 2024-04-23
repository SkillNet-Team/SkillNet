import React, { useState, useEffect } from 'react';
import './Requests.css'; // Import the CSS file for styling
import defaultImg from "../../Images/default.png";

const SwapRequests = ({ isDarkMode }) => {
  const [requests, setRequests] = useState([]); // State for storing requests fetched from back-end

  useEffect(() => {
    async function fetchUsers() {
      const user = localStorage.getItem("user"); // Grab current user's info from browser
      const temp = JSON.parse(user).requests; // Parse the list of requests

      // Convert each request (id) to its corresponding user
      for (let i = 0; i < temp.length; i++) {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${temp[i]}`);
        const data = await response.json();
        if (response.ok) temp[i] = data;
      }

      setRequests(temp);
    }

    fetchUsers();
  }, []);

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

  async function handleAccept(id) {
    const user = localStorage.getItem("user"); // Grab current user's info from browser
    let userData = null;

    if (!user) return;
    else userData = JSON.parse(user); // Parse user object

    // Move other user's ID from user's requests to matches
    const response1 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userData.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: ["PULL", id],
        matches: id
      })
    });

    // Move user's ID to other user's matches
    const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        matches: userData.id
      })
    });

    if (response1.ok && response2.ok) {
      alert("Swap request accepted!");
      userData.requests.splice(userData.requests.indexOf(id));
      localStorage.setItem("user", JSON.stringify(userData)); // Update current user's data in browser
      window.location.reload(); // Refresh page to show new data
    }
    else alert("There was an error accepting the swap request.");
  }

  async function handleDelete(id) {
    const user = localStorage.getItem("user"); // Grab current user's info from browser
    let userData = null;

    if (!user) return;
    else userData = JSON.parse(user); // Parse user object

    // Remove other user's ID from current user's requests
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userData.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: ["PULL", id]
      })
    });

    if (response.ok) {
      alert("Swap request deleted!");
      userData.requests.splice(userData.requests.indexOf(id));
      localStorage.setItem("user", JSON.stringify(userData)); // Update current user's data in browser
      window.location.reload(); // Refresh page to show new data
    }
    else alert("There was an error deleting the swap request.");
  }

  // useEffect to apply dark mode styles when the mode changes
  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className="req-container">
      <h2 className="req-title">Hurray! You got some swap requests 🙌</h2>
      {(requests.length === 0) ? (
        <p>No requests for you at the moment. Please check back later.</p>
      ) : (
        <div className="card-container">
          {requests.map((user, i) => (
            <div className="card" key={i}>
              <img src={(user.profilePicture === "") ? defaultImg : user.profilePicture} alt="pfp" className="card-image" />
              <div className="card-details">
                <h3 className="card-name">{user.firstName} {user.lastName}</h3>
                <p className="card-profession">{(user.occupation === "") ? "No occupation" : user.occupation}</p>
                <button className="button" onClick={() => handleAccept(user._id)}>Accept</button>
                <button className="d-button" onClick={() => handleDelete(user._id)}>Delete</button>
                {/* "Send Message" and "View Profile" options */}
                {/* {acceptedRequests.includes('John Doe') && (
                  <div>
                    <button className="button" onClick={() => console.log('Send Message to John Doe')}>Send Message</button>
                    <button className="button" onClick={() => console.log('View Profile of John Doe')}>View Profile</button>
                  </div>
                )} */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SwapRequests;