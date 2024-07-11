import React, { useEffect, useState } from "react";
import Order from "./Component/Order";
import Total from "./Component/Total";
import "./Component/style.css";
import CustomerSearch from "./Component/CustomerSearch";
import WebSocket from "../../config/WebSocket";
function DisplayOrder() {
  const [data, setData] = useState("");
  const [order, setOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState("NotClear");
  const [availableOrders, setAvailableOrders] = useState([]);
  const [scannedOrderID, setScannedOrderID] = useState("");

  React.useEffect(() => {
    document.title = "Mua lại";
  }, []);

  const childToParent = (childdata) => {
    setScannedOrderID(childdata);
  };
  const clearOrder = () => {
    setOrder([]);
    setOrderStatus("Clear");
  };
  useEffect(() => {
    document.title = "Mua lại";

    // Initialize WebSocket connection with callbacks
    WebSocket.connect(
      (orderId) => {
        setAvailableOrders((prev) => [...prev, orderId]);
      },
      (orderId) => {
        setAvailableOrders((prev) => prev.filter((id) => id !== orderId));
      }
    );

    // Clean up WebSocket connection
    return () => {
      WebSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("Available orders updated:", availableOrders);
  }, [availableOrders]);

  useEffect(() => {
    console.log("Scanned order ID updated:", scannedOrderID);
  }, [scannedOrderID]);

  useEffect(() => {
    console.log("Order status updated:", orderStatus);
  }, [orderStatus]);

  useEffect(() => {
    console.log("Order updated:", order);
  }, [order]);
  return (
    <div className="parent">
      <Order
        orderID={scannedOrderID}
        availableOrders={availableOrders}
        setOrder={setOrder}
        setOrderStatus={setOrderStatus}
        orderStatus={orderStatus}
      />
      <CustomerSearch childToParent={childToParent} />
      <Total
        clear={clearOrder}
        order={order}
        id={
          scannedOrderID ||
          (availableOrders.length > 0 ? availableOrders[0] : null)
        }
      />
    </div>
  );
}

export default DisplayOrder;
