import { Button, Table } from "antd";
import api from "../../../../config/axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function ViewProductBuyOrder({ data, setData }) {
  const navigate = useNavigate();

  const transformData = (data) => {
    return data.map((product) => ({
      id: product.productBuyID,
      image: product.image,
      category: product.categoryName,
      name: product.pbName,
      cost: product.cost,
    }));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "productBuyID",
      key: "id",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={record.image}
          alt="product"
          style={{ width: 100, height: 100 }}
        />
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "categoryName",
      key: "category",
    },
    {
      title: "Tên",
      dataIndex: "pbName",
      key: "name",
    },
    {
      title: "Giá tính toán",
      dataIndex: "cost",
      key: "cost",
      render: (text, record) => `$${record.cost.toFixed(2)}`,
    },
  ];

  const handleOrder = () => {
    try {
      const productIds = data.map((product) => product.productBuyID);
      console.log({ orderIds: productIds });

      navigate("/staff/confirm-productbuy", {
        state: {
          list: productIds,
          data: data,
        },
      });
    } catch (error) {
      console.error("Error processing order:", error);
      // Handle error
    }
  };

  return (
    <div className="ViewProductBuyOrder">
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={false}
        scroll={{ y: 400 }}
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
