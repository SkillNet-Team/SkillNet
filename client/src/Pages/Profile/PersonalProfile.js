import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './PersonalProfile.css'; // Importing CSS file

export default function PersonalProfile({ isDarkMode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Marie Horwitz',
    occupation: 'Web Designer',
    location: 'New York, USA',
    email: 'info@example.com',
    phone: '123 456 789',
    skills: ['Web Design', 'Graphic Design', 'Frontend Development'],
    interests: ['Coding', 'Reading', 'Hiking'],
    galleryImages: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150'
    ],
    profilePicture: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp',
    tempProfileData: null // To store changes during edit mode
  });

  const handleEdit = () => {
    if (isEditMode) {
      // If cancelling edit mode, discard temporary changes
      setProfileData({ ...profileData, ...profileData.tempProfileData });
    } else {
      // If entering edit mode, store current data in tempProfileData
      setProfileData({ ...profileData, tempProfileData: { ...profileData } });
    }
    setIsEditMode(!isEditMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...profileData.skills];
    updatedSkills[index] = value;
    setProfileData({ ...profileData, skills: updatedSkills });
  };

  const handleInterestChange = (index, value) => {
    const updatedInterests = [...profileData.interests];
    updatedInterests[index] = value;
    setProfileData({ ...profileData, interests: updatedInterests });
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const updatedImages = [...profileData.galleryImages];
      updatedImages[index] = reader.result;
      setProfileData({ ...profileData, galleryImages: updatedImages });
    };
    reader.readAsDataURL(file);
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfileData({ ...profileData, profilePicture: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Only save changes if in edit mode and explicitly clicked the "Save" button
      setIsEditMode(false);
    }
  };

  const handleSendSwapRequest = () => {
    // Add functionality to send swap request
    console.log("Sending swap request...");
  };

  const handleSendMessage = () => {
    // Add functionality to send a message
    console.log("Sending a message...");
  };

  return (
    <section className={isDarkMode ? "profile-section dark-mode" : "profile-section"}>
      <div className="profile-container">
        <div className="edit-button-container">
          <button className="edit-button" onClick={handleEdit}>
            {isEditMode ? 'Cancel' : <FontAwesomeIcon icon={faPencilAlt} />}
          </button>
        </div>
        <div className="profile-info">
          <div className="profile-picture">
            <img src={profileData.profilePicture} alt="Avatar" />
            {isEditMode && (
              <input type="file" accept="image/*" onChange={handleProfilePictureUpload} />
            )}
          </div>
          <div className="profile-details">
            {isEditMode ? (
              <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={profileData.name} onChange={handleChange} />
                <input type="text" name="occupation" value={profileData.occupation} onChange={handleChange} />
                <input type="text" name="location" value={profileData.location} onChange={handleChange} />
                <input type="text" name="email" value={profileData.email} onChange={handleChange} />
                <input type="text" name="phone" value={profileData.phone} onChange={handleChange} />
                <h3>Skills</h3>
                {profileData.skills.map((skill, index) => (
                  <input
                    key={index}
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                  />
                ))}
                <h3>Interests</h3>
                {profileData.interests.map((interest, index) => (
                  <input
                    key={index}
                    type="text"
                    value={interest}
                    onChange={(e) => handleInterestChange(index, e.target.value)}
                  />
                ))}
                <h3>Gallery</h3>
                {profileData.galleryImages.map((image, index) => (
                  <input
                    key={index}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                  />
                ))}
                {/* Add input fields for other editable attributes */}
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                <h2 className="profile-name">{profileData.name}</h2>
                <p className="profile-occupation">{profileData.occupation}</p>
                {/* Display other non-editable profile details */}
                <p><strong>Location:</strong> {profileData.location}</p>
                <p><strong>Email:</strong> {profileData.email}</p>
                <p><strong>Phone:</strong> {profileData.phone}</p>
                {/* Display skills and interests */}
                <div>
                  <h3>Skills</h3>
                  <div className="profile-bubbles">
                    {profileData.skills.map((skill, index) => (
                      <span className="profile-bubble" key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3>Interests</h3>
                  <div className="profile-bubbles">
                    {profileData.interests.map((interest, index) => (
                      <span className="profile-bubble" key={index}>{interest}</span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="profile-gallery">
          <h3>Gallery</h3>
          <div>
            {profileData.galleryImages.map((image, index) => (
              <img key={index} src={image} alt={`Gallery Image ${index + 1}`} />
            ))}
          </div>
        </div>
        {!isEditMode && (
          <div className="send-request-container">
            <button className="send-request-button" onClick={handleSendSwapRequest}>
              Send Swap Request
            </button>
            <button className="send-message-button" onClick={handleSendMessage}>
              Send Message
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
