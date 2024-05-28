import React, { useEffect } from "react";
import { LogoutOutlined, DownOutlined } from "@ant-design/icons";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Menu } from "antd";

function Admin() {
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => navigate("/view-account/staff")}>
        View Account Staff
      </Menu.Item>
      <Menu.Item key="2" onClick={() => navigate("/view-account/manager")}>
        View Account Manager
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    document.title = "Admin";
  });

  const handleLogogut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="Admin">
      <div className="sidebar">
        <div className="sidebar_title">
          <h4>Welcome</h4>
          <LogoutOutlined onClick={handleLogogut} />
        </div>
        <div className="sidebar_content">
          <Dropdown overlay={menu} className="sidebar__dropdown">
            <Button className="viewAccount">
              View Account <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className="content"></div>
    </div>
  );
}

export default Admin;
