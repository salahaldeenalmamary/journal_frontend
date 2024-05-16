import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Card, InputNumber, Select, Upload, Table, Space,Popconfirm, Checkbox, Form, Radio, Input, Divider } from 'antd';
import { UploadOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { createAttachment,  GetAttachment,SetClearattachments} from '../../store/entities/attachmentsSlice';
import FileDownload from '../../common/FileDownload';
import CustomMessageBox from '../../common/CustomMessageBox';
import {
  selectRecommendation,
  selectOverallRating,
  selectFileList,
  setRecommendation,
  setOverallRating,
  setFileList,
  incrementOverallRating,
  decrementOverallRating,
  setWillingToReview,
  setExpeditedDecision,
  setReviewerCommentsToAuthor,
  setReviewerCommentsToEditor,
  setTransferConsentInfo,
  setTransferConsentReview,
  selectReviewState,
  setStateToClear,
  uploadFile, createReviewResult, setfile, fetchReviewResultById


} from '../../store/entities/recommendationSlice';

const { Option } = Select;
const { TextArea } = Input;

const Recommendation = () => {

  const dispatch = useDispatch();
  const { recommendation, overallRating, fileList, fileUpload, file, reviewResults, loading  } = useSelector((store) => store.entities.recommendation);
  const { Idattatchment,attachments } = useSelector((store) => store.entities.attatchment);
  const { submissionid, id, attachmentId } = useParams();
  useEffect(() => {
    if ( id) {
     
      dispatch(fetchReviewResultById(id));
      if (attachmentId!==0 && attachmentId!==null) {
        dispatch(GetAttachment(attachmentId));
        console.log(attachments);
      }
    }
  }, [dispatch]);
  useEffect(() => {
    
  }, [fileUpload,attachments,fileList]);
  
   
    useEffect(() => {
      if (reviewResults) {
        setReviewResult({
          id: reviewResults.id,
          authorNote: reviewResults.authorNote,
          editorNote: reviewResults.editorNote,
          evaluation: reviewResults.evaluation,
          isWilling: reviewResults.isWilling,
          fileId: reviewResults.fileId,
          recommendation: reviewResults.recommendation,
          percentileRating: reviewResults.percentileRating,
          ReviewAssignmentId: id ,
        });
      }
    }, [reviewResults]);
  const handleOverallRatingChange = (value) => {
    value = Math.max(0, Math.min(value, 100));
    dispatch(setOverallRating(value));
  };

  const handleRecommendationChange = (value) => {
    dispatch(setRecommendation(value));
  };

  const handleFileChange = (info) => {
    const fileList = info.fileList.map(file => ({
      uid: file.uid,
      name: file.name,
      size: file.size,
      type: file.type,

    }));
    console.log('sade');
    console.log(info.file);
    if (attachments.length !== 0) {
      confirm({
        title: 'Replace Attachment?',
  
        content: 'Are you sure you want to replace the existing attachment with the new file?',
        onOk() {
          dispatch(SetClearattachments());
          dispatch(setfile(info.file));
        },
        onCancel() {
          // Keep the existing attachment
        },
      });
    } else {
      dispatch(setfile(info.file));
    }
   
  };


  const handleSubmitToeditor = async (event) => {
    event.preventDefault();
    const formModel = {
      ...reviewResult,
      fileId: fileUpload,
      recommendation:  recommendation|| reviewResults?.recommendation ,
      percentileRating:  overallRating|| reviewResults?.percentileRating ,

      state: true,
    };

    console.log(formModel);
   if (file!=null ) {
    await dispatch(uploadFile(file));
   }
    console.log(fileUpload);
    await dispatch(createReviewResult(formModel));
    dispatch(setStateToClear())
    window.history.back();
  };

  const handleSubmitForlatter = async (event) => {
    event.preventDefault();
   


   if (file!=null ) {
 await   dispatch(uploadFile(file));
     if (fileUpload!==0 &&  fileUpload!==null ) {
     await dispatch(createAttachment({
        id: 0,
        name: file.name,
        displayedName: file.name,
        submissionId: submissionid,
        fileId: fileUpload
      }));
     
     
      
     }
   }
   const formModel = {
    ...reviewResult,
    fileId: fileUpload,
    recommendation:  recommendation|| reviewResults?.recommendation ,
    percentileRating:  overallRating|| reviewResults?.percentileRating ,
    state: false,
    attatchmentId:Idattatchment,
   
  };
    console.log(fileUpload);
  await dispatch(createReviewResult(formModel));
   dispatch(setStateToClear())
    window.history.back();
  };
  const handleProcessCancel = () => {
    console.log('Process Cancel action');
    window.history.back();
  };

  const handleSave = () => {
    console.log('Save action');
  };

  const columns = [
    {
      title: 'File Name',
      dataIndex: 'displayedName',
      key: 'displayedName',
    },
    {
      title: 'File Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Last Modified',
      dataIndex: 'lastModified',
      key: 'lastModified',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">

       
         {record.fileId===undefined || record.fileId===null ?null :(<FileDownload  fileId={record.fileId}>Download </FileDownload>)  } 
        </Space>
      ),
    },
  ];

  const [reviewResult, setReviewResult] = useState({
    id: reviewResults?.id || 0,
    authorNote: reviewResults?.authorNote || '',
    editorNote: reviewResults?.editorNote || '',
    evaluation: reviewResults?.evaluation || '',
    isWilling: reviewResults?.isWilling || false,
    fileId: reviewResults?.fileId || fileUpload,
    recommendation: reviewResults?.recommendation|| recommendation,
    percentileRating: reviewResults?.percentileRating || overallRating,
    ReviewAssignmentId: id  || 20,
    state: false,
  });

  const handleInputChange = (fieldName, value) => {
    setReviewResult({ ...reviewResult, [fieldName]: value });
  };



  const overallRatingOptions = [
    '0 - Reject without resubmit',
    '1 - Reject with significant re-organization and revision',
    '2 - Reject with revision',
    '3 - Accept with minor revision',
    '4 - Outstanding',
  ];

  
  return (
    <div>
      
      <Form layout="vertical">
        <Card className="p-4">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <p>Recommendation:</p>
              <Select
                defaultValue={reviewResults?.recommendation||'No Recommendation'}
                value={recommendation}

                onChange={handleRecommendationChange}
              >
                {['No Recommendation', 'Accept', 'Minor Revision', 'Major Revision', 'Reject', 'Editor Edit Complete'].map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={12}>
              <p>Overall Manuscript Rating (1-100):</p>
              <Form.Item name="percentileRating">
                <InputNumber min={0} max={100} onChange={handleOverallRatingChange} value={overallRating}  defaultValue={reviewResult.percentileRating} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <p>Upload Files:</p>
              <Upload
                fileList={fileList}
                onChange={handleFileChange}

             
                showUploadList={true}
                
              >
                <Button icon={<UploadOutlined />}>Upload Attachment</Button>
              </Upload>
              { attachments.length!==0?( <Table dataSource={attachments} columns={columns} pagination={false} />): <Table dataSource={fileList} columns={columns} pagination={false} />} 
            </Col>
          </Row>
        </Card>
        <Divider />
        <Card title="Review Questions">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Are you willing to review the revision of this manuscript?"
                value={reviewResult.isWilling}
                
                onChange={(e) => handleInputChange('isWilling', e.target.value === "Yes" ? true : false)}
              >
                <Radio.Group     value={reviewResult.isWilling === true? "Yes": "No"}>
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="What is your overall rating of the paper?"
                value={reviewResult.evaluation}
                defaultValue={reviewResult.evaluation}

                onChange={(e) => handleInputChange('evaluation', e.target.value)}
              >
                <Radio.Group
                  options={overallRatingOptions}    value={reviewResult.evaluation}
                  onChange={(checkedValues) => handleInputChange('overallRating', checkedValues)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              {/* <Form.Item
                label="For this expedited paper, please confirm if the paper should be accepted or rejected."
                value={reviewResult.expeditedDecision}
                onChange={(e) => handleInputChange('expeditedDecision', e.target.value)}
              >
                <Radio.Group>
                  <Radio value="Accept">Accept</Radio>
                  <Radio value="Reject">Reject</Radio>
                </Radio.Group>
              </Form.Item> */}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Reviewer Comments to Author"
                value={reviewResult.authorNote}
        
                onChange={(e) => handleInputChange('authorNote', e.target.value)}
              >
                <TextArea rows={3} value={reviewResult.authorNote} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Reviewer Comments to Editor"
                value={reviewResult.editorNote}
                onChange={(e) => handleInputChange('editorNote', e.target.value)}
              >
                <TextArea rows={3}   value={reviewResult.editorNote} />
              </Form.Item>
            </Col>
          </Row>
          <Card title="Transfer Authorization">
            {/* <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="If this submission is transferred to another publication, do we have your consent to include your identifying information?"
                  value={reviewResult.transferConsentInfo}
                  onChange={(e) => handleInputChange('transferConsentInfo', e.target.value)}
                >
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="If this submission is transferred to another publication, do we have your consent to include your review?"
                  value={reviewResult.transferConsentReview}
                  onChange={(e) => handleInputChange('transferConsentReview', e.target.value)}
                >
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row> */}
          </Card>
        </Card>
      </Form>
    
      <Row gutter={16} justify="end">
        <Col>
          <Button type="danger" onClick={handleProcessCancel}>
            Cancel Process
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={handleSubmitForlatter}>
            Save and Submit Later
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={handleSubmitToeditor}>
          Submit to Editor
          </Button>
        </Col>
      </Row>
      {/* <CustomMessageBox 
            loadeding={loading}
            successText={message}
          
          /> */}
    </div>
  );
};

export default Recommendation;
