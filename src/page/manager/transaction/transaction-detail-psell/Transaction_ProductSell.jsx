import React from "react";
import { useParams } from "react-router-dom";

function Transaction_ProductSell() {
  const { orderID } = useParams();
  return <div>{orderID}</div>;
}

export default Transaction_ProductSell;
