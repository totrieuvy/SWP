import { useEffect, useState } from "react";
import {
  ProfileOutlined,
  HeartOutlined,
  UserOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/features/counterSlice";
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
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [items, setItems] = useState([]);
  const [key, setKey] = useState();
  const location = useLocation();
  const currentURI = location.pathname.split("/").slice(-1)[0];

  const role = "admin";
  const dispatcher = useDispatch();

  const dataOpen = JSON.parse(localStorage.getItem("keys")) ?? [];

  const [openKeys, setOpenKeys] = useState(dataOpen);

  const user = useSelector(selectUser);
  const navigation = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    dispatcher(logout());
    navigation("/login");
  };

  useEffect(() => {
    if (user.role === "ROLE_STAFF") {
      setItems([
        getItem("Hồ sơ", `staff/profile/${user.id}`, <ProfileOutlined />),
        getItem("Thể loại", "staff/category", <ProfileOutlined />),
        getItem("Sản phẩm", "staff/product", <ProfileOutlined />),
        getItem("Tạo đơn hàng", "staff/create", <ProfileOutlined />),
        getItem("Xác nhận đơn hàng", "staff/confirm-order", <ProfileOutlined />),
        getItem("Đổi mật khẩu", "staff/changepassword", <ProfileOutlined />),
      ]);
    } else if (user.role === "ROLE_MANAGER") {
      setItems([
        getItem("Hồ sơ", `manager/profile/${user.id}`, <ProfileOutlined />),
        getItem("Thể loại", "manager/category", <ProfileOutlined />),
        getItem("Sản phẩm", "manager/product", <HeartOutlined />),
        getItem("Khách hàng", "manager/customer/view", <ProfileOutlined />),

        getItem("Danh sách nhân viên", "manager/staff", <CheckCircleOutlined />),
        getItem("Lịch làm việc", "manager/staff/assign", <ProfileOutlined />),
        getItem("Xem lịch của tất cả nhân viên", "manager/staff/view", <ProfileOutlined />),
        getItem("Chính sách ưu đãi", "manager/promotion", <ProfileOutlined />),
        getItem("Đổi mật khẩu", "manager/changepassword", <ProfileOutlined />),
      ]);
    } else if (user.role === "ROLE_ADMIN") {
      setItems([
        getItem("Hồ sơ", `admin/profile/${user.id}`, <ProfileOutlined />),
        getItem("Thống kê", `admin/analytic`, <ProfileOutlined />),
        getItem("Sản phẩm", "admin/product", <AppstoreAddOutlined />),
        getItem("Thể loại", "admin/category", <AppstoreAddOutlined />),
        getItem("Quản lý nhân sự", "personnel", <HeartOutlined />, [
          getItem("Quản lí", "admin/manager"),
          getItem("Nhân viên", "admin/staff"),
        ]),
        getItem("Thống kê", "statistics", <BarChartOutlined />, [
          getItem("Doanh thu", "stats-club-1"),
          getItem("Club 2", "stats-club-2"),
          getItem("Club 3", "stats-club-3"),
          getItem("All Clubs", "all-clubs"),
        ]),
        getItem("Đổi mật khẩu", "admin/changepassword", <ProfileOutlined />),
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
    <Layout style={{ minHeight: "100vh" }}>
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
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Outlet style={{ flexGrow: 1 }} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "#E3F2EE" }}></Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
