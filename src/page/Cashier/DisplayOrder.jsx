import React, { useState } from "react";
import Order from "./Component/Order";
import Total from "./Component/Total";
import "./Component/style.css";
import CustomerSearch from "./Component/CustomerSearch";
function DisplayOrder() {
  const [data, setData] = useState("");
  const [order, setOrder] = useState([]);
  const childToParent = (childdata) => {
    setData(childdata);
  };

  return (
    <div className="parent">
      <Order orderID={data} setOrder={setOrder} />
      <CustomerSearch childToParent={childToParent} />
      <Total order={order} id={data} />
    </div>
  );
}

export default DisplayOrder;
