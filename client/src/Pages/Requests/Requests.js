import React, { useState, useEffect } from 'react';
import './Requests.css'; // Import the CSS file for styling
import Footer from '../../Footer/Footer';
import p1Image from '../../Images/p1.jpg';
import p2Image from '../../Images/p2.jpg';
import p3Image from '../../Images/p3.jpg';
// Import the image

const SwapRequests = ({ isDarkMode }) => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  // Helper function to generate star icons based on rating
  const generateStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="star-icon">&#9733;</span>); // Full star
      } else {
        stars.push(<span key={i} className="star-icon">&#9734;</span>); // Empty star
      }
    }
    return stars;
  };

  // Function to handle accepting a request
  const handleAcceptRequest = (name) => {
    setAcceptedRequests([...acceptedRequests, name]);
    alert(`You accepted the request for ${name}. Start planning your sessions now!`);
  };

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
    <>
      <div className="req-container">
        <h2 className="req-title">Hurray! You got some swap requests 🙌</h2>
        <div className="card-container">
          {/* Card 1 */}
          <div className="card">
            <img src={p1Image} alt="Person 1" className="card-image" />
            <div className="card-details">
              <h3 className="card-name">John Doe</h3>
              <p className="card-profession">Software Engineer</p>
              <p className="card-experience">Experience: 5 years</p>
              <p className="card-rating">Rating: {generateStars(4.5)}</p>
              <button className="button" onClick={() => handleAcceptRequest('John Doe')}>Accept</button> 
              <button className="d-button">Delete</button>
              {/* "Send Message" and "View Profile" options */}
              {acceptedRequests.includes('John Doe') && (
                <div>
                  <button className="button" onClick={() => console.log('Send Message to John Doe')}>Send Message</button>
                  <button className="button" onClick={() => console.log('View Profile of John Doe')}>View Profile</button>
                </div>
              )}
            </div>
          </div>
          {/* Card 2 */}
          <div className="card">
            <img src={p2Image} alt="Person 2" className="card-image" />
            <div className="card-details">
              <h3 className="card-name">Jane Smith</h3>
              <p className="card-profession">Data Scientist</p>
              <p className="card-experience">Experience: 7 years</p>
              <p className="card-rating">Rating: {generateStars(4.8)}</p>
              <button className="button" onClick={() => handleAcceptRequest('Jane Smith')}>Accept</button> 
              <button className="d-button">Delete</button>
              {/* "Send Message" and "View Profile" options */}
              {acceptedRequests.includes('Jane Smith') && (
                <div>
                  <button className="button" onClick={() => console.log('Send Message to Jane Smith')}>Send Message</button>
                  <button className="button" onClick={() => console.log('View Profile of Jane Smith')}>View Profile</button>
                </div>
              )}
            </div>
          </div>
          {/* Card 3 */}
          <div className="card">
            <img src={p3Image} alt="Person 3" className="card-image" />
            <div className="card-details">
              <h3 className="card-name">Alex Johnson</h3>
              <p className="card-profession">Web Developer</p>
              <p className="card-experience">Experience: 3 years</p>
              <p className="card-rating">Rating: {generateStars(4.2)}</p>
              <button className="button" onClick={() => handleAcceptRequest('Alex Johnson')}>Accept</button> 
              <button className="d-button">Delete</button>
              {/* "Send Message" and "View Profile" options */}
              {acceptedRequests.includes('Alex Johnson') && (
                <div>
                  <button className="button" onClick={() => console.log('Send Message to Alex Johnson')}>Send Message</button>
                  <button className="button" onClick={() => console.log('View Profile of Alex Johnson')}>View Profile</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div><Footer></Footer></div>
    </>
  );
};

export default SwapRequests;
