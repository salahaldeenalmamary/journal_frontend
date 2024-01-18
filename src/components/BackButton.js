// 
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa'; // Import the arrow icon

const BackButton = ({ to, label }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <FaArrowLeft className="me-2" /> {label || ''}
    </Link>
  );
};

export default BackButton;
