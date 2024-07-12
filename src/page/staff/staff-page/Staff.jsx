import React, { useEffect } from "react";
import "./Staff.scss";
import Dashboard from "../../../component/utility/dashboard/Dashboard";
import { Outlet } from "react-router-dom";

function Staff() {
  useEffect(() => {
    document.title = "Nhân viên";
  }, []);
  return (
    <div className="Staff">
      <div className="Staff__sidebar">
        {/* <SidebarStaff /> */}
        <Dashboard />
      </div>
      <div className="Staff__content">
        <Outlet />
      </div>
    </div>
  );
}

export default Staff;
