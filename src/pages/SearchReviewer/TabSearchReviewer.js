import React, { useState } from 'react';
import { Card, Tabs, Tab, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import SearchReviewersTabOne from './SearchReviewersTabOne';
import SuggestedReviewersByAutherTable from './SuggestedReviewersByAutherTable';
import ClassificationList from './ClassificationList';
const TabSearchReviewer = () => {
  const [key, setKey] = useState('yourPublications'); 
  
  return (
    <Card style={{ width: '100%', maxWidth: '1000px', margin: 'auto' }}>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="yourPublications" title="Your Publications">
       
        
        </Tab>
        <Tab eventKey="anotherPublication" title="Another Publication">
       
        
        </Tab>
        <Tab eventKey="suggestedByAuthor" title="Suggested by Author">
        
        
        </Tab>
        <Tab eventKey="personalClassification" title="Personal Classification">
        
        </Tab>
        <Tab eventKey="suggestedReviewer" title="Suggested Reviewer">
         
        
        </Tab>
      </Tabs>

     
      {key === 'yourPublications' && (
      
        <ListGroup>
      <SearchReviewersTabOne></SearchReviewersTabOne>
        </ListGroup>
      )}
      {key === 'anotherPublication' && (
       
        <ListGroup>
        
        </ListGroup>
      )}
      {key === 'suggestedByAuthor' && (
       
        <ListGroup>
        <SuggestedReviewersByAutherTable></SuggestedReviewersByAutherTable>
        </ListGroup>
      )}
      {key === 'personalClassification' && (
       
        <ListGroup>
       < ClassificationList></ClassificationList>
        </ListGroup>
      )}
      {key === 'suggestedReviewer' && (
       
        <ListGroup>
        
        </ListGroup>
      )}
    </Card>
  );
};

export default TabSearchReviewer;
