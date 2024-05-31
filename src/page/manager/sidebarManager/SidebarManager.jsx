import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import "./SidebarManager.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

function SidebarManager() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar_title">
        <h4>Welcome</h4>
        <LogoutOutlined onClick={handleLogout} />
      </div>
      <div className="viewProfile">
        <Button className="viewProfileBtn" onClick={() => navigate("/managerprofile")}>
          Thông tin cá nhân
        </Button>
      </div>
      <div className="sidebar_content">
        <Button className="viewAccount" onClick={() => navigate("/manager-staffaccount")}>
          Xem tài khoản nhân viên
        </Button>
      </div>
      <div className="sidebar_product">
        <Button className="viewProduct" onClick={() => navigate("/manager-viewProduct")}>
          Xem danh sách sản phẩm
        </Button>
      </div>
    </div>
  );
}

export default SidebarManager;
