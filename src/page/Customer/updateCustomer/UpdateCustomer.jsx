import NavBar from "../../defaultComponent/navBar";
import SideBar from "../../defaultComponent/sideBar";
import React from "react";
import { useLocation } from "react-router-dom";
import CustomerUpdateForm from "./Component/CustomerUpdateForm";
import "./Component/style.css";
function UpdateCustomer() {
  const data = useLocation().state;

  return (
    <>
      <NavBar />
      <div id="CustomerUpdateContainer">
        <SideBar />
        <CustomerUpdateForm
          cid={data.id}
          email={data.email}
          phoneNumber={data.phoneNumber}
          pointAmount={data.pointAmount}
          status={data.status}
        />
      </div>
    </>
  );
}

export default UpdateCustomer;
