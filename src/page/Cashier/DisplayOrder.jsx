import React, { useState } from "react";
import Order from "./Component/Order";
import Total from "./Component/Total";
import "./Component/style.css";
import CustomerSearch from "./Component/CustomerSearch";
function DisplayOrder() {
  const [data, setData] = useState("");
  const [order, setOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState("NotClear");

  const childToParent = (childdata) => {
    setData(childdata);
  };
  const clearOrder = () => {
    setOrder([]);
    setOrderStatus("Clear");
  };

  return (
    <div className="parent">
      <Order
        orderID={data}
        setOrder={setOrder}
        setOrderStatus={setOrderStatus}
        orderStatus={orderStatus}
      />
      <CustomerSearch childToParent={childToParent} />
      <Total clear={clearOrder} order={order} id={data} />
    </div>
  );
}

export default DisplayOrder;
