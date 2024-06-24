import { Button, Table } from "antd";
import api from "../../../../config/axios";
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
  const transformData = (data) => {
    return data.map((product) => ({
      name: product.name,
      category_id: product.category_id,
      metalType: product.metalType,
      gemstoneType: product.gemstoneType,
      image: product.image,
      metalWeight: product.metalWeight,
      gemstoneWeight: product.gemstoneWeight,
      cost: product.cost,
    }));
  };

  // Function to handle order creation
  const handleOrder = async () => {
    try {
      const transformedData = transformData(data);
      console.log({ List: transformData(data) });

      const response = await api.post("/api/order/initializePB", {
        list: transformData(data),
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Function to create product buy order
  const createProductBuyOrder = async (transformedData) => {
    try {
      const response = await api.post("/api/order/initializePB", {
        list: transformedData,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error so it can be caught by the caller
    }
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
