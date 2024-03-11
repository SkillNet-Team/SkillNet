import React, { useEffect, useState } from 'react';
import './App.css'; // Assuming you have some CSS file for styling

function App() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => {
        setBackendData(data.users);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#b2ebf2' }}>
        <div className="container">
          <a className="navbar-brand" href="#">Your Logo</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto d-flex justify-content-between w-50">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Resources</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Community</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h1>Welcome to SkillNet</h1>
        {backendData.length === 0 ? (
          <p>Start building SkillNet</p>
        ) : (
          backendData.map((user, i) => (
            <p key={i}>{user}</p>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
