import api from "../../config/axios";
import React, { useState } from "react";

function VNPay() {
  const [amount, setAmount] = useState("");
  const [orderInfo, setOrderInfo] = useState("");

  const handleSubmit = async (e) => {
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
  };

  return (
    <div>
      <h1>Test VNPAY Order</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Order Info:
            <input
              type="text"
              value={orderInfo}
              onChange={(e) => setOrderInfo(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}

export default VNPay;
