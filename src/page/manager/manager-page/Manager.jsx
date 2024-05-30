import React, { useEffect } from "react";
import SidebarManager from "../sidebarManager/SidebarManager";
import "./Manager.scss";

function Manager() {
  useEffect(() => {
    document.title = "Manager";
  }, []);
  return (
    <div className="Manager">
      <div className="Manager__sidebar">
        <SidebarManager />
      </div>
      <div className="Manager__content"></div>
    </div>
  );
}

export default Manager;
