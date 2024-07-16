import React, { useEffect, useState } from "react";
import { Button, List, Typography } from "antd";
import Order from "./Component/Order";
import Total from "./Component/Total";
import "./Component/style.css";
import CustomerSearch from "./Component/CustomerSearch";
import WebSocket from "../../../config/WebSocket";

const { Title } = Typography;

function DisplayOrder() {
  const [data, setData] = useState("");
  const [order, setOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState("NotClear");
  const [availableOrders, setAvailableOrders] = useState([]);
  const [scannedOrderID, setScannedOrderID] = useState("");
  const [claimedOrderId, setClaimedOrderId] = useState(null);
  const [customerID, setCustomerID] = useState(0);
  const userID = localStorage.getItem("userID");
  const [currentOrderID, setCurrentOrderID] = useState(null);
  const [processingOrder, setProcessingOrder] = useState(false);

  useEffect(() => {
    document.title = "Mua lại";

    WebSocket.connect(
      (orderId) => {
        setAvailableOrders((prev) => [...prev, orderId]);
      },
      (response) => {
        if (response.success) {
          setClaimedOrderId(response.orderId);
          setCurrentOrderID(response.orderId);
          setAvailableOrders((prev) =>
            prev.filter((id) => id !== response.orderId)
          );
          setProcessingOrder(true);
        } else {
          console.log(`Không thể nhận đơn hàng: ${response.message}`);
        }
      },
      null,
      null,
      null
    );

    return () => {
      WebSocket.disconnect();
    };
  }, []);

  const childToParent = (childdata, id) => {
    setScannedOrderID(childdata);
    setCustomerID(id);
  };

  const clearOrder = () => {
    setOrder([]);
    setOrderStatus("Clear");
  };

  const claimOrder = (orderId) => {
    WebSocket.claimOrder(orderId);
    setProcessingOrder(true);
  };

  const finishProcessing = () => {
    setProcessingOrder(false);
    setCurrentOrderID(null);
    WebSocket.releaseOrder(currentOrderID);
  };

  return (
    <div className="parent">
      {processingOrder ? (
        <>
          <Order
            orderID={currentOrderID}
            availableOrders={availableOrders}
            setOrder={setOrder}
            setOrderStatus={setOrderStatus}
            orderStatus={orderStatus}
          />
          <CustomerSearch childToParent={childToParent} />
          <Total
            clear={clearOrder}
            order={order}
            currentOrderID={currentOrderID}
            availableOrders={availableOrders}
            customerID={customerID}
            onFinishProcessing={finishProcessing}
          />
        </>
      ) : (
        <div>
          <Title level={2}>Đơn hàng có sẵn:</Title>
          <List
            dataSource={availableOrders}
            renderItem={(orderId) => (
              <List.Item>
                <Button type="primary" onClick={() => claimOrder(orderId)}>
                  Nhận đơn hàng {orderId}
                </Button>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
}

export default DisplayOrder;
