import React from "react";
import { Layout, Menu } from "antd";



const { Header, Content, Sider } = Layout;

const CustomLayout = ({children}) => {
  return (
  
    
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
  
   
  );
};

export default CustomLayout;
