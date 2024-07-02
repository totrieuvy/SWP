import { Table, Image, QRCode, Input, Button, Form } from "antd";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import api from "../../../config/axios";

const columns = [
  {
    title: "Tên",
    dataIndex: "pname",
    key: "pname",
  },
  {
    title: "Carat",
    dataIndex: "carat",
    key: "carat",
  },
  {
    title: "Chỉ",
    dataIndex: "chi",
    key: "chi",
  },
  {
    title: "Giá",
    dataIndex: "cost",
    key: "cost",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Mã",
    dataIndex: "productCode",
    key: "productCode",
    render: (text) => {
      return <QRCode size={50} value={text || "-"} />;
    },
  },
  {
    title: "Ảnh",
    dataIndex: "image",
    key: "image",
    render: (text) => <Image width={50} src={text} />,
  },
];

function SaleViewOrderMenu({ currentOrder, closeOrder }) {
  const [email, setEmail] = useState("");
  const [qrImage, setQrImage] = useState(null);

  useEffect(() => {
    console.log(currentOrder);
  }, [currentOrder]);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmitOrder = async () => {
    const data = {
      orderRequest: {
        paymentType: "none",
        totalAmount: 0,
        purchaseDate: new Date().toISOString(),
        status: 0,
      },
      detailList: currentOrder.map((product) => ({
        productID: product.productID,
        quantity: product.quantity,
      })),
      email: email,
    };

    data.orderRequest.totalAmount = currentOrder.reduce((total, product) => {
      return total + product.cost * product.quantity;
    }, 0);

    try {
      const response = await api.post("api/order/initialize-qr", data);

      console.log(response.data);
      if (!email.trim()) {
        const response = await api.post("api/order/initialize-qr", data);
        const base64Data = response.data;
        const qrImageUrl = `data:image/png;base64,${base64Data}`;
        setQrImage(qrImageUrl);
      } else {
        setQrImage(null);
      }
    } catch (error) {
      console.error("Error initializing QR:", error);
    }

    closeOrder([]);
  };

  return (
    <div className="SaleOrderMenu">
      <div className="SaleSelectCustomer">
        <Form>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Hãy nhập email",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Nhập email"
              value={email}
              onChange={handleInputChange}
              prefix={<UserOutlined />}
            />
          </Form.Item>
        </Form>
      </div>
      <div className="SaleOrderTable">
        <Table
          pagination={false}
          columns={columns}
          dataSource={currentOrder}
          rowKey="productID"
          style={{
            maxHeight: "80%",
            overflowY: "scroll",
          }}
        />
      </div>
      <div className="SaleCreateOrder">
        <Button onClick={handleSubmitOrder} style={{ height: 100, width: 250 }}>
          Thanh toán
        </Button>
      </div>
      {qrImage && (
        <div className="SaleOrderQrImage">
          <Image src={qrImage} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default SaleViewOrderMenu;
