import React, { useState } from "react";
import "./totalCss.css";
import { Button, Radio, Space } from "antd";

const options = [
  {
    label: "Apple",
    value: "Apple",
  },
  {
    label: "Pear",
    value: "Pear",
  },
  {
    label: "Orange",
    value: "Orange",
  },
];

function Total() {
  const [value, setValue] = useState("Apple");

  const onChange = ({ target: { value } }) => {
    console.log("checked", value);
    setValue(value);
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
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio.Button value={1}>VNPAY</Radio.Button>
            <Radio.Button value={2}>Tiền mặt</Radio.Button>
          </Space>
        </Radio.Group>
      </section>
      <section id="buttonContainer">
        <Button size="large" type="primary">
          Thanh toán
        </Button>
      </section>
    </div>
  );
}

export default Total;
