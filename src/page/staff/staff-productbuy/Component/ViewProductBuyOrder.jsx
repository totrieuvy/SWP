import { Table } from "antd";
import React from "react";

function ViewProductBuyOrder({ data }) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Metal Type",
      dataIndex: "metalType",
      key: "metalType",
    },
    {
      title: "Gemstone Type",
      dataIndex: "gemstoneType",
      key: "gemstoneType",
    },
    {
      title: "Calculated Price",
      dataIndex: "calculatedPrice",
      key: "calculatedPrice",
      render: (text, record) => `$${record.calculatedPrice.toFixed(2)}`,
    },
  ];

  return (
    <div className="ViewProductBuyOrder">
      <Table dataSource={data} columns={columns} rowKey="id" />
    </div>
  );
}

export default ViewProductBuyOrder;
