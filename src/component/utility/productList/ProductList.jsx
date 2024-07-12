// @ts-nocheck
import React from "react";

import "./style.css";
import NavBar from "../defaultComponent/navBar";
import SideBar from "../defaultComponent/sideBar";
import ProductBoard from "./component/productBoard";

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
