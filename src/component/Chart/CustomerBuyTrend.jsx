import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import api from "../../config/axios";

const CustomerBuyTrendTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "/api/Dashboard/customer-products-trend"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Sản phẩm mua top 1",
      dataIndex: "productTop1",
      key: "productTop1",
    },
    {
      title: "Sản phẩm mua top 2",
      dataIndex: "productTop2",
      key: "productTop2",
    },
    {
      title: "Sản phẩm mua top 3",
      dataIndex: "productTop3",
      key: "productTop3",
    },
  ];

  return (
    <>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table columns={columns} dataSource={data} rowKey="customerName" />
      )}
    </>
  );
};

export default CustomerBuyTrendTable;
