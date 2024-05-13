import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inbox.css'; // Import your CSS file for styling

const Inbox = () => {
  const navigate = useNavigate(); // Hook to access the navigate function to navigate

  // Example array of messages (replace with actual data fetched from API)
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John', content: 'Hi, let\'s discuss the agenda for tomorrow\'s meeting.' },
    { id: 2, sender: 'Alice', content: 'Here\'s the latest update on our project progress.' },
    // Add more messages as needed
  ]);

  // State to keep track of which message is expanded
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  // Function to handle message click
  const handleMessageClick = () => {
    navigate('/chat');
  };

  return (
    <div className="inbox-container">
      <h1 className="inbox-heading">Inbox</h1>
      <div className="messages-list">
        {messages.map(message => (
          <div key={message.id} className="message-item" onClick={handleMessageClick}>
            <div className="message-header">
              <div className="message-sender">{message.sender}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Inbox;

// TODO: Implement (@Talike)