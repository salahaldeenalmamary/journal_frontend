import React, { useState, useRef, useEffect } from 'react';
import {ConfirmDialog}  from '../../../common/ConfirmDialog';
import { Link } from "react-router-dom";
import { AcceptReviewAssignment, fetchReviewAssignment } from '../../../store/entities/ReviewerSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomMessageBox from '../../../common/CustomMessageBox';

const AgreeToReviewer = ({ param, onAccept , refresh}) => {
  const { Message, loading } = useSelector((state) => state.entities.ReviewerAssignment);
  const [isVisible, setIsVisible] = useState(false);
  const [confirmClicked, setConfirmClicked] = useState(false); // State to track if confirm button is clicked
  const dialogRef = useRef(null);
  const dispatch = useDispatch();

  const handleConfirm = async  () => {
    try {
      const statusDto = {
        id: param.id,
        isAccepted: true,
        confirmedDate: "2024-03-18T20:26:35.008Z",
        assignmentState: true,
        submissionId: param.submissionId
      };
      setConfirmClicked(true);
      
      await dispatch(AcceptReviewAssignment(statusDto ));
      setConfirmClicked(false);
      setIsVisible(false);
      refresh();
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
        <Link onClick={handleButtonClick}> Agree To Reviewer</Link>
        <ConfirmDialog
          title=" Agree To Reviewer "
          content="Are you sure you want to Agree To Reviewer and Navigate to Pending Stage?"
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

export default AgreeToReviewer;
