import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetBySubmissionId } from "../../store/entities/suggestedReviewerSlice";


const SuggestedReviewersByAuthorTable = ({SubmissionId}) => {
  const dispatch = useDispatch();
  const {suggestedReviewers} = useSelector(state => state.entities.suggestedReviewers);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(GetBySubmissionId(SubmissionId))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
      console.log(suggestedReviewers);
  },  [dispatch, SubmissionId]);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "",
      key: "register",
      render: (text, record) => (
        record.isRejester === false ? (
          <Button variant="success" onClick={() => handleRegisterReview(record.id)}>
            Register Review
          </Button>
        ) : null
      ),
    },
  ];

  const handleRegisterReview = (reviewerId) => {
    console.log(`Review registered ${reviewerId}`);
  };

  return (
    <Table  pagination={false} scroll={{ x: 500, y: 700 }}
      loading={loading}
      columns={columns}
      dataSource={suggestedReviewers}
      bordered
      rowKey="id"
    />
  );
};

export default SuggestedReviewersByAuthorTable;
