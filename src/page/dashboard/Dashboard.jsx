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
        getItem("Thể loại", "staff/category", <ProfileOutlined />),
        getItem("Sản phẩm", "staff/product", <ProfileOutlined />),
        getItem("Tạo đơn hàng", "staff/create", <ProfileOutlined />),
        getItem("Mua lại", "staff/initialize-productbuy", <ProfileOutlined />),
        getItem("Xác nhận đơn hàng", "staff/confirm-order", <ProfileOutlined />),
        getItem("Đổi mật khẩu", "staff/changepassword", <ProfileOutlined />),
        getItem("Hồ sơ", "profile", <UserOutlined />, [
          getItem("Hồ sơ cá nhân", `staff/profile/${user.id}`),
          getItem("Đổi mật khẩu", "staff/changepassword", <ProfileOutlined />),
        ]),
      ]);
    } else if (user.role === "ROLE_MANAGER") {
      setItems([
        getItem("Hồ sơ", "profile", <UserOutlined />, [
          getItem("Thông tin cá nhân/", `manager/profile/${user.id}`),
          getItem("Đổi mật khẩu", "manager/changepassword", <ProfileOutlined />),
          getItem("Thông tin cá nhân", `manager/profile/${user.id}`),
          getItem("Đổi mật khẩu", "manager/changepassword", <ProfileOutlined />),
        ]),
        getItem("Quản lí nhân sự", "manager/manage", <UserOutlined />, [
          getItem("Danh sách nhân viên", "manager/staff"),
          getItem("Xem lịch của tất cả nhân viên", "manager/staff/view"),
          getItem("Lịch làm việc", "manager/staff/assign"),
        ]),
        getItem("Quản lí đơn hàng", "manager/transaction", <ProfileOutlined />, [
          getItem("Tổng đơn hàng", "manager/transaction/total"),
        ]),
        getItem("Thể loại", "manager/category", <AppstoreAddOutlined />),
        getItem("Sản phẩm", "manager/product", <HeartOutlined />),
        getItem("Khách hàng", "manager/customer/view", <UserOutlined />),
        getItem("Danh sách nhân viên", "manager/staff", <ProfileOutlined />),
        getItem("So sánh sản phẩm", "manager/salecomparision", <ProfileOutlined />),
        getItem("Lịch làm việc", "manager/staff/assign", <UserOutlined />),
        getItem("Xem lịch của tất cả nhân viên", "manager/staff/view", <UserOutlined />),
        getItem("Chính sách ưu đãi", "manager/promotion", <ProfileOutlined />),
        getItem("Sản phẩm bán chạy nhất", "manager/topproductsell", <HeartOutlined />),
      ]);
    } else if (user.role === "ROLE_ADMIN") {
      setItems([
        getItem("Hồ sơ", `profile`, <UserOutlined />, [
          getItem("Hồ sơ", `admin/profile/${user.id}`),
          getItem("Đổi mật khẩu", "admin/changepassword"),
        ]),
        getItem("Sản phẩm", "admin/product", <AppstoreAddOutlined />),
        getItem("Thể loại", "admin/category", <AppstoreAddOutlined />),
        getItem("Thống kê hà hoàng", "admin/analytic", <AppstoreAddOutlined />),

        getItem("Quản lý nhân sự", "personnel", <HeartOutlined />, [
          getItem("Quản lí", "admin/manager"),
          getItem("Nhân viên", "admin/staff"),
        ]),
        getItem("Thống kê", "statistics", <BarChartOutlined />, [getItem("Sản phẩm bán chạy", `admin/topproductsell`)]),
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
