import React, { useEffect } from "react";
import "./AdminAccount.scss";
import SidebarAdmin from "../sidebarAdmin/SidebarAdmin";
function AdminAccount() {
  useEffect(() => {
    document.title = "Tài khoản admin";
  }, []);
  return (
    <div className="AdminAccount">
      <div className="AdminAccount_sidebar">
        <SidebarAdmin />
      </div>
      <div className="AdminAccount_content">
        <h2 className="AdminAccount_content_title">Thông tin của admin</h2>
      </div>
    </div>
  );
}

export default AdminAccount;
