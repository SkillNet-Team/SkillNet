import React, { useState, useRef, useEffect } from 'react';
import './Chat.css'; // Ensure the CSS file is correctly linked

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi Alice, how are you?', sender: 'receiver', timestamp: new Date().toLocaleString() },
    { id: 2, text: 'Hi John, I am fine, thank you!', sender: 'sender', timestamp: new Date().toLocaleString() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [profileData, setProfileData] = useState(null); // Store user profile data
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = JSON.parse(localStorage.getItem('user')).id; // Assuming the user ID is stored in localStorage
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
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'sender', // Assuming the user of the Chat component is the sender
        timestamp: new Date().toLocaleString()
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  const handleInput = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      {profileData && (
        <div className="profile-header">
          <img src={profileData.profilePicture} alt={`${profileData.firstName} ${profileData.lastName}`} className="profile-pic" />
          <h3>{`${profileData.firstName} ${profileData.lastName}`}</h3>
        </div>
      )}
      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
            <div className="timestamp">{message.timestamp}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
