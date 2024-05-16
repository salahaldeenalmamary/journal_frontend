// AppLayout.js
import React from 'react';
import { Layout, Menu } from 'antd';



const { Header, Content, Sider } = Layout;

const Contentlayout = ({children}) => {
  const navigate = useNavigate();

  return (
  
   
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          {/* Header content goes here */}
        </Header>
        <Content style={{ padding: '' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 20 }}>
          {children}
          </div>
        </Content>
      </Layout>
 
  );
};

export default Contentlayout;
