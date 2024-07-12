import NavBar from "../../defaultComponent/navBar";
import SideBar from "../../defaultComponent/sideBar";
import React from "react";
import CustomerBoard from "./Component/CustomerBoard";
import "./Component/style.css";
function ListCustomer() {
  return (
    <>
      <div id="Container">
        <CustomerBoard />
      </div>
    </>
  );
}

export default ListCustomer;
