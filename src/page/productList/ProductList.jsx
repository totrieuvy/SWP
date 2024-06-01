// @ts-nocheck
import React from "react";

import "./style.css";
import NavBar from "./component/NavBar";
import SideBar from "./component/SideBar";
import ProductBoard from "./component/ProductBoard";

function ProductList() {
  return (
    <>
      <NavBar />
      <div id="sideBoardDivider">
        <SideBar />
        <ProductBoard />
      </div>
    </>
  );
}

export default ProductList;
