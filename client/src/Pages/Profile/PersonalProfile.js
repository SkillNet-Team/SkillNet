import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './PersonalProfile.css'; // Importing CSS file

export default function PersonalProfile({ isDarkMode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false); // State for sending message
  const [message, setMessage] = useState(''); // State to store the message
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    occupation: '',
    location: '',
    email: '',
    phone: '',
    skills: [''],
    interests: [''],
    galleryImages: [''],
    profilePicture: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setProfileData(data);
        } else {
          console.error('Failed to fetch profile data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...profileData.skills];
    updatedSkills[index] = value;
    setProfileData((prevData) => ({
      ...prevData,
      skills: updatedSkills,
    }));
  };

  const handleInterestChange = (index, value) => {
    const updatedInterests = [...profileData.interests];
    updatedInterests[index] = value;
    setProfileData((prevData) => ({
      ...prevData,
      interests: updatedInterests,
    }));
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const updatedImages = [...profileData.galleryImages];
      updatedImages[index] = reader.result;
      setProfileData((prevData) => ({
        ...prevData,
        galleryImages: updatedImages,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfileData((prevData) => ({
        ...prevData,
        profilePicture: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      const updateUrl = `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`;
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      };
      const response = await fetch(updateUrl, requestOptions);
      const data = await response.json();
      if (response.ok) {
        setIsEditMode(false); // Exit edit mode
        alert('Profile updated successfully');
      } else {
        console.error('Failed to update profile:', data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSendSwapRequest = () => {
    console.log('Sending swap request...');
  };

  const handleSendMessage = () => {
    setIsSendingMessage(true); // Display input box for sending message
  };

  const sendMessage = () => {
    console.log('Message sent:', message);
    setIsSendingMessage(false); // Hide input box after sending message
    setMessage(''); // Reset message input
  };

  return (
    <section className={isDarkMode ? 'profile-section dark-mode' : 'profile-section'}>
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
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" value={profileData.firstName} onChange={handleChange} />
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={profileData.lastName} onChange={handleChange} />
                <label htmlFor="occupation">Occupation</label>
                <input type="text" id="occupation" name="occupation" value={profileData.occupation} onChange={handleChange} />
                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="location" value={profileData.location} onChange={handleChange} />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" value={profileData.email} onChange={handleChange} />
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" name="phone" value={profileData.phone} onChange={handleChange} />
                <h3>Skills</h3>
                {profileData.skills && profileData.skills.length > 0 ? (
                  profileData.skills.map((skill, index) => (
                    <input
                      key={index}
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                    />
                  ))
                ) : (
                  <input
                    type="text"
                    value=""
                    onChange={(e) => handleSkillChange(0, e.target.value)}
                  />
                )}
                <h3>Interests</h3>
                {profileData.interests && profileData.interests.length > 0 ? (
                  profileData.interests.map((interest, index) => (
                    <input
                      key={index}
                      type="text"
                      value={interest}
                      onChange={(e) => handleInterestChange(index, e.target.value)}
                    />
                  ))
                ) : (
                  <input
                    type="text"
                    value=""
                    onChange={(e) => handleInterestChange(0, e.target.value)}
                  />
                )}
                <h3>Gallery</h3>
                {profileData.galleryImages && profileData.galleryImages.length > 0 ? (
                  profileData.galleryImages.map((image, index) => (
                    <input
                      key={index}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)}
                    />
                  ))
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 0)}
                  />
                )}
                {/* Add input fields for other editable attributes */}
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                <h2 className="profile-name">{profileData.firstName} {profileData.lastName}</h2>
                <p className="profile-occupation">{profileData.occupation}</p>
                {/* Display other non-editable profile details */}
                <p><strong>Location:</strong> {profileData.location}</p>
                <p><strong>Email:</strong> {profileData.email}</p>
                <p><strong>Phone:</strong> {profileData.phone}</p>
                {/* Display skills and interests */}
                <div>
                  <h3>Skills</h3>
                  <div className="profile-bubbles">
                    {profileData.skills && profileData.skills.length > 0 ? (
                      profileData.skills.map((skill, index) => (
                        <span className="profile-bubble" key={index}>{skill}</span>
                      ))
                    ) : (
                      <p>No skills found</p>
                    )}
                  </div>
                </div>
                <div>
                  <h3>Interests</h3>
                  <div className="profile-bubbles">
                    {profileData.interests && profileData.interests.length > 0 ? (
                      profileData.interests.map((interest, index) => (
                        <span className="profile-bubble" key={index}>{interest}</span>
                      ))
                    ) : (
                      <p>No interests found</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="profile-gallery">
          <h3>Gallery</h3>
          <div>
            {profileData.galleryImages && profileData.galleryImages.length > 0 ? (
              profileData.galleryImages.map((image, index) => (
                <img key={index} src={image} alt={`Gallery Image ${index + 1}`} />
              ))
            ) : (
              <p>No images found</p>
            )}
          </div>
        </div>
        {!isEditMode && !isSendingMessage && (
          <div className="send-request-container">
            <button className="send-request-button" onClick={handleSendSwapRequest}>
              Send Swap Request
            </button>
            <button className="send-message-button" onClick={handleSendMessage}>
              Send Message
            </button>
          </div>
        )}
        {isSendingMessage && (
          <div className="send-message-container">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            <button onClick={() => setIsSendingMessage(false)}>Cancel</button>
          </div>
        )}
      </div>
    </section>
  );
}