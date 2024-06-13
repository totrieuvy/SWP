import { Button, Table } from "antd";
import React from "react";

function ViewProductBuyOrder({ data }) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={`${record.image}`}
          alt="product"
          style={{ width: 100, height: 100 }}
        />
      ),
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
      render: (text, record) => `$${(record.calculatedPrice || 0).toFixed(2)}`,
    },
  ];
  const handleOrder = () => {
    console.log(data);
  };
  return (
    <div className="ViewProductBuyOrder">
      <Table
        dataSource={data}
        columns={columns}
        style={{ maxHeight: "70%", overflow: "auto" }}
        rowKey={(record, index) => index}
        pagination={false}
      />
      <section className="ProductBuyInitializeButton">
        <Button
          type="primary"
          onClick={handleOrder}
          className="fullWidthButton"
        >
          Tạo
        </Button>
      </section>
    </div>
  );
}

export default ViewProductBuyOrder;
