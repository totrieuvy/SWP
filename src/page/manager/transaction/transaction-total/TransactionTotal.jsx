import { Button, Modal, Spin, Table } from "antd";
import api from "../../../../config/axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TransactionTotal.scss";
import moment from "moment";

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
      title: "Ngày giao dịch",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      render: (purchaseDate) => moment(purchaseDate).format("YYYY-MM-DD / HH:mm:ss"),
      sorter: (a, b) => moment(b.purchaseDate).diff(moment(a.purchaseDate)),
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
      title: "Loại đặt hàng",
      dataIndex: "orderType",
      key: "orderType",
      render: (orderType) => (orderType == "OUTGOING" ? "Hàng mua vào" : "Hàng bán ra"),
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

  const productSell = data.filter((item) => item.orderType == "INGOING");

  const productBuy = data.filter((item) => item.orderType == "OUTGOING");

  return (
    <div className="TransactionTotal">
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <h2>ĐƠN HÀNG BÁN RA</h2>
          <Table dataSource={productSell} columns={columns} />

          <h2>ĐƠN HÀNG MUA VÀO</h2>
          <Table dataSource={productBuy} columns={columns} />
        </>
      )}
    </div>
  );
}

export default TransactionTotal;
