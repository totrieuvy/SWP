import React, { useEffect, useState } from "react";
import SaleViewOrderMenu from "./Component/SaleViewOrderMenu";
import SaleProductMenu from "./Component/SaleProductMenu";
import "./style.css";
import ChooseCategory from "./Component/ChooseCategory";
function MainCreateOrder() {
  const [category, setCategory] = useState("");
  const [currOrder, setOrder] = useState([]);
  const getCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };
  useEffect(() => {}, [category]);
  const getOrder = (product) => {
    setOrder((prevOrder) => {
      const existingProduct = prevOrder.find(
        (item) => item.productID === product.productID
      );
      if (existingProduct) {
        return prevOrder.map((item) =>
          item.productID === product.productID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevOrder, { ...product, quantity: 1 }];
      }
    });
  };
  return (
    <div className="saleCreateOrderContainer">
      <SaleViewOrderMenu closeOrder={setOrder} currentOrder={currOrder} />
      <div id="saleProductDivider">
        <ChooseCategory setCategory={getCategory} />
        <SaleProductMenu setOrder={getOrder} category={category} />
      </div>
    </div>
  );
}

export default MainCreateOrder;
