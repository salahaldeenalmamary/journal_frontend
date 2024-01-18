import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const SuggestedReviewersByAutherTable = () => {
  const [suggestedReviewers, setSuggestedReviewers] = useState([
    { id: 1, name: 'salah', email: 's@example.com' },
    { id: 2, name: 'ahmed', email: 'a@example.com' },
    
  ]);
  const headerStyle = {
    backgroundColor: "#255384", // Customize the color as needed
    color: "#fff", // Text color
    padding: "15px", // Add padding for better appearance
    marginBottom: "2px", // Add margin for separation
  };
  const handleRegisterReview = (reviewerId) => {
   
    console.log(`Review registered  ${reviewerId}`);
  };

  return (
    <Table striped bordered hover>
      <thead style={headerStyle}>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {suggestedReviewers.map((reviewer) => (
          <tr key={reviewer.id}>
            <td>{reviewer.id}</td>
            <td>{reviewer.name}</td>
            <td>{reviewer.email}</td>
            <td>
              <Button variant="success" onClick={() => handleRegisterReview(reviewer.id)}>
                Register Review
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SuggestedReviewersByAutherTable;
