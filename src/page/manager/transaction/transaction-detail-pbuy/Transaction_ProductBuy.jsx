import React from "react";
import { useParams } from "react-router-dom";

function Transaction_ProductBuy() {
  const { orderID } = useParams();
  return <div>{orderID}</div>;
}

export default Transaction_ProductBuy;
