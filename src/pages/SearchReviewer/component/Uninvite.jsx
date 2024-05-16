import React, { useState, useRef, useEffect } from 'react';
import {ConfirmDialog} from '../../../common/ConfirmDialog';
import { Link } from "react-router-dom";
import { Uninvite} from '../../../store/entities/editorreviewerSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomMessageBox from '../../../common/CustomMessageBox';
import { Button } from 'antd';
const UninviteDialog = ({ id , refresh, children }) => {
  const { Message, loading } = useSelector((state) => state.entities.ReviewerAssignment);
  const [isVisible, setIsVisible] = useState(false);
  const [confirmClicked, setConfirmClicked] = useState(false); 
  const dialogRef = useRef(null);
  const dispatch = useDispatch();

  const handleConfirm = async  () => {
    try {
      const dto = {
        id: id,
        isTerminate: true,
      
      };
     
      setConfirmClicked(true);
      
      await dispatch(Uninvite(dto ));
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



  return (
    <div>
      <div ref={dialogRef}>
      <Button type="danger" onClick={handleButtonClick}>{children} </Button>
        <ConfirmDialog
          title={ <> Agree To {children} Reviewer</>}
       
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          visible={isVisible}
        />
       
       
        
      </div>
    </div>
  );
};

export default UninviteDialog;
