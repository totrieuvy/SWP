import React from "react";
import { Table, Typography, Layout, Card } from "antd";
import moment from "moment";

const { Title } = Typography;
const { Content } = Layout;

function GoldBoard({ data }) {
  if (!data) {
    return <p>No data available</p>;
  }

  const columns = [
    {
      title: "Loại vàng",
      dataIndex: "Tên giá vàng",
      key: "name",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{text}</div>
          <div style={{ fontSize: "12px", color: "#888" }}>
            {record["Hàm lượng vàng"]} - {record["Hàm lượng kara"]}
          </div>
        </div>
      ),
    },
    {
      title: "Thời gian nhập",
      dataIndex: "Thời gian nhập giá vàng",
      key: "time",
      render: (text) =>
        moment(text, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Giá mua",
      dataIndex: "Giá mua vào",
      key: "buy",
      align: "right",
      render: (text) => (
        <span style={{ color: "#1890ff", fontWeight: "bold" }}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text)}
        </span>
      ),
    },
    {
      title: "Giá bán",
      dataIndex: "Giá mua ra",
      key: "sell",
      align: "right",
      render: (text, record) => {
        const price = text == 0 ? record["Giá mua vào"] : text;
        return (
          <span style={{ color: "#52c41a", fontWeight: "bold" }}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(price)}
          </span>
        );
      },
    },
  ];

  return (
    <Content style={{ padding: "24px" }}>
      <Card>
        <Title
          level={2}
          style={{
            textAlign: "center",
            color: "#1890ff",
            marginBottom: "24px",
          }}
        >
          Giá vàng hôm nay
        </Title>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record["Tên giá vàng"]}
          pagination={false}
          style={{ background: "#fff" }}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "even-row" : "odd-row"
          }
        />
      </Card>
    </Content>
  );
}

export default GoldBoard;
