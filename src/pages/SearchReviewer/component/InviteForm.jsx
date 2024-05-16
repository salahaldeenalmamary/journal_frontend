import React, { useState, useEffect } from 'react';
import { Input, Button, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateReviewer, getReviewerById } from '../../../store/UI/reviwersui';
import { useParams } from "react-router-dom";
const { TextArea } = Input;

const InviteForm = () => {
  const dispatch = useDispatch();
  const { userid } = useParams();
  const [to, setEmail] = useState('');
  const [subject, setSubject] = useState('Invitation to Review Submission');
  const [content, setContent] = useState('');


  const { selectedReviewer ,messgeTemp} = useSelector(state => state.UIS.reviewerInvite);

  useEffect(() => {
    console.log(messgeTemp);
    dispatch(getReviewerById(userid));
    // dispatch(updateReviewer({
    //   userid: userid,
    //   updatedReviewer: {
    //     emailSend: {
    //       to: to,
    //       subject: messgeTemp.head,
    //       content:messgeTemp. defaultContent
    //     }
    //   }
    // }));

  }, [dispatch, userid]);

  useEffect(() => {
    if (selectedReviewer && selectedReviewer.emailSend) {
      
      setEmail(selectedReviewer.emailSend.to);
      setSubject(selectedReviewer.emailSend.subject);
      setContent(selectedReviewer.emailSend.content);
   
    }
  }, [selectedReviewer]);
  

  const handleSubmit = () => {
    dispatch(updateReviewer({
      userid: userid,
      updatedReviewer: {
        emailSend: {
          to: to,
          subject: subject,
          content: content
        }
      }
    }));
    window.history.back();
  };



  return (
    <Form layout="vertical">
      <Form.Item label="Recipient Email">
        <Input value={to} onChange={e => setEmail(e.target.value)} />
      </Form.Item>
      <Form.Item label="Subject">
        <Input value={subject} onChange={e => setSubject(e.target.value)} />
      </Form.Item>
      <Form.Item label="Message Content">
        <TextArea
          rows={10}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Send Invitation
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InviteForm;
