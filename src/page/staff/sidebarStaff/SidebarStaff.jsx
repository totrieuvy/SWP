import React from "react";
import { LogoutOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Menu, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../redux/features/counterSlice";
import "./SidebarStaff.scss";

function SidebarStaff() {
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

  const profileMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => navigate("/managerprofile")}>
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Item key="2" onClick={() => navigate("/changepasswordmanager")}>
        Đổi mật khẩu
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="sidebar__staff">
      <div className="sidebar__staff__title">
        <h4>Welcome {user.username}</h4>
        <LogoutOutlined onClick={handleLogout} />
      </div>
      <div className="sidebar__staff__viewProfile">
        <Dropdown overlay={profileMenu} trigger={["hover"]}>
          <Button className="viewProfileBtn">
            Tài khoản của bạn <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className="sidebar__staff__product">
        <Button className="viewProduct" onClick={() => navigate("/manager-viewproduct")}>
          Xem danh sách sản phẩm
        </Button>
      </div>
    </div>
  );
}

export default SidebarStaff;
