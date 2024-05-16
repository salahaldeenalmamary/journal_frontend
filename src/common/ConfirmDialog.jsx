
import { Modal ,Button} from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
export const ConfirmDialog = ({ visible, title, content, onConfirm, onCancel }) => {
    return (
      <Modal
        visible={visible}
        title={title}
        onCancel={onCancel}
        onOk={onConfirm}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>{content}</p>
      </Modal>
    );
  };
  
   
  





  export const DialogConfirm = ({  onAccept ,children, refresh ,...rest }) => {

  const [isVisible, setIsVisible] = useState(false);
  const [confirmClicked, setConfirmClicked] = useState(false); // State to track if confirm button is clicked
  const dialogRef = useRef(null);
 

  const handleConfirm = async  () => {
    try {
    
      setConfirmClicked(true);
      
    await  onAccept();
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
        < Button onClick={handleButtonClick}> {children}</Button>
        <ConfirmDialog
         {...rest}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          visible={isVisible}
        />
       
         
        
      </div>
    </div>
  );
};


