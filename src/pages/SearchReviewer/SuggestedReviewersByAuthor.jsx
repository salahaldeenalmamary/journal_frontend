import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import SuggestedReviewersByAuthorTable from "./SuggestedReviewersByAuthorTable";

const SuggestedReviewersByAuthor = ({ SubmissionId }) => {
  const [selectedReviewers, setSelectedReviewers] = useState([]);
  const {suggestedReviewers} = useSelector(state => state.entities.suggestedReviewers);
  const handleSelectAllRegisteredReviewers = () => {
   
    const registeredReviewers = suggestedReviewers.filter(reviewer => reviewer.isRegister && reviewer.userId === userId);
    setSelectedReviewers(registeredReviewers);
  };

  return (
    <div>
     
      <SuggestedReviewersByAuthorTable SubmissionId={SubmissionId}  />
   
      <Button onClick={handleSelectAllRegisteredReviewers} type="primary">Select  Reviewers</Button> </div>
  );
};

export default SuggestedReviewersByAuthor;
