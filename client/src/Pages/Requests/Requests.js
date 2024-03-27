import React from 'react';
import './Requests.css'; // Import the CSS file for styling
import p1Image from '../../Images/p1.jpg';
import p2Image from '../../Images/p2.jpg';
import p3Image from '../../Images/p3.jpg';
// Import the image

const SwapRequests = () => {
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

  return (
    <div className="req-container">
      <h2 className="req-title">Hurray! You got some swap requests  🙌</h2>
      <div className="card-container">
        {/* Card 1 */}
        <div className="card">
          <img src={p1Image} alt="Person 1" className="card-image" />
          <div className="card-details">
            <h3 className="card-name">John Doe</h3>
            <p className="card-profession">Software Engineer</p>
            <p className="card-experience">Experience: 5 years</p>
            <p className="card-rating">Rating: {generateStars(4.5)}</p>
            <button className="button">Accept</button> 
            <button className="d-button">Delete</button>
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
            <button className="button">Accept</button> 
            <button className="d-button">Delete</button>
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
            <button className="button">Accept</button> 
            <button className="d-button">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapRequests;
