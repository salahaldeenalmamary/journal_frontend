import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CustomSidebar from './CustomSidebar';

const CustomLayout = ({ children, CustomSidebar }) => {
  return (
    <Container fluid>
      {/* Navbar */}
      <Row>
        <Col>
          <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
             Search by Scopus
              </a>
           
            </div>
          </nav>
        </Col>
      </Row>

     
      <Row>
        {/* Sidebar */}
        <Col sm={2} className="bg-light">
        {CustomSidebar}
    
        
        </Col>

        {/* Main Content */}
        <Col sm={9} className="p-4">
    
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default CustomLayout;
