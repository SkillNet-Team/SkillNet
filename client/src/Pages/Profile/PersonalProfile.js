import React from 'react';
import './PersonalProfile.css'; // Importing CSS file
import Footer from '../../Footer/Footer';

export default function PersonalProfile() {
  return (
    <> 
      <section className="profile-section">
        <div className="profile-container">
          <div className="profile-info">
            <div className="profile-picture">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" />
            </div>
            <div className="profile-details">
              <h2 className="profile-name">Marie Horwitz</h2>
              <p className="profile-occupation">Web Designer</p>
            </div>
          </div>
          <div className="profile-bio">
            <div className="profile-info">
              <p><strong>Location:</strong> New York, USA</p>
            </div>
            <div className="profile-info">

              <p><strong>Email:</strong> info@example.com</p>
              <p><strong>Phone:</strong> 123 456 789</p>
            </div>
            <h3>Skills</h3>
            <div className="profile-bubbles">
              <span className="profile-bubble">Web Design</span>
              <span className="profile-bubble">Graphic Design</span>
              <span className="profile-bubble">Frontend Development</span>
            </div>
            <h3>Interests</h3>
            <div className="profile-bubbles">
              <span className="profile-bubble">Coding</span>
              <span className="profile-bubble">Reading</span>
              <span className="profile-bubble">Hiking</span>
            </div>
            <h3>Gallery</h3>
            <div className="profile-gallery">
              <img src="https://via.placeholder.com/150" alt="Gallery Image 1" />
              <img src="https://via.placeholder.com/150" alt="Gallery Image 2" />
              <img src="https://via.placeholder.com/150" alt="Gallery Image 3" />
            </div>
          </div>
        </div>
      </section>
      <div><Footer></Footer></div>
    </>
  );
}