import React from 'react';
// import { Link } from 'react-router-dom';
import "../components/style.css";
import { useNavigate } from 'react-router-dom'; 

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="error-container">
    <h1>404 - Page Not Found</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <button onClick={() => navigate("/")}>Go Home</button>
</div>
  );
};

export default Error;
