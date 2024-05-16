import React from 'react';
import { Layout, Menu } from 'antd';
import TabSearchReviewer from './TabSearchReviewer';

import { Drawers } from '../../common/BottomDrawer';
import { Link,useParams } from "react-router-dom";

const { Sider, Content } = Layout;

const SearchReviewerMain = () => {
  const {id}=useParams();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Drawers>

      <Sider width={250} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1">View Submission Information</Menu.Item>
          <Menu.Item key="2">Manuscript Details</Menu.Item>
          <h4>History</h4>
          <Menu.Item key="4">Quick Action Links</Menu.Item>
          <Menu.Item key="5">Submit Editor's Decision 
          and Comment</Menu.Item>
          <Menu.Item key="6">Send E-mail</Menu.Item>
          <Menu.Item key="7">Register and Select New Reviewer</Menu.Item>
          <Menu.Item key="8">Request Unregistered Reviewer</Menu.Item>
         
          <Menu.Item key="9">Set Preferences</Menu.Item>
          <Menu.Item key="10">My Suggest Reviewer Preferences</Menu.Item>
          <Menu.Item key="11">My Reviewer Display Preferences</Menu.Item>
        </Menu>
      </Sider>
      </Drawers>
    
      <Layout >
        <Content
          className="site-layout-background"
         
        >
          <TabSearchReviewer SubmissionId={id}/>
         
        </Content>
      </Layout>
    </Layout>
  );
};

export default SearchReviewerMain;
export { default as SelectedReviewertable } from "./selectedReviewertable";
export { default as Selectedreviewers } from "./selectedreviewers";
export { default as ManageSelectedreviewers } from "./manageSelectedreviewers";
export { default as InviteForm } from "./component/InviteForm";
export { default as ClassificationsSelected } from "./component/Calssifacation";

export{ default as ReviewerDetails} from './reviewerDetails';

