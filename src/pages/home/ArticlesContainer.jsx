import React, { useState } from "react";
import { List, Card, Row, Col, Badge, Button, Typography } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { CheckSquareOutlined, DownloadOutlined, ShareAltOutlined, EyeOutlined } from "@ant-design/icons";
import { downloadfile } from "../../store/UI/homefiltersSlice";
import { API_BASE } from "../../redux/api/const";
import FileDownload from "../../common/FileDownload";
import {  useNavigate } from "react-router-dom";
import ShareFile from "../../common/shareFile";


const { Title, Text } = Typography;

const ArticleCard = ({ article, selected, onSelect }) => {
  const history = useNavigate();
  const {
    id,
    title,
    subtitle,
    decisionDate,
    typeName,
    sectionName,
    region,
    abstract,
    coAuthors,
    classifications,
    path,
    fileid
  } = article;

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handleCardClick = () => {
    history(`/article/${id}`);
  };
  const handlePdfShareButtonClick = async (event) => {
    event.preventDefault();
    try {
      const pdfResponse = await fetch(`${API_BASE}/download/${fileid}`);
      const blob = await pdfResponse.blob();
      const file = new File([blob], `${title}.pdf`, { type: 'application/pdf' });
  
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: title,
          text: `PDF of ${title}`
        });
      } else {
        throw new Error('File sharing is not supported.');
      }
    } catch (error) {
      message.error('Error sharing PDF. Please try again later.');
      console.error(error);
    }
  };
  
  const handleShareButtonClick = async (event) => {
    event.preventDefault();
    try {
      if (navigator.share) {
        const sharedUrl = `${window.location.origin}/article/${id}`; // Append article ID to the URL
        await navigator.share({
          title: title,
          text: subtitle,
          url: sharedUrl
        });
      } else {
        throw new Error('Web Share API is not supported.');
      }
    } catch (error) {
      message.error('Error sharing article. Please try again later.');
      console.error(error);
    }
  };
  

  return (
    <List.Item key={id} className={`custom-list-item ${selected && 'selected'}`}>
      <Card
        hoverable
        style={{ border: selected ? '2px solid #ff4d4f' : '1px solid #d9d9d9' }}
       
      >
        <Row gutter={[16, 16]}  >
          <Col span={24} onClick={handleCardClick}>
            <Title level={4}>{title}</Title>
            <Text>{subtitle}</Text>
            <Text style={{ color: '#666' }}>
              <strong>Decision Date:</strong> {decisionDate}
            </Text>
            <Text>
              <strong>Authors:</strong>{' '}
              {coAuthors.map((author) => (
                <span key={author.id}>
                  {author.firstName} {author.lastName},{' '}
                </span>
              ))}
            </Text>
            <Text>
              <strong>Classifications:</strong>{' '}
              {classifications.map((classification) => (
                <Badge key={classification.id} color="secondary" className="mr-1">
                  {classification.name}
                </Badge>
              ))}
            </Text>
            <Text style={{ color: '#666' }}>
              <strong>Type:</strong> {typeName}
            </Text>
            <Text style={{ color: '#666' }}>
              <strong>Section:</strong> {sectionName}
            </Text>
            <Text style={{ color: '#666' }}>
              <strong>Region:</strong> {region}
            </Text>
            <Text style={{ color: '#666' }}>
              <strong>Path:</strong> {path}
            </Text>
            <Text style={{ color: '#333' }}>
              <strong>Abstract:</strong>{' '}
              {truncateText(abstract, 150)}{' '}
              {abstract.length > 150 && (
                <a href={`/article/${id}`} className="read-more">
                  Read More
                </a>
              )}
            </Text>
          </Col>
          <Row span={24}>
            <FileDownload islink={false} fileId={fileid} style={{ borderColor: '#1890ff', color: '#1890ff' }}>
              <DownloadOutlined /> PDF
            </FileDownload>
            <Button icon={<ShareAltOutlined />} onClick={(event) => handlePdfShareButtonClick(event)}>
  Share
</Button>
<ShareFile name={title} islink={false} fileId={fileid} style={{ borderColor: '#1890ff', color: '#1890ff' }}>
<ShareAltOutlined />  PDF
            </ShareFile>
          
</Row>
          
        </Row>
       
      </Card>
    </List.Item>
  );
};
const ArticlesContainer = ({ articles , ...rest}) => {
  const [selectedArticles, setSelectedArticles] = useState([]);

  const handleArticleSelect = (articleId) => {
    setSelectedArticles((prevSelectedArticles) => {
      if (prevSelectedArticles.includes(articleId)) {
        return prevSelectedArticles.filter((id) => id !== articleId);
      } else {
        return [...prevSelectedArticles, articleId];
      }
    });
  };

  return (
    <List {...rest} 
    
      itemLayout="vertical"
      dataSource={articles}
      size="small"

    
      renderItem={(article) => (
        <ArticleCard 
          key={article.id}
          article={article}
          selected={selectedArticles.includes(article.id)}
          onSelect={handleArticleSelect}
          onReadMoreClick={() => { }} 
        />
      )}
    />
  );
};

export default ArticlesContainer;
