

import React, { useState, useRef, useEffect } from 'react';
import {ConfirmDialog}  from '../../../common/ConfirmDialog';
import { Link } from "react-router-dom";
import { RejectReviewAssignment, fetchReviewAssignment } from '../../../store/entities/ReviewerSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomMessageBox from '../../../common/CustomMessageBox';

const DeclineToReviewer = ({ param, onAccept }) => {
  const { Message, loading } = useSelector((state) => state.entities.ReviewerAssignment);
  const [isVisible, setIsVisible] = useState(false);
  const [confirmClicked, setConfirmClicked] = useState(false); 
  const dialogRef = useRef(null);
  const dispatch = useDispatch();

  const handleConfirm = async  () => {
    try {
      const statusDto = {
        id: param.id,
        isAccepted: false,
        confirmedDate: "2024-03-18T20:26:35.008Z",
        assignmentState: false,
        submissionId: param.submissionId
      };
    
     
      await dispatch(RejectReviewAssignment({ statusDto }));
  
      setIsVisible(false);
     
    } catch (error) {
      console.error('Error while confirming:', error);
     
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleButtonClick = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    console.log(param);
  }, []);

  return (
    <div>
      <div ref={dialogRef}>
        <Link onClick={handleButtonClick}> Decline To Reviewer</Link>
        <ConfirmDialog
         title="Decline To Reviewer"
         content="Are you sure you want to  Decline To Reviewer "
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          visible={isVisible}
        />
       
          <CustomMessageBox 
            loadeding={loading}
            successText={Message}
           
          />
        
      </div>
    </div>
  );
};

export default DeclineToReviewer;
