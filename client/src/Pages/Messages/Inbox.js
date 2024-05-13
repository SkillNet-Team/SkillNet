import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Inbox.css'; // Import your CSS file for styling

const Inbox = () => {
  const [matches, setMatches] = useState([]); // State to store match data
  const navigate = useNavigate(); // Hook to access the navigate function

  useEffect(() => {
    const fetchMatches = async () => {
      // Retrieve user data from local storage
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = JSON.parse(localStorage.getItem('user')).matches[0];
      console.log(userId);

      if (user && user.matches) {
        const matchedUsers = await Promise.all(user.matches.map(async (id) => {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`);
          if (response.ok) {
            const data = await response.json();
            return data;
          }
          return null; // Return null for failed requests and filter them out later
        }));

        setMatches(matchedUsers.filter(user => user !== null)); // Update state with fetched user data
      }
    };

    fetchMatches();
  }, []);

  const handleNavigateToChat = (userId) => {
    navigate(`/chat/${userId}`); // Navigate to chat page of the selected user
  };

  return (
    <div className="inbox-container">
      <h1 className="inbox-heading">Matches</h1>
      {matches.length > 0 ? (
        <div className="messages-list">
          {matches.map(match => (
            <div key={match._id} className="message-item" onClick={() => handleNavigateToChat(match._id)}>
              <div className="message-header">
                <div className="message-sender">{match.firstName} {match.lastName}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-matches-message">
          You have nobody to chat with. How about sending some swap requests?
        </div>
      )}
    </div>
  );
};

export default Inbox;
