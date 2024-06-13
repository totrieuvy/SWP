import React, { useEffect, useState } from "react";
import "./totalCss.css";
import { Button, Form, Input, Radio, Space } from "antd";
import api from "../../../config/axios";

function Total({ order, id }) {
  const [payMethod, setPayMethod] = useState("");
  const [subTotal, setSubTotal] = useState("0");
  const [discount, setDiscount] = useState("0");

  const [total, setTotal] = useState("0");

  const [orderInfo, setOrderInfo] = useState(`Thanh toán hóa đơn`);

  const onChange = ({ target: { value } }) => {
    setPayMethod(value);
  };
  const transformData = (inputArray) => {
    return inputArray.flatMap((item) => {
      if (item.promotion_id.length === 0) {
        return {
          productSell_ID: item.productID,
          promotion_ID: 0,
          quantity: item.quantity,
        };
      } else {
        return item.promotion_id.map((promo) => ({
          productSell_ID: item.productID,
          promotion_ID: parseInt(promo),
          quantity: item.quantity,
        }));
      }
    });
  };

  const fetchTotal = async () => {
    var result = transformData(order);
    try {
      const response = await api.post("/api/order/OrderTotal", result);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchTotal();
      setDiscount(result.discount_Price);
      setSubTotal(result.subTotal);
      setTotal(result.total);
      setOrderInfo(`Thanh toan ${id}`);
      console.log(id);
    };
    fetchData();
  }, [order]);
  const handlePayment = async (e) => {
    if (payMethod == "vnpay") {
      e.preventDefault();

      try {
        const response = await api.post(`/vnpay/submitOrder`, null, {
          params: {
            amount: parseInt(total) * 100,
            orderInfo: orderInfo,
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
        <p className="totalTitle subTotalValue">{subTotal}đ</p>
      </section>
      <hr />
      <section className="discount">
        <p className="totalTitle">Giảm giá</p>
        <p className="totalTitle subTotalValue">{discount}đ</p>
      </section>
      <hr />
      <section className="totalAmount">
        <p className="totalTitle">Tổng giá</p>
        <p className="totalTitle subTotalValue">{total}đ</p>
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
        {payMethod === "cash" && (
          <Form>
            <Form.Item
              label="Cash Amount Received"
              name="cashAmount"
              rules={[
                {
                  required: true,
                  message: "Please enter the cash amount received!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        )}
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
