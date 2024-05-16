import React, { useEffect, useState } from 'react';
import { Table, Radio, Checkbox, Button, Space, Row, Col, Select, Typography, Input } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { getReviewerSelectedSubmissions, inviteAfterSelected, removeselectedreviewers } from '../../store/entities/editorreviewerSlice';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined, SaveOutlined, FastBackwardFilled } from '@ant-design/icons';
import { addReviewer, deleteReviewer, updateReviewer, setSubmissionId, } from '../../store/UI/reviwersui';
import UninviteDialog from './component/Uninvite';
import InviteAlternateReviewerDialog from './component/inviteAlternateReviewer';
import { addSelectedUserId, removeSelectedUserId, IsSelectedUserIds } from '../../store/UI/searchReviewers';
import { DialogConfirm } from '../../common/ConfirmDialog';
import {
    DeleteOutlined,
    ArrowRightOutlined,
    SwapOutlined,
    ArrowUpOutlined,
} from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

const ManageSelectedreviewers = () => {
    const [inviteData, setInviteData] = useState([]);
    const [alternativeData, setAlternativeData] = useState([]);
    const [proposeData, setProposeData] = useState([]);
    const [totalInvite, setTotalInvite] = useState(0);
    const [totalAlternative, setTotalAlternative] = useState(0);
    const [totalPropose, setTotalPropose] = useState(0);
    const [refresh, setrefresh] = useState(false);

    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useNavigate();
    const { selectedRows, loading, reviewerSelectedSubmissions } = useSelector(state => state.entities.SelectedReviwer);

    const { selectedUserIds } = useSelector((store) => store.UIS.SearchReviewers);
    const handleSelection = (value) => {
        console.log(value);


    };

    const handleCheckboxChange = (e, record) => {
        const isChecked = e.target.checked;
        const userId = record.userid;
        if (isChecked) {
            dispatch(addSelectedUserId(userId));
        } else {
            dispatch(removeSelectedUserId(userId));
        }
    };
    const handleRemove = async (userid) => {
        const data = {
            reviewers: [
                {
                    userid: userid,
                    isSelectedAs: 0,
                    nodes: ""
                }
            ],
            submissionid: id
        };
        console.log(data);
        await dispatch(removeselectedreviewers(data));

    };

    const handleSendReminder = (record) => {

        console.log(`Sending reminder to ${record.name}`);
    };

    const handleerefresh = () => {
        if (refresh === true) {
            setrefresh(false);
        }
        else if (refresh === false) {
            setrefresh(true);
        }
        console.log(`Uninviting ${record.name}`);
    };
    useEffect(() => {
        dispatch(getReviewerSelectedSubmissions("string"));



    }, [dispatch, refresh]);

    useEffect(() => {
        setInviteData(reviewerSelectedSubmissions.invite);
        setAlternativeData(reviewerSelectedSubmissions.alternative);
        setProposeData(reviewerSelectedSubmissions.propose);
        setTotalInvite(reviewerSelectedSubmissions.totalinvite);
        setTotalAlternative(reviewerSelectedSubmissions.totalalternative);
        setTotalPropose(reviewerSelectedSubmissions.totalpropose);
    }, [reviewerSelectedSubmissions]);




    const columnsinvite = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Date Invited ',
            dataIndex: 'assignemntDate',
            key: 'assignemntDate',
        },
        {
            title: 'Date Agree ',
            dataIndex: 'agreedDate',
            key: 'agreedDate',
        },

        {
            title: '',
            key: 'select',
            render: (text, record) => (
                <Row gutter={[16, 16]} justify="center">
                    <Col>
                        <Button type="primary" onClick={() => handleSendReminder(record)}>Send Reminder</Button>
                    </Col>
                    <Col>
                        <UninviteDialog id={record.id} refresh={handleerefresh}> {record.agreedDate == " " ? "Uninvite" : "Unassign"} </UninviteDialog>
                    </Col>
                </Row>
            ),
        }

    ];

    const columnsalternative = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },

        {
            title: 'Message',
            dataIndex: 'messge',
            key: 'messge',
        },

        {
            title: 'Created At',
            dataIndex: 'createAt',
            key: 'createAt',
        }, {
            title: 'Dont Use',
            key: 'select',
            render: (text, record) => (
                <Row gutter={[16, 16]} justify="center">
                    <Col>
                        <Button type="info" >
                            <ArrowUpOutlined />
                        </Button>
                    </Col>
                    <Col>
                        <InviteAlternateReviewerDialog
                            submissionId={id} userId={record.userid}
                            Users={inviteData.map(row => ({
                                id: row.userid, name: row.name
                            }))} onSelect={handleSelection}></InviteAlternateReviewerDialog>
                    </Col>
                    <Col>
                        <DialogConfirm title="delete this Alternate reviewer" refresh={handleerefresh} onAccept={() => handleRemove(record.userid)}>   <DeleteOutlined /></DialogConfirm>

                    </Col>

                </Row>
            ),
        },
    ];



    const columnspropose = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },

        {
            title: 'Message',
            dataIndex: 'messge',
            key: 'messge',
        },

        {
            title: 'Created At',
            dataIndex: 'createAt',
            key: 'createAt',
        }, {
            title: ' Invite',
            key: 'select',
            render: (text, record) => (
                <Row >
                    <Checkbox onChange={(e) => handleCheckboxChange(e, record)}>

                    </Checkbox>
                    <Space size={10} />
                    <DialogConfirm title="delete this Alternate reviewer" refresh={handleerefresh} onAccept={() => handleRemove(record.userid)}>   <DeleteOutlined /></DialogConfirm>

                </Row>

            ),
        },
    ];



    const handleSave = async () => {
        dispatch(IsSelectedUserIds());
        history(`/main/selectedreviewertable/${id}`);
    };


    const handleUpdateReviewer = (userid, updatedData) => {
        dispatch(updateReviewer({ userid, updatedReviewer: updatedData }));
    };

    return (

        <div>

            <h5>Total Invite: {totalInvite}</h5>

            <Table columns={columnsinvite} dataSource={inviteData} pagination={false} showHeader size='small' scroll={{ x: 500, y: 700 }} />

            <hr />

            <h5>Total Alternative: {totalInvite}</h5>

            <Table columns={columnsalternative} dataSource={alternativeData} pagination={false} size='small' scroll={{ x: 500, y: 700 }} />


            <hr />
            <h5>Total Propose: {totalInvite}</h5>

            <Table footer={() => (selectedUserIds.length != 0 ? (<Button icon={<SaveOutlined />} onClick={handleSave}  >
                Select To invite
            </Button>) : (<Space></Space>))} columns={columnspropose} dataSource={proposeData} pagination={false} size='small' scroll={{ x: 500, y: 700 }} />




        </div>
    );
};

export default ManageSelectedreviewers;
