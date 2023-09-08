import React, { useState } from "react";
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  DoubleRightOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  FileAddOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Divider } from "antd";

import { Link } from "react-router-dom";
import Routes from "./Routes";
import { signOut } from "firebase/auth";
import { useAuthContext } from "../Context/AuthContext";
import { auth } from "../../config/firebase";
const { Header, Sider, Content } = Layout;
// const { Search } = Input;
export default function Sidbar() {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // const { isAuth, user, dispatch } = useAuthContext();
  const { dispatch } = useAuthContext();

  const HandleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        window.notify("SignOut User successfuly!", "Success");
      })
      .catch((err) => {
        window.notify("Something wants wrong", "error");
      });
  };

  return (
    <Layout id="layout-container">
      <Content id="content-container">
        <Layout id="layout-box">
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="bg-white p-3"
            id="sider-container"
          >
            <div className="demo-logo-vertical" />
            <p className="ps-3 fs-5 fw-bold mt-4">Menu</p>
            {/* <Input addonBefore={<SearchOutlined />} placeholder="Search" /> */}
            <p className="ps-3 mt-4 fs-6 fw-bold">Task</p>
            <Menu
              theme="light"
              mode="inline"
              style={{
                border: "none",
              }}
              defaultSelectedKeys={["/"]}
              items={[
                {
                  key: "1",
                  icon: <DoubleRightOutlined className="text-black" />,
                  label: (
                    <Link to="/upcoming" id="upcoming" className="nav-link">
                      Upcoming
                    </Link>
                  ),
                },
                {
                  key: "2",
                  icon: <UnorderedListOutlined className="text-black" />,
                  label: (
                    <Link to="/today" id="today" className="nav-link">
                      Today
                    </Link>
                  ),
                },
                {
                  key: "3",
                  icon: <CalendarOutlined className="text-black" />,
                  label: (
                    <Link to="/calender" id="calender" className="nav-link">
                      Calender
                    </Link>
                  ),
                },
                {
                  key: "4",
                  icon: <FileAddOutlined className="text-black" />,
                  label: (
                    <Link to="/" className="nav-link" id="add_sticky">
                      Sticky Wall
                    </Link>
                  ),
                },
              ]}
            />
            <Divider />
            <p className="ps-3 mt-4 fs-6 fw-bold">List</p>
            <Menu
              theme="light"
              mode="inline"
              style={{
                border: "none",
              }}
              items={[
                {
                  key: "4",
                  icon: (
                    <span
                      className="bg-danger"
                      style={{
                        width: "10px",
                        height: "15px",
                        borderRadius: "3px",
                      }}
                    ></span>
                  ),
                  label: (
                    <Link to="/personal" id="personal" className="nav-link">
                      Personal
                    </Link>
                  ),
                },
                {
                  key: "5",
                  icon: (
                    <div
                      className="bg-primary"
                      style={{
                        width: "10px",
                        height: "15px",
                        borderRadius: "3px",
                      }}
                    ></div>
                  ),
                  label: (
                    <Link to="/work" id="work" className="nav-link">
                      Work
                    </Link>
                  ),
                },
                {
                  key: "6",
                  icon: (
                    <div
                      className="bg-warning text-black"
                      style={{
                        width: "10px",
                        height: "15px",
                        borderRadius: "3px",
                      }}
                    ></div>
                  ),
                  label: "List 1",
                },
                {
                  key: "7",
                  icon: <PlusCircleOutlined className="text-black" />,
                  label: "Add New List",
                },
              ]}
            />

            <Divider />
            <Menu
              theme="light"
              mode="inline"
              style={{
                border: "none",
              }}
              items={[
                {
                  key: "8",
                  icon: <LogoutOutlined className="text-black" />,
                  label: (
                    <Link
                      className="nav-link"
                      id="signout"
                      onClick={HandleLogout}
                    >
                      Sign Out
                    </Link>
                  ),
                },
              ]}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                borderTopRightRadius: "20px",
              }}
            >
              <Button
                type="text"
                id="colapse-btn"
                icon={
                  collapsed ? <RightCircleOutlined /> : <LeftCircleOutlined />
                }
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <span className="fs-3 fw-bold ms-2">Sticky Wall</span>
            </Header>
            <Content
              id="content-box"
              style={{
                borderBottomRightRadius: "20px",
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              {/* <Divider
                type="vertical"
                style={{
                  height: "100%",
                  // margin: "0",
                  // padding: "0",
                }}
              /> */}

              <Routes />
            </Content>
          </Layout>
        </Layout>
      </Content>
    </Layout>
  );
}
