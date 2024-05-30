import React from "react";
import SidebarManager from "../sidebarManager/SidebarManager";
import "./Manager_StaffAccount.scss";
import { Button } from "antd";
function Manager_StaffAccount() {
  return (
    <div className="Manager_StaffAccount">
      <div className="Manager_StaffAccount__sidebar">
        <SidebarManager />
      </div>
      <div className="Manager_StaffAccount__content">
        <h2 className="Manager_StaffAccount__content__title">Thông tin của staff</h2>
        <Button className="Manager_StaffAccount__content__button" type="primary">
          Add staff
        </Button>
      </div>
    </div>
  );
}

export default Manager_StaffAccount;
