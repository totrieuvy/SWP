import { Button, Spin, Table, Tag } from "antd";
import api from "../../../../config/axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TransactionTotal.scss";

function TransactionTotal() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "cusName",
      key: "cusName",
      render: (cusName) => (cusName ? cusName : "Không có thông tin khách hàng"),
    },
    {
      title: "Tổng tiền đã thanh toán",
      dataIndex: "totalAmount",
      key: "totalAmount",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Ngày, giờ giao dịch",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      render: (purchaseDate) => {
        const datePart = purchaseDate.slice(0, 10);
        const timePart = purchaseDate.slice(11, 19);
        return `${datePart} / ${timePart}`;
      },
      sorter: (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate),
      defaultSortOrder: "ascend",
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Nhân viên thanh toán",
      dataIndex: "staffName",
      key: "staffName",
    },
    {
      title: "Tình trạng đặt hàng",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (orderStatus) => (
        <Tag color={orderStatus == 1 ? "green" : "red"}>
          {orderStatus == 1 ? "Đã được thanh toán" : "Chưa được thanh toán"}
        </Tag>
      ),
      sorter: (a, b) => a.orderStatus - b.orderStatus,
      defaultSortOrder: "ascend",
    },
    {
      title: "Xem chi tiết",
      dataIndex: "orderID, orderType",
      key: "orderID, orderType",
      render: (text, record) => (
        <Link to={`/manager/transaction/detail/${record.orderID}/${record.orderType}`}>
          <Button type="primary">Xem chi tiết</Button>
        </Link>
      ),
    },
  ];

  const fetchTransactionTotal = async () => {
    try {
      const response = await api.get("/api/Dashboard/purchase-order-history");
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  React.useEffect(() => {
    fetchTransactionTotal();
    document.title = "Các đơn hàng";
  }, []);

  const productSell = data.filter((item) => item.orderType === "INGOING");
  const productBuy = data.filter((item) => item.orderType === "OUTGOING");

  return (
    <div className="TransactionTotal">
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <h2>ĐƠN HÀNG BÁN RA</h2>
          <Table dataSource={productSell} columns={columns} rowKey="orderID" />

          <h2>ĐƠN HÀNG MUA VÀO</h2>
          <Table dataSource={productBuy} columns={columns} rowKey="orderID" />
        </>
      )}
    </div>
  );
}

export default TransactionTotal;
