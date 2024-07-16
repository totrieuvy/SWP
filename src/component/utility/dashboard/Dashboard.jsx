import { useEffect, useState } from "react";
import {
  ProfileOutlined,
  HeartOutlined,
  UserOutlined,
  BarChartOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../redux/features/counterSlice";
import "./Dashboard.scss";
import React from "react";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [items, setItems] = useState([]);
  const [key, setKey] = useState();
  const location = useLocation();
  const currentURI = location.pathname.split("/").slice(-1)[0];

  const dispatcher = useDispatch();
  const user = useSelector(selectUser);
  const navigation = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatcher(logout());
    navigation("/login");
  };

  const dataOpen = JSON.parse(localStorage.getItem("keys")) ?? [];
  const [openKeys, setOpenKeys] = useState(dataOpen);

  useEffect(() => {
    if (user.role === "ROLE_STAFF") {
      setItems([
        getItem("Hồ sơ", "profile", <UserOutlined />, [
          getItem("Hồ sơ cá nhân", `staff/profile/${user.id}`),
          getItem("Đổi mật khẩu", "staff/changepassword"),
          getItem("Xem năng suất", "staff/performance"),
        ]),
        getItem("Thể loại", "staff/category", <ProfileOutlined />),
        getItem("Sản phẩm", "staff/product", <ProfileOutlined />),
        getItem("Tạo đơn hàng", "staff/create", <ProfileOutlined />),
        getItem("Xem lại hóa đơn", "profile", <ProfileOutlined />, [
          getItem("Khách hàng", `staff/trace/by-customer`),
          getItem("Thời gian", "staff/trace/by-date", <ProfileOutlined />),
        ]),
        getItem("Chat", "staff/chat", <ProfileOutlined />),

        getItem("Mua lại", "staff/initialize-productbuy", <ProfileOutlined />),
        getItem("Xác nhận đơn hàng", "staff/confirm-order", <ProfileOutlined />),
      ]);
    } else if (user.role === "ROLE_MANAGER") {
      setItems([
        getItem("Hồ sơ", "profile", <UserOutlined />, [
          getItem("Thông tin cá nhân", `manager/profile/${user.id}`),
          getItem("Đổi mật khẩu", "manager/changepassword", <ProfileOutlined />),
        ]),
        getItem("Quản lí nhân sự", "manager/manage", <UserOutlined />, [
          getItem("Danh sách nhân viên", "manager/staff"),
          getItem("Xem lịch của tất cả nhân viên", "manager/staff/view"),
          getItem("Lịch làm việc", "manager/staff/assign"),
          getItem("Năng suất theo giai đoạn", "manager/staff/range"),
        ]),
        getItem("Thống kê", "manager/transaction", <HeartOutlined />, [
          getItem("Tổng đơn hàng", "manager/transaction/total"),
          getItem("Chính sách ưu đãi", "manager/promotion"),
          getItem("Sản phẩm bán chạy nhất", "manager/topproductsell"),
          getItem("So sánh sản phẩm", "manager/salecomparision"),
        ]),
        getItem("Thống kê sản phẩm", "manager/product", <HeartOutlined />, [
          getItem("Thể loại", "manager/category"),
          getItem("Sản phẩm", "manager/product"),
          getItem("Sản phẩm được xóa", "manager/inactive/product"),
        ]),
        getItem("Kiểm tra bảo hành", "manager/check/guarantee", <HeartOutlined />),
        getItem("Khách hàng", "manager/customer/view", <UserOutlined />),
        getItem("Chat", "manager/chat", <ProfileOutlined />),
      ]);
    } else if (user.role === "ROLE_ADMIN") {
      setItems([
        getItem("Hồ sơ", `profile`, <UserOutlined />, [
          getItem("Hồ sơ", `admin/profile/${user.id}`),
          getItem("Đổi mật khẩu", "admin/changepassword"),
        ]),
        getItem("Quản lý nhân sự", "personnel", <HeartOutlined />, [
          getItem("Tổng quan nhân sự", "admin/statictic/account"),
          getItem("Quản lí", "admin/manager"),
          getItem("Nhân viên", "admin/staff"),
        ]),
        getItem("Thống kê sản phẩm", "viewproductadmin", <AppstoreAddOutlined />, [
          getItem("Sản phẩm", "admin/product"),
          getItem("Sản phẩm được xóa", "admin/inactive/product"),
        ]),
        getItem("Chat", "admin/chat", <ProfileOutlined />),
        getItem("Thể loại", "admin/category", <AppstoreAddOutlined />),
        getItem("Thống kê tổng quát", "admin/analytic", <AppstoreAddOutlined />),

        getItem("Sản phẩm bán chạy", "admin/topproductsell", <BarChartOutlined />),
      ]);
    }
  }, [user.role]);

  const handleSubMenuOpen = (keyMenuItem) => {
    setOpenKeys(keyMenuItem);
  };

  const handleSelectKey = (keyPath) => {
    setKey(keyPath);
  };

  useEffect(() => {
    localStorage.setItem("keys", JSON.stringify(openKeys));
  }, [openKeys]);

  useEffect(() => {
    handleSubMenuOpen([...openKeys, key]);
  }, [currentURI]);

  return (
    <Layout style={{ minHeight: "100vh" }} className="dashboard_overall">
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu
          theme="dark"
          defaultSelectedKeys={["profile"]}
          mode="inline"
          selectedKeys={[currentURI]}
          openKeys={openKeys}
          onOpenChange={handleSubMenuOpen}
        >
          {items.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item key={subItem.key} onClick={(e) => handleSelectKey(e.keyPath[1])}>
                    <Link to={`/${subItem.key}`}>{subItem.label}</Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={`/${item.key}`}>{item.label}</Link>
              </Menu.Item>
            )
          )}
          <LogoutOutlined onClick={handleLogout} className="Dashbroad__Logout" />
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <header></header>
        </Header>
        <Content style={{ margin: "0 16px", display: "flex", flexDirection: "column" }}>
          <Breadcrumb>
            {location.pathname.split("/").map((path, index) => (
              <Breadcrumb.Item key={path}>
                {index === 0 ? (
                  path
                ) : (
                  <Link
                    to={`/${location.pathname
                      .split("/")
                      .slice(0, index + 1)
                      .join("/")}`}
                  >
                    {path}
                  </Link>
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div className="content-wrapper">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
