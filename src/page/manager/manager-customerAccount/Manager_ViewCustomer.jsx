import SideBar from "../sidebarManager/SidebarManager";
import React, { useEffect } from "react";
import "./Manager_ViewCustomer.scss";
import api from "../../../config/axios";

function Manager_ViewCustomer() {
  const fetchCustomer = async () => {
    const response = await api.get("/customer/list-all");
    console.log(response);
  };
  useEffect(() => {
    fetchCustomer();
    document.title = "Thông tin khách hàng";
  }, []);
  return (
    <div className="Manager_ViewCustomer">
      <div className="Manager_ViewCustomer__sidebar">
        <SideBar />
      </div>
      <div className="Manager_ViewCustomer__content"></div>
    </div>
  );
}

export default Manager_ViewCustomer;
