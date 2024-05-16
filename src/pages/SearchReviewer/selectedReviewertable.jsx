import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Radio, Checkbox, Button, Space, Row, notification ,Typography} from 'antd';

import { setSelectedAs } from '../../store/entities/editorreviewerSlice';
import { getReviewerStatisticsForUsersAsync, selectedReviewer, getReviewerbyclassficationForUsersAsync, GetReviewerByuserIds } from '../../store/entities/editorreviewerSlice';

import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, SaveOutlined, FastBackwardFilled } from '@ant-design/icons';
import { useApiWithMessage } from '../../common/Notification';
import Item from 'antd/es/list/Item';

const ReviewTable = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useNavigate();

    const { reviewerStatsForUsers, selectedRows, loading, reviewerStatsByClassification, ReviewerByuserIds } = useSelector(state => state.entities.SelectedReviwer);
    const { searchCriteria, targetKeys, byclassfication, searchin, selectedUserIds, byuserid } = useSelector((store) => store.UIS.SearchReviewers);

    const [columns, setColumns] = useState([]);
    const handleSelectedAsChange = (record, value) => {
        console.log(selectedRows);
        dispatch(setSelectedAs({ userid: record.userid, isSelectedAs: value }));
    };
    const col = [
        {
            title: 'Selected As',
            dataIndex: 'isSelectedAs',
            key: 'isSelectedAs', width: 100,
            render: (isSelectedAs, record) => (
                <div>
                    <Checkbox
                        checked={isSelectedAs === 1}
                        onChange={() => handleSelectedAsChange(record, 1)}
                    >
                        invite
                    </Checkbox>
                    <br />
                    <Checkbox
                        checked={isSelectedAs === 2}
                        onChange={() => handleSelectedAsChange(record, 2)}
                    >
                        alternative
                    </Checkbox>
                    <br />
                    {byuserid === false ? (<Checkbox
                        checked={isSelectedAs === 3}
                        onChange={() => handleSelectedAsChange(record, 3)}
                    >
                        propose
                    </Checkbox>) : null}
                </div>
            )

        },
         
          
        {
            title: 'Reviewer Name',
            dataIndex: 'reviewerName',
            key: 'reviewerName',
            width: 110,
            render: (text, record) => (
                <Link to={`/main/reviewerDetails/${record.userid}`}>{text}</Link> // Assuming `userid` is available in the record
            ),
        },

        {
            title: 'Board Member',
            dataIndex: 'boardMember',
            key: 'boardMember', width: 110,
        },  {
                title: 'Classifications ',
                dataIndex: 'classifications',
                key: 'classifications',
                width: 130,
                render: (text, record) => ( record.classifications.map(Item=>( 
                    <> <Typography.Text>{Item.id} : {Item.name}</Typography.Text> <br/></>))),
                  
                
            },
        {
            title: 'Invitations Statistics',
            dataIndex: 'invitationsStatistacts',
            key: 'invitationsStatistacts', width: 150,
            render: (text, record) => (
                <span>
                    Outstanding Invitations: {record.invitationsStatistacts.outstandingInvitations}<br />
                    Agreed: {record.invitationsStatistacts.agreed}<br />
                    Declined: {record.invitationsStatistacts.declined}<br />
                    Uninvited Before Agreeing: {record.invitationsStatistacts.uninvitedBeforeAgreeing}<br />
                    Terminated: {record.invitationsStatistacts.terminated}<br />
                    Total Invitations: {record.invitationsStatistacts.totalInvitations}
                </span>
            ),
        },
        {
            title: 'Reviewer Statistics',
            dataIndex: 'reviewerStatistics',
            key: 'reviewerStatistics', width: 150,
            render: (text, record) => (
                <span>
                    Reviews In Progress: {record.reviewerStatistacts.reviewsInProgress}<br />
                    Completed Reviews: {record.reviewerStatistacts.completedReviews}<br />
                    Unassigned After Agreeing: {record.reviewerStatistacts.unassignedAfterAgreeing}<br />
                    Terminated After Agreeing: {record.reviewerStatistacts.terminatedAfterAgreeing}<br />
                    Last Review Agreed: {record.reviewerStatistacts.lastReviewAgreed}<br />
                    Last Review Completed: {record.reviewerStatistacts.lastReviewCompleted}<br />
                    Last Review Declined: {record.reviewerStatistacts.lastReviewDeclined}<br />
                    Avg Days Outstanding: {record.reviewerStatistacts.avgDaysOutstanding}<br />
                    Manuscript Rating: {record.reviewerStatistacts.manuscriptRating}<br />
                    Avg Review Rating: {record.reviewerStatistacts.avgReviewRating}
                </span>
            ),
        },
    ];

    useEffect(() => {
        console.log(targetKeys);
        if (byuserid === true) {
            const user = {
                userIds: [
                    ...selectedUserIds
                ],
                submissionId: id
            };
            dispatch(GetReviewerByuserIds(user))
        } else if (byclassfication === true) {
            dispatch(getReviewerbyclassficationForUsersAsync({
                classificationIds: [
                    ...targetKeys
                ],
                submissionId:id
            }));
        }
        else if (byclassfication === false) {
            dispatch(getReviewerStatisticsForUsersAsync({
                filterCriterias: [
                    ...searchCriteria.map(({ rowNo, ...rest }) => rest)
                ],
                operator: "and",
                searchin: searchin,
                searchfrom: 0,
                submissionId: id
            }));
        }

        setColumns(col);

    }, [dispatch]);

    useEffect(() => {

        console.log('Selected rows changed:', selectedRows);
    }, [selectedRows]);

    const handleSubmit = async () => {
        await dispatch(selectedReviewer({
            reviewers: [
                ...selectedRows
            ],
            submissionid: "string"
        }));





        history(`/main/selectedreviewers/${id}`);
    };

    return (
        <div>
            <Table tableLayout="vertical"
                showHeader
                loading={loading}

                scroll={{ x: 1000, }}

                size="small" columns={columns} dataSource={ reviewerStatsForUsers.data } rowKey="userid" title={() => (
                        <Row><Space>
                            <Button icon={< FastBackwardFilled />} >
                                Cancell process
                            </Button>

                        </Space> <Space>
                                <Button icon={<SaveOutlined />} onClick={handleSubmit} >
                                    Save
                                </Button>

                            </Space></Row>
                    )} /></div>
    );
};

export default ReviewTable;
