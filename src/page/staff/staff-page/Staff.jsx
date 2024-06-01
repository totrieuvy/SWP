import React from "react";
import "./Staff.scss";
import SidebarStaff from "../sidebarStaff/SidebarStaff";

function Staff() {
  return (
    <div className="Staff">
      <div className="Staff__sidebar">
        <SidebarStaff />
      </div>
      <div className="Staff__content">
        
      </div>
    </div>
  );
}

export default Staff;
