import React, { useState, useEffect } from "react";
import { Table, Card, Typography, Space } from "antd";
import api from "../../config/axios";

const { Title, Text } = Typography;

const Refund = () => {
  const [refundData, setRefundData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRefunds();
  }, []);

  const fetchRefunds = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/order/refund");
      const groupedData = groupRefundsByCustomer(response.data);
      setRefundData(groupedData);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu hoàn tiền:", error);
      setLoading(false);
    }
  };

  const groupRefundsByCustomer = (refunds) => {
    const grouped = refunds.reduce((acc, refund) => {
      const customerId = refund.customerId;
      if (!acc[customerId]) {
        acc[customerId] = {
          key: customerId,
          customerId: customerId,
          customerName: refund.customerName,
          customerEmail: refund.customerEmail,
          customerPhone: refund.customerPhone,
          loyaltyRank: refund.customerLoyaltyRank,
          totalRefundAmount: 0,
          refunds: [],
        };
      }
      acc[customerId].totalRefundAmount += refund.amount;
      acc[customerId].refunds.push(refund);
      return acc;
    }, {});
    return Object.values(grouped);
  };

  const columns = [
    { title: "ID Khách Hàng", dataIndex: "customerId", key: "customerId" },
    { title: "Tên", dataIndex: "customerName", key: "customerName" },
    { title: "Email", dataIndex: "customerEmail", key: "customerEmail" },
    {
      title: "Số Điện Thoại",
      dataIndex: "customerPhone",
      key: "customerPhone",
    },
    { title: "Hạng Thành Viên", dataIndex: "loyaltyRank", key: "loyaltyRank" },
    {
      title: "Tổng Số Tiền Hoàn",
      dataIndex: "totalRefundAmount",
      key: "totalRefundAmount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
  ];

  const expandedRowRender = (record) => {
    const refundColumns = [
      { title: "ID Hoàn Tiền", dataIndex: "refundId", key: "refundId" },
      { title: "ID Đơn Hàng", dataIndex: "orderId", key: "orderId" },
      { title: "Sản Phẩm", dataIndex: "productName", key: "productName" },
      {
        title: "Số Tiền Hoàn",
        dataIndex: "amount",
        key: "amount",
        render: (amount) => `${amount.toFixed(2)}đ`,
      },
      { title: "Ngày Hoàn", dataIndex: "refundDate", key: "refundDate" },
      { title: "Lý Do", dataIndex: "reason", key: "reason" },
    ];

    return (
      <Table
        columns={refundColumns}
        dataSource={record.refunds}
        pagination={false}
      />
    );
  };

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Title level={2}>Hoàn Tiền Theo Khách Hàng</Title>
        <Table
          columns={columns}
          dataSource={refundData}
          expandable={{ expandedRowRender }}
          loading={loading}
        />
      </Space>
    </Card>
  );
};

export default Refund;
