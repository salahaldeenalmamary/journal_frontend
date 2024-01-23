import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CustomSidebar from './CustomSidebar';
import { Outlet } from 'react-router-dom';

const CustomLayout = ({ children, CustomSidebar }) => {
  return (
    <Container fluid>
      {/* Navbar */}
      <Row>
        <Col>
          <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
    
              </a>
           
            </div>
          </nav>
        </Col>
      </Row>

     
      <Row>
       
        <Col sm={2} className="bg-light">
        {CustomSidebar}
    
        
        </Col>
        <Col sm={9} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default CustomLayout;
