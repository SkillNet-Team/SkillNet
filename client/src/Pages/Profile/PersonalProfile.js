import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './PersonalProfile.css'; // Importing CSS file

export default function PersonalProfile({ isDarkMode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false); // State for sending message
  const [message, setMessage] = useState(''); // State to store the message
  const [profileData, setProfileData] = useState({
    firstName: 'Marie',
    lastName: 'Horwitz',
    occupation: 'Web Designer',
    location: 'New York, USA',
    email: 'codereview@123.com',
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

  useEffect(() => {
    const fetchProfileData = async () => {
      const userEmail = JSON.parse(localStorage.getItem('user')).email;
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userEmail}`);
        const data = await response.json();
        if (response.ok) {
          setProfileData(data);
        } else {
          // handle errors, e.g., user not found
          console.error('Failed to fetch profile data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchProfileData();
  }, []);

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

      // Define the user update URL
      const updateUrl = `/api/users/${profileData.email}`; // Assuming email is used as unique identifier

      // Set up the fetch request options
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${profileData.firstName} ${profileData.lastName}`,
          skills: profileData.skills,
          interests: profileData.interests,
          galleryImages: profileData.galleryImages,
          profilePicture: profileData.profilePicture,
        }),
      };

      // Make the fetch request to the server
      fetch(updateUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
          alert('Profile updated successfully');
        })
        .catch(error => {
          console.error('Error updating profile:', error);
        });

    }
  };

  const handleSendSwapRequest = () => {
    // Add functionality to send swap request
    console.log("Sending swap request...");
  };

  const handleSendMessage = () => {
    setIsSendingMessage(true); // Display input box for sending message
  };

  const sendMessage = () => {
    // Send message functionality goes here
    console.log("Message sent:", message);
    setIsSendingMessage(false); // Hide input box after sending message
    setMessage(''); // Reset message input
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
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" value={profileData.firstName} onChange={handleChange} />
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={profileData.lastName} onChange={handleChange} />
                <label htmlFor="occupation">Occupation</label>
                <input type="text" id="occupation" name="occupation" value={profileData.occupation} onChange={handleChange} />
                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="location" value={profileData.location} onChange={handleChange} />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" value={profileData.email} readOnly />
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" name="phone" value={profileData.phone} onChange={handleChange} />
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