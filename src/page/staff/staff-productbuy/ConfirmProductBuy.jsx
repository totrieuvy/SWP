import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table, Alert } from "antd";
import CustomWebcam from "./Component/CustomWebcam";
import "./style.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";
import api from "../../../config/axios";

function ConfirmProductBuy() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location || {};
  const { list, data } = state || {};
  const [image, setImage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const user = useSelector(selectUser);
  const [id, setId] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Ảnh",
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
      title: "Thể loại",
      dataIndex: "categoryName",
      key: "category",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "pbName",
      key: "name",
    },
    {
      title: "Loại kim loại",
      dataIndex: "metalType",
      key: "metalType",
    },
    {
      title: "Loại đá",
      dataIndex: "gemstoneType",
      key: "gemstoneType",
    },
    {
      title: "Giá",
      dataIndex: "cost",
      key: "cost",
      render: (text, record) => `$${(record.cost || 0).toFixed(2)}`,
    },
  ];

  const handleConfirm = async () => {
    console.log("Confirm button clicked");
    setIsButtonDisabled(true);
    const responseMessage = await confirmHandler();
    setId(responseMessage);
    const paymentMessage = await processPayment(responseMessage);
    console.log(paymentMessage);
    setAlertMessage(paymentMessage);

    if (!paymentMessage.includes("Error")) {
      // Navigate back after 5 seconds if the payment is successful
      setTimeout(() => {
        navigate("/staff/initialize-productbuy");
      }, 5000);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const confirmHandler = async () => {
    const orderRequest = {
      paymentType: "cash", // or set this dynamically if needed
      totalAmount: data.reduce((total, item) => total + item.cost, 0),
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

  const processPayment = async (orderIdentifier) => {
    const requestBody = {
      order_ID: orderIdentifier,
      image: image,
    };
    console.log(requestBody);
    try {
      const response = await api.patch(
        "/api/order/process-payment-PB",
        requestBody
      );
      return response.data;
    } catch (error) {
      console.error("Error processing payment:", error);
      return "Error processing payment. Please try again.";
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
          <Button onClick={handleConfirm} disabled={isButtonDisabled}>
            Xác nhận
          </Button>
        </div>
        <CustomWebcam setImageData={setImage} />
      </section>
    </div>
  );
}

export default ConfirmProductBuy;
