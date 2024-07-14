import React, { useEffect, useState } from "react";
import Order from "./Component/Order";
import Total from "./Component/Total";
import "./Component/style.css";
import CustomerSearch from "./Component/CustomerSearch";
import WebSocket from "../../../config/WebSocket";

function DisplayOrder() {
  const [data, setData] = useState("");
  const [order, setOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState("NotClear");
  const [availableOrders, setAvailableOrders] = useState([]);
  const [scannedOrderID, setScannedOrderID] = useState("");
  const [claimedOrderId, setClaimedOrderId] = useState(null);
  const userID = localStorage.getItem("userID");
  const [currentOrderID, setCurrentOrderID] = useState(null);
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
        if (!currentOrderID) {
          console.log(orderId);
          setCurrentOrderID(orderId);
        }
      },
      (response) => {
        if (response.success) {
          setClaimedOrderId(response.orderId);
          setCurrentOrderID(response.orderId);
          setAvailableOrders((prev) =>
            prev.filter((id) => id !== response.orderId)
          );
        } else {
          console.log(`Failed to claim order: ${response.message}`);
        }
      }
    );
    // Clean up WebSocket connection
    return () => {
      WebSocket.disconnect();
    };
  }, []);
  const claimOrder = (orderId) => {
    WebSocket.claimOrder(orderId);
  };
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
      />
    </div>
  );
}

export default DisplayOrder;
