import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Table } from "antd";
import CustomWebcam from "./Component/CustomWebcam";
import "./style.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";
function ConfirmProductBuy() {
  const location = useLocation();
  const { state } = location || {};
  const { list, data } = state || {};
  const [image, setImage] = useState(null);
  const user = useSelector(selectUser);

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

  return (
    <div className="ConfirmProductBuy">
      <h1>Confirm Order</h1>
      <h2>Staff: {user.id}</h2>
      <section className="confirmDivider">
        <Table
          dataSource={data}
          columns={columns}
          style={{ maxHeight: "70%", maxWidth: "50%", overflow: "auto" }}
          rowKey={(record, index) => index}
          pagination={false}
        />
        <CustomWebcam setImageData={setImage} />
      </section>
    </div>
  );
}

export default ConfirmProductBuy;
