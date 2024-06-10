import React, { useState } from "react";
import "./totalCss.css";
import { Button, Radio, Space } from "antd";
import api from "../../../config/axios";

function Total() {
  const [payMethod, setPayMethod] = useState("");
  const [amount, setAmount] = useState("100000");
  const [orderInfo, setOrderInfo] = useState("Thanh toán hóa đơn");

  const onChange = ({ target: { value } }) => {
    setPayMethod(value);
  };

  const handlePayment = async (e) => {
    if (payMethod == "vnpay") {
      e.preventDefault();

      try {
        const response = await api.post(`/vnpay/submitOrder`, null, {
          params: {
            amount,
            orderInfo,
          },
        });

        if (response.request.responseURL) {
          window.location.href = response.data;
        } else {
          alert("Failed to create order");
        }
      } catch (error) {
        console.error("Error creating order:", error);
        alert("Error creating order");
      }
    }
  };
  return (
    <div className="total">
      <section className="subTotal">
        <p className="totalTitle">Tổng phụ</p>
        <p className="totalTitle subTotalValue">1.000.000đ</p>
      </section>
      <hr />
      <section className="discount">
        <p className="totalTitle">Giảm giá</p>
        <p className="totalTitle subTotalValue">500.000đ</p>
      </section>
      <hr />
      <section className="totalAmount">
        <p className="totalTitle">Tổng giá</p>
        <p className="totalTitle subTotalValue">1.500.000đ</p>
      </section>
      <hr />
      <section className="selectPayment">
        <p>Chọn phương thức thanh toán</p>
        <Radio.Group onChange={onChange} value={payMethod}>
          <Space direction="vertical">
            <Radio.Button value="vnpay">VNPAY</Radio.Button>
            <Radio.Button value="cash">Tiền mặt</Radio.Button>
          </Space>
        </Radio.Group>
      </section>
      <section id="buttonContainer">
        <Button size="large" type="primary" onClick={handlePayment}>
          Thanh toán
        </Button>
      </section>
    </div>
  );
}

export default Total;
