
import React,{useEffect,useState} from 'react';
import { Card, Layout, Menu  ,theme,Button, Row,Col} from 'antd';
const { useToken } = theme;
const { Sider } = Layout;
import FilterBars from './FiltersBar';
const DrawerContent = ({ onMenuClick,handleApplySearch,...rest }) => {
 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); 
    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);
  return (
    <Layout {...rest}>
      <Sider width={isMobile? 60:130} >
        <Menu     theme="dark"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
          onClick={onMenuClick}
        >
          <Menu.Item key="1" value="1"  >All</Menu.Item>
          <Menu.Item key="2" value="2" style={isMobile?{ writingMode: 'vertical-lr', height:150 }:{}} >Search Criteria</Menu.Item>
          <Menu.Item key="3" value="3" style={isMobile?{ writingMode: 'vertical-lr', height:80 }:{}}>Types</Menu.Item>
          <Menu.Item key="4" value="4" style={isMobile?{ writingMode: 'vertical-lr', height:110}:{}}>Classifications</Menu.Item>
          <Menu.Item key="5" value="5" style={isMobile?{ writingMode: 'vertical-lr', height:80 }:{}}>Sections</Menu.Item>
          
          {!isMobile && (  <Col justify='space-between' gutter={[16, 16]}>
          <Button type="primary" onClick={handleApplySearch} > Search</Button>
       
      </Col>)}
        
        </Menu>
      </Sider>
    <Col>
    <FilterBars {...rest}/>
   {isMobile && (  <Row justify='space-between' gutter={[16, 16]}>
        <Col>
        
        </Col>
        <Col>
        <Button type="primary" onClick={handleApplySearch} > Search</Button>
          
        </Col>
      </Row>)}
    </Col>
    </Layout>
  );
};

export default DrawerContent;
