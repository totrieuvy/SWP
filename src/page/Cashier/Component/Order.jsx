import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { Table, Tag, Space } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Carat",
    dataIndex: "carat",
    key: "carat",
  },
  {
    title: "Chi",
    dataIndex: "chi",
    key: "chi",
  },
  {
    title: "Cost",
    dataIndex: "cost",
    key: "cost",
  },
  {
    title: "Gemstone Type",
    dataIndex: "gemstoneType",
    key: "gemstoneType",
  },
  {
    title: "Manufacturer",
    dataIndex: "manufacturer",
    key: "manufacturer",
  },
  {
    title: "Product Cost",
    dataIndex: "productCost",
    key: "productCost",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];
function Order({ orderID, setOrder, orderStatus, setOrderStatus }) {
  // Destructuring props to get orderID
  const [data, setData] = useState([]); // Initial state as an empty array to hold product list

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/api/order/${orderID}`);
        setData(response.data);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching the order", error);
      }
    };

    fetchOrder();
  }, [orderID]); // Add orderID to dependency array
  useEffect(() => {
    if (orderStatus == "Clear") {
      setData([]);
      setOrderStatus("NotClear");
    }
  }, [orderStatus]);

  return (
    <div className="bill">
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Order;
