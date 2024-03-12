import React from 'react';
import './Join.css'; // Import the CSS file for styling
import joinImage from '../../Images/joinus.jpg'; // Import the image for the right side

const Join = () => {
  return (
    <div className="join-container">
      <div className="join-left">
        <h1>Let's Get Started!</h1>
        <p>Unlock a world of limitless skills and knowledge with our skill exchange platform where sharing is caring!</p>
        <button className="join-button">Join Now</button>
        <p className="login-link">Already have an account? <a href="/login">Log in</a></p>
      </div>
      <div className="join-right">
        <img src={joinImage} alt="Join us" />
      </div>
    </div>
  );
};

export default Join;
