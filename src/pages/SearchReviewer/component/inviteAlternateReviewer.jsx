
import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AlternatereviewerLinkInvite } from '../../../store/entities/editorreviewerSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomMessageBox from '../../../common/CustomMessageBox';
import { Button, Radio, Modal } from 'antd';

import {

  SwapOutlined,

} from '@ant-design/icons';
const InviteAlternateReviewerDialog = ({ Users,userId,submissionId, refresh, onSelect }) => {
  const { Message, loading } = useSelector((state) => state.entities.ReviewerAssignment);
  const [isVisible, setIsVisible] = useState(false);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const dialogRef = useRef(null);
  const dispatch = useDispatch();
  const [selection, setSelection] = useState("");
  const handleConfirm = async () => {
    try {
        const linkInvite = {
          submissionId: submissionId,
          userId: userId,
          linkforUserId: selection
        }

      setConfirmClicked(true);

         await dispatch(AlternatereviewerLinkInvite(linkInvite ));
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
  const handleSelectionChange = (e) => {
    const value = e.target.value;
    setSelection(value);
    onSelect(value);
  };

  useEffect(() => {
    console.log(Users);
  }, []);
  return (
    <div>
      <div ref={dialogRef}>
        <Button onClick={handleButtonClick} type="info" >
          <SwapOutlined />
        </Button>

        <Modal
          title=" Agree To  Uninvite Reviewer "

          onOk={handleConfirm}
          onCancel={handleCancel}
          visible={isVisible}
        >   <Radio.Group onChange={handleSelectionChange}>
            {Users.map((section) => (
              <>
                <Radio value={section.id}



                >
                  {section.name}
                </Radio>
                <br /></>
            ))}</Radio.Group>

        </Modal>



      </div>
    </div>
  );
};

export default InviteAlternateReviewerDialog;
