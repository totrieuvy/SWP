import React, { useEffect, useState } from "react";
import "./totalCss.css";
import {
  Button,
  message,
  Form,
  Input,
  Radio,
  Space,
  notification,
  Popconfirm,
} from "antd";
import api from "../../../../config/axios";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

function Total({
  clear,
  order,
  currentOrderID,
  availableOrders,
  customerID,
  onFinishProcessing,
  removeFromAvailableOrders,
}) {
  const [payMethod, setPayMethod] = useState("");
  const [subTotal, setSubTotal] = useState("0");
  const [discount, setDiscount] = useState("0");
  const [cash, setCash] = useState("0");
  const [total, setTotal] = useState("0");
  const [orderInfo, setOrderInfo] = useState("Thanh toan");
  const [lockedOrderId, setLockedOrderId] = useState(null);
  const [alertApi, contextHolder] = notification.useNotification();
  const [isProcessed, setIsProcessed] = useState(false);
  const onChange = ({ target: { value } }) => {
    setPayMethod(value);
  };

  const handleAmountChange = (e) => setCash(e.target.value);

  const openNotification = (mess, desc, icon) => {
    alertApi.open({
      message: mess,
      description: desc,
      className: "alertCard",
      style: {
        width: 600,
      },
      icon,
    });
  };

  const transformData = (inputArray) => {
    console.log(inputArray);
    return inputArray.flatMap((item) => {
      const promotionIDs = Array.isArray(item.promotion_id)
        ? item.promotion_id
        : [];
      if (promotionIDs.length === 0) {
        return {
          productSell_ID: item.productID,
          promotion_ID: 0,
          quantity: item.quantity,
          orderDetail_ID: item.orderDetail_ID,
        };
      } else {
        return promotionIDs.map((promo) => ({
          productSell_ID: item.productID,
          promotion_ID: parseInt(promo),
          quantity: item.quantity,
          orderDetail_ID: item.orderDetail_ID,
        }));
      }
    });
  };

  const fetchTotal = async () => {
    const result = transformData(order);
    try {
      const response = await api.post("/api/order/total", result);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (currentOrderID) {
      console.log("Locked Order ID set to:", currentOrderID);

      setLockedOrderId(currentOrderID);
    }
  }, [currentOrderID]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchTotal();
      if (result) {
        setDiscount(result.discount_Price);
        setSubTotal(result.subTotal);
        setTotal(result.total);
        if (currentOrderID) {
          setOrderInfo(`Thanh toan ${currentOrderID}`);
        }
        console.log(currentOrderID);
      }
    };
    fetchData();
  }, [order, currentOrderID, availableOrders]);
  useEffect(() => {
    console.log(customerID);
  }, [customerID]);
  const handlePayment = async (e) => {
    e.preventDefault();
    const amount = parseInt(total);
    console.log("current" + lockedOrderId);

    const updateOrderData = {
      order_ID: currentOrderID,
      customer_ID: customerID,
      staff_ID: localStorage.getItem("userId"),
      paymenttype: payMethod,
    };

    try {
      const updateResponse = await api.put(
        "/api/order/update-order",
        updateOrderData
      );
      if (updateResponse.status !== 200) {
        openNotification(
          `Thất bại: ${updateResponse.status}`,
          updateResponse.data,
          <CloseCircleOutlined style={{ color: "red" }} />
        );
        return;
      }

      if (payMethod === "vnpay") {
        try {
          const response = await api.post(`/vnpay/submitOrder`, null, {
            params: {
              amount: amount,
              orderInfo: orderInfo,
            },
          });

          if (response.request.responseURL) {
            // Store current order info in localStorage before redirecting
            localStorage.setItem("pendingOrderId", currentOrderID);
            window.location.href = response.data;
          } else {
            alert("Failed to create order");
          }
        } catch (error) {
          console.error("Error creating order:", error);
          alert("Error creating order");
        }
      } else if (payMethod === "cash") {
        try {
          const payData = {
            orderID: currentOrderID,
            amount: parseFloat(cash),
            total: parseFloat(total),
          };
          console.log(payData);
          const response = await api.patch("/api/order/cash-confirm", payData);

          if (response.status === 200) {
            openNotification(
              "Thành công",
              response.data,
              <CheckCircleOutlined style={{ color: "green" }} />
            );
            clear();
            setLockedOrderId(null); // Clear the locked order ID
            removeFromAvailableOrders(currentOrderID);
            onFinishProcessing(); // Call onFinishProcessing here
          } else {
            openNotification(
              `Thất bại: ${response.status}`,
              response.data,
              <CloseCircleOutlined style={{ color: "red" }} />
            );
          }
        } catch (error) {
          if (error.response) {
            openNotification(
              `Thất bại: ${error.response.status}`,
              error.response.data,
              <CloseCircleOutlined style={{ color: "red" }} />
            );
          } else {
            console.error("Error:", error.message);
          }
        }
      }
    } catch (error) {
      openNotification(
        `Thất bại: ${error.response ? error.response.status : "Unknown error"}`,
        error.response ? error.response.data : error.message,
        <CloseCircleOutlined style={{ color: "red" }} />
      );
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
        <p className="totalTitle subTotalValue">{parseInt(total)}đ</p>
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
            {contextHolder}
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
              <Input value={cash} onChange={handleAmountChange} />
            </Form.Item>
          </Form>
        )}
      </section>
      <section id="buttonContainer">
        <Popconfirm
          title="Xác nhận thanh toán"
          description="Thanh toán hóa đơn?"
          onConfirm={handlePayment}
          okText="Chấp nhận"
          cancelText="Không"
        >
          <Button size="large" type="primary">
            Thanh toán
          </Button>
        </Popconfirm>
      </section>
    </div>
  );
}

export default Total;
