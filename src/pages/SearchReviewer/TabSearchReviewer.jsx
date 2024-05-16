import React, { useState } from "react";
import { Tabs } from "antd";
import SearchReviewersTabOne from "./SearchReviewersTabOne";
import SuggestedReviewersByAuthor from "./SuggestedReviewersByAuthor";
import ClassificationList from "./ClassificationList";
import { Link,useParams } from "react-router-dom";
import Selectedreviewers from "./manageSelectedreviewers";

const { TabPane } = Tabs;

const TabSearchReviewer = ({SubmissionId}) => {
 
  const [activeKey, setActiveKey] = useState("yourPublications");

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  return (
    <div className="p-3 border">
      <Tabs
        activeKey={activeKey}
        onChange={handleTabChange}
        className="mb-3 mx-auto"
        tabBarGutter={16}
      >
        <TabPane tab="Your Publications" key="yourPublications">
          <SearchReviewersTabOne />
        </TabPane>
        
        <TabPane tab="Suggested by Author" key="suggestedByAuthor">
          <SuggestedReviewersByAuthor  SubmissionId={SubmissionId}/>
        </TabPane>
        <TabPane tab="Personal Classification" key="personalClassification">
          
        <Link  to="/main/classificationsSelected">Select Classifications</Link>
          <ClassificationList submissionId={SubmissionId} />
      
        </TabPane>
        <TabPane tab="Match Classifications" key="MatchClassification">
        
          <Link to='/main/classificationsSelected'>Select Classifications</Link>
            <ClassificationList />
        
          </TabPane>
        <TabPane tab="Suggested Reviewer" key="suggestedReviewer">

        <Selectedreviewers></Selectedreviewers>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabSearchReviewer;
