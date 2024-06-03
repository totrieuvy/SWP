import React, { useEffect } from "react";
import { LogoutOutlined, DownOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, Menu, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../redux/features/counterSlice";
import "./SidebarManager.scss";

function SidebarManager() {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    localStorage.clear();
    dispatcher(logout());
    notification.success({
      message: "Thành công",
      description: "Đăng xuất thành công",
    });
    navigate("/login");
  };

  useEffect(() => {
    document.title = "Trang quản lí";
    console.log(user.id);
  }, []);

  const profileMenu = (
    <Menu>
      <Link to={`/manager/profile/${user.username}`}>
        <Menu.Item>Thông tin cá nhân</Menu.Item>
      </Link>

      <Menu.Item key="2" onClick={() => navigate("/manager/changepassword")}>
        Đổi mật khẩu
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="sidebar">
      <div className="sidebar_title">
        <h4>Welcome {user.username}</h4>
        <LogoutOutlined onClick={handleLogout} />
      </div>
      <div className="viewProfile">
        <Dropdown overlay={profileMenu} trigger={["hover"]}>
          <Button className="viewProfileBtn">
            Tài khoản của bạn <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className="sidebar_content">
        <Link to="/manager/view/staff">
          <Button className="viewAccount">Xem tài khoản nhân viên</Button>
        </Link>
        <Link to="/manager/view/customer">
          <Button className="viewAccount">Xem tài khoản khách hảng</Button>
        </Link>
      </div>
    </div>
  );
}

export default SidebarManager;
