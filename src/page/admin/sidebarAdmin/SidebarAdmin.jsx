import React, { useEffect, useState } from "react";
import "./SidebarAdmin.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, Menu, notification } from "antd";
import { LogoutOutlined, DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../redux/features/counterSlice";

function SidebarAdmin() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const accountMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => navigate("/admin/profile")}>
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Item key="2" onClick={() => navigate("/admin/changepassword")}>
        Đổi mật khẩu
      </Menu.Item>
    </Menu>
  );

  const viewAccountMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => navigate("/admin/view/staff")}>
        Danh sách nhân viên
      </Menu.Item>
      <Menu.Item key="2" onClick={() => navigate("/admin/view/manager")}>
        Danh sách quản lí
      </Menu.Item>
    </Menu>
  );

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    notification.success({
      message: "Thành công",
      description: "Đăng xuất thành công",
    });
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar_title">
        <h4>Welcome {user.username}</h4>
        <LogoutOutlined onClick={handleLogout} />
      </div>
      <div className="Admin_profile">
        <Dropdown overlay={accountMenu} className="sidebar__dropdown">
          <Button className="viewAccount">
            Tài khoản của bạn <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className="sidebar_content">
        <Dropdown overlay={viewAccountMenu} className="sidebar__dropdown">
          <Button className="viewAccount">
            Quản lí tài khoản <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
}

export default SidebarAdmin;
