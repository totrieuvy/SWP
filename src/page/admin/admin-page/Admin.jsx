import React, { useEffect } from "react";
import "./Admin.css";
import SidebarAdmin from "../sidebarAdmin/SidebarAdmin";
import Dashboard from "../../../component/utility/dashboard/Dashboard";
import { Outlet } from "react-router-dom";

function Admin() {
  useEffect(() => {
    document.title = "Admin";
  }, []);

  return (
    <div className="Admin">
      <div className="Admin_sidebar">
        {/* <SidebarAdmin /> */}
        <Dashboard />
      </div>

      <div className="Admin_content">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
