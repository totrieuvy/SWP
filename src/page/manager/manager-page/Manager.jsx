import React, { useEffect } from "react";
import SidebarManager from "../sidebarManager/SidebarManager";
import "./Manager.scss";
import Dashboard from "../../dashboard/Dashboard";

function Manager() {
  useEffect(() => {
    document.title = "Manager";
  }, []);
  return (
    <div className="Manager">
      <div className="Manager__sidebar">
        {/* <SidebarManager /> */}
        <Dashboard />
      </div>
      <div className="Manager__content"></div>
    </div>
  );
}

export default Manager;
