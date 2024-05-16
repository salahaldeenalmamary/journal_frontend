

import React, { useEffect, useState } from 'react';
import { Card, Typography, Row, Col, Button ,Table,Space} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewResultById } from '../../store/entities/recommendationSlice';
import { Link,useParams } from 'react-router-dom';
import LoadReferenceProgressBar from '../../common/progressIndicator/LoadReferenceProgressBar';
import { createAttachment,  GetAttachment,SetClearattachments} from '../../store/entities/attachmentsSlice';
const { Title, Text } = Typography;
import FileDownload from '../../common/FileDownload';
const ReviewReportrecomendition = () => {
const { id, attachmentId}=useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewResultById(id));
      if (attachmentId!==0 && attachmentId!==null) {
        dispatch(GetAttachment(attachmentId));
        console.log(attachments);
      }
    }
  }, [dispatch, id]);

  const { recommendation, overallRating, reviewResults, loading } = useSelector(
    (store) => store.entities.recommendation
  );
  const { Idattatchment,attachments } = useSelector((store) => store.entities.attatchment);

  const handleBack = () => {
    // Handle back action
    console.log('Back action');
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

  return (
    <div>
      <div>
        <Link to="#">View Reviewer Comment</Link>
      </div>
      <LoadReferenceProgressBar loading={loading}>
        <Card title="Review Submission Report">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={4}>Are you willing to review the revision of this manuscript?</Title>
              <Text>{reviewResults?.isWilling ? 'Yes' : 'No'}</Text>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={4}>Recommendation: </Title>
              <Text>{recommendation}</Text>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={4}>What is your overall rating of the paper?</Title>
              <Text>{overallRating}</Text>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={4}>For this expedited paper, please confirm if the paper should be accepted or rejected.</Title>
              <Text>{reviewResults?.evaluation}</Text>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={4}>Reviewer Comments to Author</Title>
              <Text>{reviewResults?.authorNote}</Text>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={4}>Reviewer Comments to Editor</Title>
              <Text>{reviewResults?.editorNote}</Text>
            </Col>
          </Row>

        
          { attachments.length!==0?( <Table  dataSource={attachments} columns={columns} pagination={false} />):null} 
        </Card>
      </LoadReferenceProgressBar>
    </div>
  );
};

export default ReviewReportrecomendition;

