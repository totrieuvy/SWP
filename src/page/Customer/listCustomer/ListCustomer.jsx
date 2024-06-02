import NavBar from "../../defaultComponent/navBar";
import SideBar from "../../defaultComponent/sideBar";
import React from "react";
import CustomerBoard from "./Component/CustomerBoard";
import "./Component/style.css";
function ListCustomer() {
  return (
    <>
      <NavBar />
      <div id="Container">
        <SideBar />
        <CustomerBoard />
      </div>
    </>
  );
}

export default ListCustomer;
