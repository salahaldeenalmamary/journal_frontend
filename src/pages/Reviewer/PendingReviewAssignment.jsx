import React, { useEffect, useCallback, useState } from 'react';


import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingReviewAssignment } from '../../store/entities/ReviewerSlice';
import { actionsToggled } from "../../store/UI/submissionsTable";
import { Collapse, Table, Button, Dropdown, Menu ,Space} from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';
import SubmissionView from './component/SubmissionView';
const PendingReviewAssignment = () => {


  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.entities.ReviewerAssignment);
  const { toggleActions } = useSelector((store) => store.UIS.submissionsTable);
  const handleActionsToggle = useCallback(() => dispatch(actionsToggled()));
  const [columns, setColumns] = useState([]);



  useEffect(() => {
    dispatch(fetchPendingReviewAssignment());
    handleTableContent();
  }, [dispatch, toggleActions]);

    const handleGoBack = () => {
      window.history.back();
    };
  const handleTableContent = () => {
    const cols = [
      {

        title: (
          <Button onClick={handleActionsToggle}>
            {toggleActions ? "Hide Actions" : "Show Actions"}
          </Button>
        ),
        dataIndex: "action",
        width: 100, 
        render: (text, record) => (

          <>
            {toggleActions ? (
              <ul className="list-unstyled actions">
                <li>
                <SubmissionView fileId={record.fileId}></SubmissionView>
                </li>
                <li> 
                <Link to={`/main/recommendation/${record.submissionId}/${record.id}/${record.attachmentId}`}>
                    Submit Recommendation
                  </Link>
                </li>
                <li>
                  <Link to={"/main/submission_details"}>
                    Similar Articles in MEDLINE
                  </Link>
                </li>
                <li>
                  <Link to={"/main/emailFormSends"}>Send E-mail</Link>
                </li>
              </ul>
            ) : (
              <Dropdown overlay={getMenu(record)}>
                <Button>Actions</Button>
              </Dropdown>
            )}
          </>
        ),
        width: 150, 
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100, 
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
      },
      {
        title: 'Assigned Date',
        dataIndex: 'assignedDate',
        key: 'assignedDate',
        sorter: (a, b) => new Date(a.assignedDate) - new Date(b.assignedDate),
      },
      {
        title: 'Confirmed Date',
        dataIndex: 'confirmedDate',
        key: 'confirmedDate',
        sorter: (a, b) => new Date(a.confirmedDate) - new Date(b.confirmedDate),
      },
      {
        title: 'Completed Date',
        dataIndex: 'completedDate',
        key: 'completedDate',
        sorter: (a, b) => new Date(a.completedDate) - new Date(b.completedDate),
      },
      {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
        sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
      },
      {
        title: 'Response Due Date',
        dataIndex: 'responseDueDate',
        key: 'responseDueDate',
        sorter: (a, b) => new Date(a.responseDueDate) - new Date(b.responseDueDate),
      },
      {
        title: 'Delivery Date',
        dataIndex: 'deliveryDate',
        key: 'deliveryDate',
        sorter: (a, b) => new Date(a.deliveryDate) - new Date(b.deliveryDate),
      },
      {
        title: 'Response Date',
        dataIndex: 'responseDate',
        key: 'responseDate',
        sorter: (a, b) => new Date(a.responseDate) - new Date(b.responseDate),
      },
      {
        title: 'Is Accepted',
        dataIndex: 'isAccepted',
        key: 'isAccepted',
        render: (isAccepted) => isAccepted ? 'Yes' : 'No',
      },
      {
        title: 'Assignment State',
        dataIndex: 'assignmentState',
        key: 'assignmentState',
        render: (assignmentState) => assignmentState ? 'Active' : 'Inactive',
      },
      {
        title: 'Submission ID',
        dataIndex: 'submissionId',
        key: 'submissionId',
      },

    ];

    setColumns(cols);
  };
  const pagination = {
    pageSize: 10,
    
    total: data.length,
    showSizeChanger: true,
    showQuickJumper: true,
    onChange: (page) => {
      console.log('Page:', page);
    },
    onShowSizeChange: (current, pageSize) => {
      console.log('PageSize:', pageSize);
    },
    pageSizeOptions: ['10', '20', '30', '40'], // Specify the dropdown options
  };
  const getMenu = (record) => (
    <Menu>
      <Menu.Item key="1">
      <SubmissionView fileId={record.fileId}></SubmissionView>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={"/main/recommendation"}>Submit Recommendation</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={"/main/submission_details"}>Similar Articles in MEDLINE</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to={"/main/emailFormSend"}>Send E-mail</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <Table
      tableLayout="vertical"
      showHeader
      scroll={{ x: 2000, y: 700 }}
     
      size="small"
      columns={columns}
      dataSource={data.data}
      loading={loading}
      pagination={pagination}
      rowKey="id"
      title={() => (
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={handleGoBack}>
            Back
          </Button>
          <span>Table Title</span>
        </Space>
      )}
    />
  );
};

export default PendingReviewAssignment;
