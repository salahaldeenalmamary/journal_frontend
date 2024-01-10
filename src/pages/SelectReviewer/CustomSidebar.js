import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Sidebar = ({ menuItems }) => {
  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingRight: '10px' }}>
      <Nav className="flex-column">
        {menuItems.map((item, index) => (
          <Nav.Item key={index}>
            <Nav.Link as={NavLink} to={item.to} activeClassName="active">
              {item.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};




const CustomSidebar = () => {
  const mainMenuItems = [
    { to: '/new-assignments', label: 'Back to New Assignments' },
    { to: '/editor-main-menu', label: 'Editor Main Menu' },
    { to: '/view-submission-information', label: 'View Submission Information' },
    { to: '/manuscript-details', label: 'Manuscript Details' },
    { to: '/history', label: 'History' },
    { to: '/view-submission', label: 'View Submission' },
    { to: '/authors-reviewer-preferences', label: 'Authors Reviewer Preferences' },
    { to: '/quick-action-links', label: 'Quick Action Links' },
    { to: '/submit-editors-decision', label: 'Submit Editors Decision and Comments' },
    { to: '/send-email', label: 'Send Email' },
    { to: '/register-and-select-new-reviewer', label: 'Register and Select New Reviewer' },
    { to: '/search-similar-articles', label: 'Search Similar Articles in MEDLINE' },
    { to: '/set-preferences', label: 'Set Preferences' },
    { to: '/my-suggest-reviewer-preferences', label: 'My Suggest Reviewer Preferences' },
    { to: '/my-reviewer-display-preferences', label: 'My Reviewer Display Preferences' },
  ];
  return (
    <div>
      {/* Your other components */}
      <Sidebar menuItems={mainMenuItems} />
    </div>
  );
};

export default CustomSidebar;
