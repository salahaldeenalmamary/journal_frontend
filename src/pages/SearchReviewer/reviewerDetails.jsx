import { Table, List, Tag ,Typography ,Card} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link , useNavigate,useParams} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import LoadReferenceProgressBar from "../../common/progressIndicator/LoadReferenceProgressBar";
import {getReviewerDetails} from  '../../store/entities/editorreviewerSlice';

const UnavailableDateList = ({ data }) => (
  <List
    header={<div>Unavailable Dates</div>}
    bordered
    dataSource={data}
    renderItem={item => (
      <List.Item size>
        <div>ID: {item.id}</div>
        <div>Name: {item.name}</div>
        <div>From Date: {item.fromDate}</div>
        <div>To Date: {item.toDate}</div>
        <div>Reasons: {item.reasons}</div>
      </List.Item>
    )}
  />
);




const CustomList = ({ data, type }) => {
    let header = '';
    let renderItem = null;

    switch (type) {
        case 'keywords':
            header = 'Keywords';
            renderItem = (item, index) => (
                <List.Item>
                    <Typography.Text>{index + 1}. ID: {item.Id} - DisplayName: {item.DisplayName}</Typography.Text>
                </List.Item>
            );
            break;
        case 'roles':
            header = 'Roles';
            renderItem = (item, index) => (
                <List.Item >
                    <Typography.Text >{index + 1}. {item}</Typography.Text>
                </List.Item>
            );
            break;
        case 'classifications':
            header = 'Classifications';
            renderItem = (item, index) => (
                <List.Item>
                    <Typography.Text>{index + 1} : {item.name}</Typography.Text>
                </List.Item>
            );
            break;
        default:
            break;
    }

    return (
        <List   size='small'  
            header={<Typography.Title level={5}>{header}</Typography.Title>}
            bordered   
            dataSource={data} grid={1} 
            renderItem={(item, index) => renderItem(item, index)}
        />
    );
};



const ReviewerDetails = () => {

    const dispatch = useDispatch();
    const {userid}=useParams();
    const history=useNavigate();
    const { loading ,ReviewerDetails} = useSelector(state => state.entities.SelectedReviwer);
    useEffect(() => {
     
        dispatch(getReviewerDetails(userid));
      }, [dispatch, userid]);
    
    const CompleteTable = [
        { title: 'Submission ID', dataIndex: 'submissionid', key: 'submissionid' },
        { title: 'Recommendation', dataIndex: 'recommendation', key: 'recommendation' },
        { title: 'Rating', dataIndex: 'rating', key: 'rating' },
        { title: 'No Reminder', dataIndex: 'noReminder', key: 'noReminder' },
        { title: 'Assigned Date', dataIndex: 'assignedDate', key: 'assignedDate' },
        { title: 'Agree Date', dataIndex: 'agreeDate', key: 'agreeDate' },
        { title: 'Completed Date', dataIndex: 'completedDate', key: 'completedDate' },
        { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
        { title: 'Editor Name', dataIndex: 'editorname', key: 'editorname' },
    ];


    const AlternativeTable = [
        { title: 'User ID', dataIndex: 'userid', key: 'userid' },
        { title: 'Editor Name', dataIndex: 'editorname', key: 'editorname' },
        { title: 'Add Date', dataIndex: 'addDate', key: 'addDate' },
        { title: 'Submission ID', dataIndex: 'submissionid', key: 'submissionid' },
    ];

    const InvitationsStatisticsTable = [
        { title: 'Date Last Invited', dataIndex: 'dateLastInvited', key: 'dateLastInvited' },
        { title: 'Outstanding Invitations', dataIndex: 'outstandingInvitations', key: 'outstandingInvitations' },
        { title: 'Agreed', dataIndex: 'agreed', key: 'agreed' },
        { title: 'Declined', dataIndex: 'declined', key: 'declined' },
        { title: 'Uninvited Before Agreeing', dataIndex: 'uninvitedBeforeAgreeing', key: 'uninvitedBeforeAgreeing' },
        { title: 'Terminated', dataIndex: 'terminated', key: 'terminated' },
        { title: 'Total Invitations', dataIndex: 'totalInvitations', key: 'totalInvitations' },
    ];

   const ReviewerStatisticsTable = [
        { title: 'Reviews In Progress', dataIndex: 'reviewsInProgress', key: 'reviewsInProgress' },
        { title: 'Completed Reviews', dataIndex: 'completedReviews', key: 'completedReviews' },
        { title: 'Unassigned After Agreeing', dataIndex: 'unassignedAfterAgreeing', key: 'unassignedAfterAgreeing' },
        { title: 'Terminated After Agreeing', dataIndex: 'terminatedAfterAgreeing', key: 'terminatedAfterAgreeing' },
        { title: 'Last Review Agreed', dataIndex: 'lastReviewAgreed', key: 'lastReviewAgreed' },
        { title: 'Last Review Completed', dataIndex: 'lastReviewCompleted', key: 'lastReviewCompleted' },
        { title: 'Last Review Declined', dataIndex: 'lastReviewDeclined', key: 'lastReviewDeclined' },
        { title: 'Average Days Outstanding', dataIndex: 'avgDaysOutstanding', key: 'avgDaysOutstanding' },
        { title: 'Manuscript Rating', dataIndex: 'manuscriptRating', key: 'manuscriptRating' },
        { title: 'Average Review Rating', dataIndex: 'avgReviewRating', key: 'avgReviewRating' },
    ];

    const ReviewerProposeTable = [
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Nodes', dataIndex: 'nodes', key: 'nodes' },
        { title: 'Proposed By', dataIndex: 'purposedBy', key: 'purposedBy' },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
        { title: 'Submission ID', dataIndex: 'submissionid', key: 'submissionid' },
    ];











    if (!ReviewerDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div >
           
<CustomList type="roles" data={ReviewerDetails.roles} />
<CustomList type="classifications" data={ReviewerDetails.classifications} />
                <Table
                   title={()=>(<h6> Complete Assignments</h6>)}
                    loading={loading}
                      scroll={{ x: 500, y: 500 }}
                      pagination={false}
            size="small"
                    dataSource={ReviewerDetails.complete}
                    columns={CompleteTable}
                />
                <Table
                title={()=>(<h6> Complete Assignments</h6>)}
                    loading={loading}
                      scroll={{ x: 500, y: 500 }}
                      pagination={false}
            size="small"
                    dataSource={ReviewerDetails.alternative}
                    columns={AlternativeTable}
                />
                <Table  title={()=>(<h6> Reviewer Propose</h6>)}
                    loading={loading}
                      scroll={{ x: 500, y: 500 }}
                      pagination={false}
            size="small"
                    dataSource={ReviewerDetails.propose}
                    columns={ReviewerProposeTable}
                />
                 <Table  title={()=>(<h6> Invitations Statistics</h6>)}
                    loading={loading}
                      scroll={{ x: 500, y: 500 }}
                      pagination={false}
            size="small"
                    dataSource={[ReviewerDetails.invitationsStatistacts]}
                    columns={InvitationsStatisticsTable}
                />
                  <Table title={()=>(<h6> Reviewer StatisticsTable</h6>)}
                    loading={loading}
                      scroll={{ x: 500, y: 500 }}
                      pagination={false}
            size="small"
                    dataSource={[ReviewerDetails.reviewerStatistacts]}
                    columns={ReviewerStatisticsTable}
                 /> 
         
        </div>
    );
   
};
export default ReviewerDetails;