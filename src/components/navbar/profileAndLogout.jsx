import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Button,
  Divider,
  Dropdown,
  Space,
  theme,
  Col,
  Row,
  Select,
} from "antd";
const { useToken } = theme;
const ProfileAndLogout = ({ username, role, roles, onRoleChange }) => {
  const [rolesDropdown, setRolesDropdown] = useState([]);
  const [currentRole, setCurrentRole] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    padding: token.padding,
  };
  useEffect(() => {
    const modifiedList = [];
    for (const role of roles) {
      const r = {
        value: role,
        label: role,
      };
      modifiedList.push(r);
    }
    setCurrentRole({
      value: role,
      label: role,
    });
    setRolesDropdown(modifiedList);
  }, [role]);
  const handleRoleChange = (role) => {
    setIsOpen((prev) => !prev);
    onRoleChange(role);
  };
  const handleOpenedList = (open, info) => {
    if (info.source === "trigger") {
      setIsOpen(open);
    }
  };
  const showDropdownList = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Space
        align="center"
        split={
          <Divider
            style={{
              borderWidth: 3,
              borderColor: "#7cb305",
            }}
            type="vertical"
          />
        }
      >
        <Dropdown
          onOpenChange={handleOpenedList}
          open={isOpen}
          trigger={["click"]}
          dropdownRender={(menu) => (
            <Space.Compact style={contentStyle} direction="vertical">
              {console.log(menu)}
              <Row align={"middle"} justify={"center"}>
                <Col span={8}>
                  <h6>UserName</h6>
                </Col>
                <Col span={16} className="px-2">
                  <h6>{username}</h6>
                </Col>
              </Row>
              <Row align={"middle"} justify={"center"}>
                <Col span={8}>
                  <h6>Role</h6>
                </Col>
                <Col span={16}>
                  <Select
                    style={{ width: "100%" }}
                    options={rolesDropdown}
                    placeholder="Select type"
                    value={currentRole}
                    onChange={handleRoleChange}
                  />
                </Col>
              </Row>
              <Row align={"middle"} justify={"start"}>
                <Col className="p-0 m-0">
                  <LinkContainer to={"/main/updateInformation"}>
                    <Button type="link" className="p-0 m-0">
                      Update My Information
                    </Button>
                  </LinkContainer>
                </Col>
              </Row>
            </Space.Compact>
          )}
        >
          <Button type="link" onClick={showDropdownList}>
            {username}
          </Button>
        </Dropdown>
        <LinkContainer to={"/logout"}>
          <Button type="link">Logout</Button>
        </LinkContainer>
      </Space>
    </>
  );
};

export default ProfileAndLogout;
