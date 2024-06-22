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
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
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
          getItem("Đổi mật khẩu", "staff/changepassword", <ProfileOutlined />),
        ]),
        getItem("Thể loại", "staff/category", <AppstoreAddOutlined />),
        getItem("Sản phẩm", "staff/product", <AppstoreAddOutlined />),
        getItem("Tạo đơn hàng", "staff/create", <AppstoreAddOutlined />),
        getItem("Xác nhận đơn hàng", "staff/confirm-order", <CheckCircleOutlined />),
      ]);
    } else if (user.role === "ROLE_MANAGER") {
      setItems([
        getItem("Hồ sơ", "profile", <UserOutlined />, [
          getItem("Thông tin cá nhân/", `manager/profile/${user.id}`),
          getItem("Đổi mật khẩu", "manager/changepassword", <ProfileOutlined />),
        ]),
        getItem("Thể loại", "manager/category", <AppstoreAddOutlined />),
        getItem("Sản phẩm", "manager/product", <HeartOutlined />),

        getItem("Khách hàng", "manager/customer/view", <UserOutlined />),
        getItem("Danh sách nhân viên", "manager/staff", <CheckCircleOutlined />),
        getItem("Lịch làm việc", "manager/staff/assign", <UserOutlined />),
        getItem("Xem lịch của tất cả nhân viên", "manager/staff/view", <UserOutlined />),
        getItem("Chính sách ưu đãi", "manager/promotion", <ProfileOutlined />),
        getItem("Sản phẩm bán chạy nhất", "manager/topproductsell", <HeartOutlined />),
      ]);
    } else if (user.role === "ROLE_ADMIN") {
      setItems([
        getItem("Hồ sơ", `admin/profile/${user.id}`, <UserOutlined />),
        getItem("Thống kê", `admin/analytic`, <BarChartOutlined />),
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
          <div className="content-wrapper">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
