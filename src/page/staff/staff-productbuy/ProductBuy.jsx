import React, { useEffect, useState } from "react";
import ViewProductBuyOrder from "./Component/ViewProductBuyOrder";
import CreateProductBuyToAdd from "./Component/CreateProductBuyToAdd";
import "./style.css";
import WebSocket from "../../../config/WebSocket";

function ProductBuy() {
  const [order, setOrder] = useState([]);

  const addOrder = (orderData) => {
    // Append the new object to the state array
    setOrder((prevArray) => [...prevArray, orderData]);
  };

  useEffect(() => {
    const handleAppraisedProduct = (appraisedProduct) => {
      setOrder((prevData) => {
        const existingProduct = prevData.find(
          (product) => product.productBuyID === appraisedProduct.productBuyID
        );
        if (existingProduct) {
          // Update existing product
          return prevData.map((product) =>
            product.productBuyID === appraisedProduct.productBuyID
              ? appraisedProduct
              : product
          );
        } else {
          // Add new product
          return [...prevData, appraisedProduct];
        }
      });
    };

    const connectWebSocket = () => {
      WebSocket.connect(null, null, null, null, handleAppraisedProduct);
      WebSocket.subscribeToAppraisedProducts(handleAppraisedProduct);
    };

    // Initial connection
    connectWebSocket();
    const reconnectInterval = setInterval(() => {
      if (!WebSocket.connected) {
        connectWebSocket();
      }
    }, 5000); // Reconnect every 5 seconds if disconnected

    return () => {
      // Clean up on component unmount
      clearInterval(reconnectInterval);
      WebSocket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    document.title = "Mua lại";
  }, []);

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <div className="saleProductBuy">
      <ViewProductBuyOrder data={order} setData={setOrder} />
      <CreateProductBuyToAdd appendOrder={addOrder} />
    </div>
  );
}

export default ProductBuy;
