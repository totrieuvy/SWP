import React from "react";
import { Layout, Typography, Space } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

const { Header } = Layout;
const { Title, Text } = Typography;

function TopBar() {
  return (
    <Header
      style={{
        background: "#f0f8ff",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="/HomePage" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://i.ibb.co/rpCCWJH/image.png"
            alt="Logo"
            style={{ height: 40, marginRight: 15 }}
          />
          <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
            JewelryMS
          </Title>
        </Link>
        <Space>
          <Text strong style={{ color: "#1890ff" }}>
            {moment().format("DD/MM/YYYY")}
          </Text>
        </Space>
      </div>
    </Header>
  );
}

export default TopBar;
