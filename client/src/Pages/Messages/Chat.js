import React, { useState, useRef, useEffect } from 'react';
import './Chat.css'; // Ensure the CSS file is correctly linked
import { useNavigate, useParams } from 'react-router-dom';
import defaultImg from "../../Images/default.png";
import { format } from "date-fns"; // format()

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [profileData, setProfileData] = useState({}); // Store user profile data
  const { id } = useParams(); // User ID from URL parameter
  const messagesEndRef = useRef(null);
  const navigate = useNavigate(); // Hook to access the navigate function

  const compare = (a, b) => {
    if (a.createdAt < b.createdAt) return -1;
    else if (a.createdAt > b.createdAt) return 1;
    else return 0;
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`);
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

    const fetchMessages = async () => {
      const userID = JSON.parse(localStorage.getItem('user')).id; // Assuming the user ID is stored in localStorage
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/messages`);
        const data = await response.json();
        if (response.ok) {
          setMessages(data.filter((m) => m.sender === userID || m.receiver === userID).sort(compare));
        } else {
          console.error('Failed to fetch messages:', data.message);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }

    fetchProfileData();
    fetchMessages();
    scrollToBottom();
  }, [id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        content: inputMessage,
        sender: JSON.parse(localStorage.getItem('user')).id,
        receiver: id
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage)
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.message);
        else setMessages([...messages, data].sort(compare));
      } catch (error) {
        console.log(error);
      }

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
      <button onClick={() => navigate("/messages")}>Back</button>
      {profileData && (
        <div className="profile-header">
          <img src={(profileData.profilePicture === "") ? defaultImg : profileData.profilePicture} alt={`${profileData.firstName} ${profileData.lastName}`} className="profile-pic" />
          <h3>{`${profileData.firstName} ${profileData.lastName}`}</h3>
        </div>
      )}
      <div className="messages-container">
        {(messages.length === 0) ? (
          <p>Start your conversation with {profileData.firstName} {profileData.lastName}!</p>
        ) : (
          <>
            {messages.map(message => (
              <div key={message.id} className={`message ${(message.sender === JSON.parse(localStorage.getItem('user')).id) ? "sender" : "receiver"}`}>
                {message.content}
                <div className="timestamp">{format(new Date(message.createdAt), "MM/dd/yyyy, p")}</div>
              </div>
            ))}
          </>
        )}
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
