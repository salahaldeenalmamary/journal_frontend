import React, { useEffect, useState ,useCallback} from 'react';
import { Table, Radio, Checkbox, Button, Space, Row, Select, Typography, Input, DatePicker, InputNumber } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import {
  getselectedReviewerInviteData, inviteAfterSelected, removeselectedreviewers,
  selectedReviewerInvite, selectedReviewer, setAlternativeData, setInviteData, setProposeData, setClear
} from '../../store/entities/editorreviewerSlice';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined, SaveOutlined, FastBackwardFilled } from '@ant-design/icons';
import { addReviewer, deleteReviewer, updateReviewer, setSubmissionId, getReviewerById,setmessgeTemp, clearReviewer } from '../../store/UI/reviwersui';
import {  fetchmessageTemplate } from '../../store/entities/messageTemplate';
import onPopState from "../../common/hook/PopState"; 

const { Option } = Select;
const { Text } = Typography;

const Selectedreviewers = () => {
  // const [inviteData, setInviteData] = useState([]);
  // const [alternativeData, setAlternativeData] = useState([]);
  // const [proposeData, setProposeData] = useState([]);

  const [totalInvite, setTotalInvite] = useState(0);
  const [totalAlternative, setTotalAlternative] = useState(0);
  const [totalPropose, setTotalPropose] = useState(0);
  const [AddDate, SetAddDate] = useState('');
  const [dueDate, SetdueDate] = useState('');
  const [selectedRowsinvite, setSelectedRowsinvite] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useNavigate();
  const { selectedRows, loading, selectedReviewerInviteData, inviteData, alternativeData, proposeData } = useSelector(state => state.entities.SelectedReviwer);
 const {messageTemplates}=useSelector(state => state.entities.messageTemplate);
  const { reviewers, submissionId, messgeTemp } = useSelector(state => state.UIS.reviewerInvite);

const handleChangeMessgeTemplete=(payload)=>{

  const index=messageTemplates.findIndex(row => row.name === payload);
  if (index!==-1) {
   dispatch( setmessgeTemp(messageTemplates[index]));
    console.log(messageTemplates[index]);
  }
}
  const handleCheckboxChange = (e, record) => {
    const isChecked = e.target.checked;
    if (isChecked) {

      setSelectedRowsinvite([...selectedRowsinvite, { userid: record.userid, isSelectedAs: 1, nodes: null }]);
    } else {

      const updatedSelectedRowsinvite = selectedRowsinvite.filter(row => row.userid !== record.userid);
      setSelectedRowsinvite(updatedSelectedRowsinvite);
    }
    console.log(selectedRowsinvite);
  };

  const handleInputChange = (value, recordKey) => {
    const updatedData = proposeData.map(item => {
      if (item.userid === recordKey) {
        return { ...item, nodes: value };
      }
      return item;
    });
    dispatch(setProposeData(updatedData));;
    console.log(proposeData);
  };
  useEffect(() => {
dispatch(fetchmessageTemplate());

    if (reviewers.length == 0) {
      dispatch(selectedReviewerInvite({
        reviewers: [
          ...selectedRows
        ],
        submissionid: "string"
      }));
    }

    //  dispatch(getselectedReviewerInviteData("string"));



  }, [dispatch]);

  useEffect(() => {

    if (selectedReviewerInviteData) {
      console.log(selectedReviewerInviteData.invite);

      if (reviewers.length == 0) {
        dispatch(setInviteData(selectedReviewerInviteData.invite
        ));;
        dispatch(setAlternativeData(selectedReviewerInviteData.alternative));;
        dispatch(setProposeData(selectedReviewerInviteData.propose));;
        setTotalInvite(selectedReviewerInviteData.totalinvite);
        setTotalAlternative(selectedReviewerInviteData.totalalternative);
        setTotalPropose(selectedReviewerInviteData.totalpropose);

      }
    }


  }, [selectedReviewerInviteData]);


  useEffect(() => {
    const defaultDate = new Date().toISOString();
    if (inviteData) {
      const payload = {
        reviewers: inviteData.map(row => ({
          userid: row.userid,
          email: row.email,
          day: row.dateInvitedAfterDay,
          isSelectedAs: 1,
          emailSend: {
            to: row.email,
            withfile:false,
            subject: 'Invitation to Review Submission',
            dateLastInvited: 'string',
            content: `Dear ${row.name},\n\nWe hope this message finds you well.\n\nWe would like to invite you to review a submission. Your expertise and insights would be invaluable in this process.\n\nPlease find the details of the submission below:\n\n[Insert submission details here]\n\nYour feedback will play a crucial role in shaping the outcome, and we appreciate your time and effort.\n\nThank you for your consideration.\n\nBest regards,\n[Salah Aldeen Al-mamari]`
          },
          reviewAssignmen: {
            id: 0,
            message: 'string',
            assignedDate: defaultDate,
            confirmedDate: defaultDate,
            completedDate: defaultDate,
            dueDate: row.createdAt,
            responseDueDate: defaultDate,
            deliveryDate: defaultDate,
            responseDate: defaultDate,
            isAccepted: false,
            assignmentState: false,
            submissionId: 'string',
            senderId: 'string',
            receiverId: row.userid,
          }
        })),
        submissionid: 'string'
      };



      payload.reviewers.map(async reviewer => {
        dispatch(addReviewer(reviewer));
      });
    }
    if (alternativeData) {
      const payload2 = {
        reviewers: alternativeData.map(row => ({
          userid: row.userid,
          email: row.email,
          isSelectedAs: 2,
          day: row.dateInvitedAfterDay,
          emailSend: {
            to: row.email,
            withfile:false,
            subject: '  alternate  to Review Submission',
            dateLastInvited: 'string',
            content: `Dear ${row.name},\n\nWe hope this message finds you well.\n\nWe would like to invite you to review a submission. Your expertise and insights would be invaluable in this process.\n\nPlease find the details of the submission below:\n\n[Insert submission details here]\n\nYour feedback will play a crucial role in shaping the outcome, and we appreciate your time and effort.\n\nThank you for your consideration.\n\nBest regards,\n[Salah Aldeen Al-mamari]`
          },
          reviewAssignmen: {
            id: 0,
            message: 'string',
            assignedDate: defaultDate,
            confirmedDate: defaultDate,
            completedDate: defaultDate,
            dueDate: row.createdAt,
            responseDueDate: defaultDate,
            deliveryDate: defaultDate,
            responseDate: defaultDate,
            isAccepted: false,
            assignmentState: false,
            submissionId: 'string',
            senderId: 'string',
            receiverId: row.userid,
          }
        })),
        submissionid: 'string'
      };

      payload2.reviewers.map(async reviewer => {
        dispatch(addReviewer(reviewer));
      });
    }

  }, [alternativeData, inviteData]);

  const handleDateChange = (dateString, recordKey) => {
    const recordIndex = alternativeData.findIndex(item => item.userid === recordKey);

    if (recordIndex !== -1) {
      const updatedRecord = { ...alternativeData[recordIndex], dateInvitedAfterDay: dateString };
      const updatedData = [...alternativeData];
      updatedData[recordIndex] = updatedRecord;

      console.log(alternativeData);
      dispatch(setAlternativeData(updatedData));;
      handleUpdate(updatedRecord.userid, updatedRecord.dateInvitedAfterDay);

    }
  };
  const handleDueDateChange = (dateString, recordKey) => {
    const recordIndex = inviteData.findIndex(item => item.userid === recordKey);

    if (recordIndex !== -1) {
      const updatedRecord = { ...inviteData[recordIndex], dateLastInvited: dateString };
      const updatedData = [...inviteData];
      updatedData[recordIndex] = updatedRecord;

      console.log(alternativeData);
      dispatch(setInviteData(updatedData));
      handleUpdate(updatedRecord.userid, updatedRecord.dateLastInvited);
    }
  };

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
      title: 'Date Invited After Day',
      dataIndex: 'dateInvitedAfterDay',
      key: 'dateInvitedAfterDay',
    },

    {
      title: 'Message',
      dataIndex: 'messge',
      key: 'messge',
      render: (text, record) => (
        <div>
             <Select value={messgeTemp.name}
 nChange={(payload) => handleChangeMessgeTemplete(payload)}
              placeholder="Select Messge Temeplte"
               style={{width:"100%"}}
            >
              {messageTemplates.map((option) => (
                <Option key={option.id} value={option.name}>
                  {option.name}
                </Option>
              ))}
            </Select>
          <Text type="secondary">
            <Link to={`/main/inviteEmail/${record.userid}`} >Custom Messge</Link>
          </Text>
        </div>
      ),
    },

    {
      title: 'Due Date',
      dataIndex: 'dateLastInvited',
      key: 'dateLastInvited',
      render: (text, record) => (
        <InputNumber
          min={1}
          value={record.dateLastInvited}
          defaultValue={record.dateLastInvited} // Default value set to the day of the month
          onChange={day => handleDueDateChange(day, record.userid)}
        />
      ),
    }, , {
      title: 'Uninvite',
      key: 'select',
      render: (text, record) => (
        <Checkbox onChange={(e) => handleCheckboxChange(e, record)}>
          unUse
        </Checkbox>
      ),
    },
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
      with:170,
      render: (text, record) => (
        <div>
        
          <Select
               
value={messgeTemp.name}
                 onChange={(payload) => handleChangeMessgeTemplete(payload)}
                placeholder="Select Messge Temeplte"
                 style={{width:"100%"}}
              >
                {messageTemplates.map((option) => (
                  <Option key={option.id} value={option.name}>
                    {option.name}
                  </Option>
                ))}
              </Select>

          <Text type="secondary">
            <Link to={`main/inviteEmail/${record.userid}`} >Custom Messge</Link>
          </Text>
        </div>
      ),
    },

    {
      title: 'Add Date Review',
      dataIndex: 'dateInvitedAfterDay',
      key: 'dateInvitedAfterDay',
      render: (text, record) => (
        <InputNumber
          min={1}
          max={31} value={record.dateInvitedAfterDay}
          defaultValue={record.dateInvitedAfterDay} // Default value set to the day of the month
          onChange={day => handleDateChange(day, record.userid)}
        />
      ),
    },



    {
      title: 'Dont Use',
      key: 'select',
      render: (text, record) => (
        <Checkbox onChange={(e) => handleCheckboxChange(e, record)}>
          unUse
        </Checkbox>
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
      title: 'Nodes',
      dataIndex: 'nodes',
      key: 'nodes',
      render: (text, record) => (
        <Input.TextArea
          value={record.nodes}
          defaultValue={record.nodes}
          onChange={e => handleInputChange(e.target.value, record.userid)}
        />
      ),
    },

    {
      title: 'Created At',
      dataIndex: 'createAt',
      key: 'createAt',
    }, {
      title: 'Dont Use',
      key: 'select',
      render: (text, record) => (
        <Checkbox onChange={(e) => handleCheckboxChange(e, record)}>
          unUse
        </Checkbox>
      ),
    },
  ];




  const handleUpdate = (userid, day) => {
    dispatch(updateReviewer({
      userid: userid,
      updatedReviewer: {

        day: day
      }
    }));

  };



  const handleSave = async () => {
    try {
      const filteredReviewers = reviewers.filter(reviewer =>
        !selectedRowsinvite.some(selectedRow => selectedRow.userid === reviewer.userid)
      );

      await dispatch(inviteAfterSelected({ reviewers: [...filteredReviewers], submissionid: id }));
      await handleremoveselectedreviewerse();
      await handlerUpdatePorposereviewerse();
      dispatch(setClear());
      dispatch(clearReviewer());
      history(`main/manageSelectedreviewers/${id}`);


      //  await handleBrowserBack();


    } catch (error) {

      console.error("Error:", error);
    }
  };

  const handleremoveselectedreviewerse = async () => {
    await dispatch(removeselectedreviewers({ reviewers: selectedRowsinvite, submissionid: id }));
  };

  const handlerUpdatePorposereviewerse = async () => {
    const payload = {
      reviewers: proposeData.map(record => ({
        userid: record.userid,
        isSelectedAs: 3,
        nodes: record.nodes
      })),
      submissionid: "string"
    };
    console.log(payload);
    await dispatch(selectedReviewer(payload));
  };



  const handleUpdateReviewer = (userid, updatedData) => {

    dispatch(updateReviewer({ userid, updatedReviewer: updatedData }));
  };

  const handleBrowserBack = async () => {
    console.log(selectedReviewerInviteData);
    if (selectedReviewerInviteData) {
      let payload = {
        reviewers: proposeData.map(record => ({
          userid: record.userid,
          isSelectedAs: 3,
          nodes: record.nodes
        })),
        submissionid: id
      };

      payload.reviewers = payload.reviewers.concat(
        inviteData.map(record => ({
          userid: record.userid,
          isSelectedAs: 1,
          nodes: record.nodes
        }))
      );

      payload.reviewers = payload.reviewers.concat(
        alternativeData.map(record => ({
          userid: record.userid,
          isSelectedAs: 2,
          nodes: record.nodes
        }))
      );

      console.log('Reviewer removal payload:', payload);

      try {
        await dispatch(removeselectedreviewers(payload));
      } catch (error) {
        console.error('Error removing reviewers on popstate:', error);
      }
    }
    dispatch(setClear());
    dispatch(clearReviewer());
    window.history.back();

  };

  const handlePopState = useCallback((event) => {
  handleBrowserBack();
    console.log('Popstate event occurred:', event);
  }, []);
    onPopState(handlePopState);

  return (

    <div>

      <h5>Total Invite: {totalInvite}</h5>

      <Table columns={columnsinvite} dataSource={inviteData} pagination={false} showHeader scroll={{ x: 500, y: 700 }} />

      <hr />

      <h5>Total Alternative: {totalInvite}</h5>

      <Table columns={columnsalternative} dataSource={alternativeData} pagination={false} scroll={{ x: 500, y: 700 }} />


      <hr />
      <h5>Total Propose: {totalInvite}</h5>

      <Table columns={columnspropose} dataSource={proposeData} pagination={false} scroll={{ x: 500, y: 700 }} />


      <Row><Space>
        <Button icon={< FastBackwardFilled />} onClick={handleBrowserBack} >
          Cancell process
        </Button>

      </Space> <Space>
          <Button icon={<SaveOutlined />} onClick={handleSave}  >
            Save
          </Button>

        </Space></Row>

    </div>
  );
};

export default Selectedreviewers;
