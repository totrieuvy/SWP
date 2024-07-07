import React, { useEffect, useState } from "react";
import ViewProductBuyOrder from "./Component/ViewProductBuyOrder";
import CreateProductBuyToAdd from "./Component/CreateProductBuyToAdd";
import "./style.css";

function ProductBuy() {
  const [order, setOrder] = useState([]);
  const addOrder = (orderData) => {
    // Define the new JSON object

    // Append the new object to the state array
    setOrder((prevArray) => [...prevArray, orderData]);
  };

  React.useEffect(() => {
    document.title = "Mua lại";
  }, []);

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <div className="saleProductBuy">
      <ViewProductBuyOrder data={order} />
      <CreateProductBuyToAdd appendOrder={addOrder} />
    </div>
  );
}

export default ProductBuy;
