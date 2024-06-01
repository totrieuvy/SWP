import React, { useEffect } from "react";
import "./AdminAccountStaff.scss";
import SidebarAdmin from "../sidebarAdmin/SidebarAdmin";
import api from "../../../config/axios";

function AdminAccountStaff() {
  const fetchListOfStaffofAdmin = async () => {
    const response = await api.get("/staff/read");
    console.log(response.data);
  };

  useEffect(() => {
    fetchListOfStaffofAdmin();
    document.title = "Thông tin của staff";
  }, []);
  return (
    <div className="AdminAccountStaff">
      <div className="AdminAccountStaff__sidebar">
        <SidebarAdmin />
      </div>
      <div className="AdminAccountStaff__content">
        <div className="AdminAccountStaff__content__title">
          <h2>Thông tin của staff</h2>
        </div>
      </div>
    </div>
  );
}

export default AdminAccountStaff;
