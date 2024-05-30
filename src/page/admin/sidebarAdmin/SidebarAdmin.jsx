import React, { useEffect, useState } from "react";
import "./SidebarAdmin.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, Menu } from "antd";
import { LogoutOutlined, DownOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";

function SidebarAdmin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodeToken = jwtDecode(token);
      console.log(decodeToken);
      const username = decodeToken.sub;
      console.log(username);
      setUsername(username);
    }
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_title">
        <h4>Welcome {username}</h4>
        <LogoutOutlined onClick={handleLogout} />
      </div>
      <div className="Admin_profile">
        <Link to={"/adminprofile"}>Your profile</Link>
      </div>
      <div className="sidebar_content">
        <Dropdown overlay={menu} className="sidebar__dropdown">
          <Button className="viewAccount">
            View Account <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
}

export default SidebarAdmin;
