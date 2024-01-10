import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { BsHouseDoor, BsGraphUp, BsSearch, BsBook } from 'react-icons/bs'; // Import icons from react-icons

const CustomSidebar = () => {
  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingRight: '10px' }}>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/" activeClassName="active">
            <BsHouseDoor className="mr-2" /> Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/dashboard" activeClassName="active">
            <BsGraphUp className="mr-2" /> Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/search" activeClassName="active">
            <BsSearch className="mr-2" /> Search by Keywords
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/author-search" activeClassName="active">
            <BsSearch className="mr-2" /> Author Search
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/reviews" activeClassName="active">
            <BsBook className="mr-2" /> Reviews
          </Nav.Link>
        </Nav.Item>
        {/* Add more menu items as needed */}
      </Nav>
    </div>
  );
};

export default CustomSidebar;
