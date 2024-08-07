import { Button, Spin, Table, Tag, Statistic, Row, Col } from "antd";
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
      render: (cusName) =>
        cusName ? cusName : "Không có thông tin khách hàng",
    },
    {
      title: "Tổng tiền đã thanh toán",
      dataIndex: "totalAmount",
      key: "totalAmount",
      sorter: (a, b) => (a.totalAmount || 0) - (b.totalAmount || 0),
      render: (totalAmount) =>
        Math.abs(totalAmount || 0).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
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
        <Tag color={orderStatus === 3 ? "green" : "red"}>
          {orderStatus === 3 ? "Đã được thanh toán" : "Chưa được thanh toán"}
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
        <Link
          to={`/manager/transaction/detail/${record.orderID}/${record.orderType}`}
        >
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
  console.log("Product Buy:", productBuy); // Debugging output

  const totalSellAmount = productSell
    .filter((item) => item.orderStatus == 3)
    .reduce((acc, item) => acc + Math.abs(item.totalAmount || 0), 0);

  const totalBuyAmount = productBuy
    .filter((item) => item.orderStatus == 3)
    .reduce((acc, item) => acc + Math.abs(item.totalAmount || 0), 0);

  return (
    <div className="TransactionTotal">
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <h2>ĐƠN HÀNG BÁN RA</h2>
          <Row gutter={16} className="total-amount">
            <Col span={12}>
              <Statistic
                title="Tổng tiền đã thanh toán"
                value={totalSellAmount}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix="₫"
                suffix="VND"
              />
            </Col>
          </Row>
          <Table dataSource={productSell} columns={columns} rowKey="orderID" />

          <h2>ĐƠN HÀNG MUA VÀO</h2>
          <Row gutter={16} className="total-amount">
            <Col span={12}>
              <Statistic
                title="Tổng tiền đã thanh toán"
                value={totalBuyAmount}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix="₫"
                suffix="VND"
              />
            </Col>
          </Row>
          <Table dataSource={productBuy} columns={columns} rowKey="orderID" />
        </>
      )}
    </div>
  );
}

export default TransactionTotal;
