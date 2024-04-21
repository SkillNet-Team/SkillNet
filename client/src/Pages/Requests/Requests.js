import React, { useState, useEffect } from 'react';
import './Requests.css'; // Import the CSS file for styling
import defaultImg from "../../Images/default.png";

const SwapRequests = ({ isDarkMode }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const user = localStorage.getItem("user");
      const temp = JSON.parse(user).requests;
      // console.log(temp);

      for (let i = 0; i < temp.length; i++) {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${temp[i]}`);
        const data = await response.json();
        // console.log(data);
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
    console.log(id);
    const user = localStorage.getItem("user");
    let userData = null;

    if (!user) return;
    else userData = JSON.parse(user);

    const response1 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userData.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: ["PULL", id],
        matches: id
      })
    });

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
      localStorage.setItem("user", JSON.stringify(userData));
      window.location.reload();
    }
    else alert("There was an error accepting the swap request.");
  }

  async function handleDelete(id) {
    console.log(id);
    const user = localStorage.getItem("user");
    let userData = null;

    if (!user) return;
    else userData = JSON.parse(user);

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
      localStorage.setItem("user", JSON.stringify(userData));
      window.location.reload();
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
