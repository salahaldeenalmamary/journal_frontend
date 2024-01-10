import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const SuggestedReviewersByAutherTable = () => {
  const [suggestedReviewers, setSuggestedReviewers] = useState([
    { id: 1, name: 'salah', email: 's@example.com' },
    { id: 2, name: 'ahmed', email: 'a@example.com' },
    
  ]);

  const handleRegisterReview = (reviewerId) => {
   
    console.log(`Review registered  ${reviewerId}`);
  };

  return (
    <Table striped bordered hover>
      <thead>
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
