import React, { useEffect } from "react";
import "./Admin.css";
import SidebarAdmin from "../sidebarAdmin/SidebarAdmin";

function Admin() {
  useEffect(() => {
    document.title = "Admin";
  }, []);

  return (
    <div className="Admin">
      <div className="Admin_sidebar">
        <SidebarAdmin />
      </div>

      <div className="Admin_content"></div>
    </div>
  );
}

export default Admin;
