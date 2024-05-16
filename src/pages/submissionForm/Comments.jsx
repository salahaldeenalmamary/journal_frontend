import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, FormControl, FormLabel } from "react-bootstrap";
import { commentsAdded } from "../../store/UI/submissionForm";
import { useOutletContext } from "react-router-dom";
import { Form, Input } from "antd";
const Comments = ({ submission }) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState("");
  const [comment, setComment] = useState("");
  useEffect(() => {
    setComments(submission.comments);
    setComment(submission.comments);
  }, [submission]);
  const handleInputChange = (value) => {
    setComment(value);
  };
  const handleSaveComment = () => {
    dispatch(commentsAdded(comment));
  };
  return (
    <Card className="shadow ">
      <Card.Header>
        <Card.Title>Enter Comments</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form.Item
          name="comments"
          label="Select Section or Category"
          // valuePropName="fileList"
          noStyle
        >
          <Input.TextArea
            allowClear
            showCount
            // className="col-5"
            rows={3}
            value={comment}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </Form.Item>
        <Button onClick={handleSaveComment} disabled={comment === comments}>
          Save
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Comments;
