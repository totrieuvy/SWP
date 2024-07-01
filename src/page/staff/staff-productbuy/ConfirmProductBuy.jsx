import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Table, Alert } from "antd";
import CustomWebcam from "./Component/CustomWebcam";
import "./style.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";
import api from "../../../config/axios";

function ConfirmProductBuy() {
  const location = useLocation();
  const { state } = location || {};
  const { list, data } = state || {};
  const [image, setImage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
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

  const handleConfirm = async () => {
    console.log("Confirm button clicked");
    const responseMessage = await confirmHandler();
    console.log("Response message:", responseMessage);
    setAlertMessage(responseMessage);
  };

  const confirmHandler = async () => {
    const orderRequest = {
      paymentType: "cash", // or set this dynamically if needed
      totalAmount: data.reduce(
        (total, item) => total + item.calculatedPrice,
        0
      ),
      status: 0, // or set this dynamically if needed
      staff_ID: user.id,
    };

    const requestBody = {
      orderRequest,
      productBuyLists: list,
    };
    console.log(requestBody);
    try {
      const response = await api.post(
        "/api/order/initialize-PB-order",
        requestBody
      );
      return response.data; // Assuming response has a message field
    } catch (error) {
      console.error("Error confirming order:", error);
      return "Error confirming order. Please try again.";
    }
  };

  return (
    <div className="ConfirmProductBuy">
      <h1>Confirm Order</h1>
      <h2>Staff: {user.id}</h2>
      {alertMessage && (
        <Alert message={alertMessage} type="info" showIcon closable />
      )}
      <section className="confirmDivider">
        <div className="productBuyConfirmation">
          <Table
            dataSource={data}
            columns={columns}
            style={{ maxHeight: "70%", maxWidth: "100%", overflow: "auto" }}
            rowKey={(record, index) => index}
            pagination={false}
          />
          <Button onClick={handleConfirm}>Xác nhận</Button>
        </div>
        <CustomWebcam setImageData={setImage} />
      </section>
    </div>
  );
}

export default ConfirmProductBuy;
