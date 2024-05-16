// Navbar.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Menu, Space, theme, Drawer, Row, Col, Flex } from "antd";
import { blue } from "@ant-design/colors";
import { MenuOutlined } from "@ant-design/icons";
import { LinkContainer } from "react-router-bootstrap";
import { roleSwitched } from "../../store/auth";
import LoginAndRegister from "./loginAndRegister";
import ProfileAndLogout from "./profileAndLogout";
import { useNavigate } from "react-router-dom";
// import Logo from "../../assets/images/login-image.gif";
const { useToken } = theme;
const { useBreakpoint } = Grid;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const NavigationBar = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [current, setCurrent] = useState("mail");
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  // const [current, setCurrent] = useState("projects");
  const onClick = (e) => {
    navigate(`${e.key}`);
    setCurrent(e.key);
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const closeDrawer = () => {
    setVisible(false);
  };
  useEffect(() => {
    handleNavItems();
  }, [user]);

  const handleRoleChange = (role) => {
    dispatch(roleSwitched(role));
    navigate("/main");
  };

  const [navItems, setNavItems] = useState([]);
  const handleNavItems = () => {
    const defaultItems = [
      {
        label: "Home",
        key: "/home",
      },
      {
        label: "Main Menu",
        key: "/main",
      },

      {
        label: "About",
        key: "/about",
      },
      {
        label: "Help",
        key: "/contact",
      },
    ];
    if (user && user.id) {
      if (user.selectedRole) {
        if (user.selectedRole === "Editor") {
          defaultItems.push({
            label: "Admin",
            key: "/admin",
          });
        } else if (user.selectedRole === "Author") {
          defaultItems.push({
            label: "Submit a Manuscript",
            key: "/main/submission/new",
          });
        }
      }
      // defaultItems.push({
      //   type: "divider", // Must have
      // });
      // defaultItems.push({
      //   label: (
      //     <ProfileAndLogout
      //       username={user.username}
      //       role={user.selectedRole}
      //       roles={user.roles}
      //       onRoleChange={handleRoleChange}
      //     />
      //   ),
      // });
    } else {
      // defaultItems.push({
      //   type: "divider", // Must have
      // });
      // defaultItems.push({ label: <LoginAndRegister /> });
    }
    setNavItems(defaultItems);
  };
  return (
    <>
      {/* <nav style={styles.header}>
      <div style={styles.container}>
        <div style={styles.menuContainer}>
          <a style={styles.logo} href="#">
          logo
          </a>
          <Menu
            style={styles.menu}
            mode="horizontal"
            items={menuItems}
            onClick={onClick}
            selectedKeys={screens.md ? [current] : ""}
            overflowedIndicator={
              <Button type="text" icon={<MenuOutlined />}></Button>
            }
          />
        </div>
        <Space>
          {screens.md ? <Button type="text">Log in</Button> : ""}
          <Button type="primary">Sign up</Button>
        </Space>
      </div>
    </nav> */}
      <>
        <Row justify="space-between">
          <Col>
            <h1>OJS</h1>
          </Col>
          <Col>
            {user.id ? (
              <ProfileAndLogout
                username={user.username}
                role={user.selectedRole}
                roles={user.roles}
                onRoleChange={handleRoleChange}
              />
            ) : (
              <LoginAndRegister />
            )}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Menu
              onClick={onClick}
              style={{ flex: 1 }}
              selectedKeys={[current]}
              mode="horizontal"
              theme="dark"
              items={navItems}
            />
          </Col>
        </Row>
      </>
      {/* right menu  */}

      {/* left menu */}

      {/* <Navbar
        // bg="dark"
        data-bs-theme="dark"
        className="bg-body-tertiary p-3 mb-3 fs-5"
        expand="lg"
      >
        <LinkContainer to="/home">
          <Navbar.Brand>OJW</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle
          // className="border border-light"
          // children={<BsList className="text-light " />}
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0">
            <LinkContainer to="/home">
              <Nav.Link>
                <span>Home</span>
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/main">
              <Nav.Link>
                <span>Main Menu</span>
              </Nav.Link>
            </LinkContainer>
            {user.selectedRole && user.selectedRole === "Author" && (
              <LinkContainer to="/main/submission/new">
                <Nav.Link>
                  <span>Submit a Manuscript</span>
                </Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/about">
              <Nav.Link>
                <span>About</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>
                <span>Help</span>
              </Nav.Link>
            </LinkContainer>
            {user.selectedRole && user.selectedRole === "Editor" && (
              <LinkContainer to="/admin">
                <Nav.Link>
                  <span>Admin</span>
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <div className="d-flex justify-content-end gap-3 ">
            {user.id ? (
              <ProfileAndLogout
                username={user.username}
                role={user.selectedRole}
                roles={user.roles}
                onRoleChange={handleRoleChange}
              />
            ) : (
              <LoginAndRegister />
            )}
          </div>
        </Navbar.Collapse>
      </Navbar> */}
    </>
  );
};

export default NavigationBar;
