import React, { useEffect } from "react";
import "./ManagerProfile.scss";
import SidebarManager from "../sidebarManager/SidebarManager";
import api from "../../../config/axios";
import { useParams } from "react-router-dom";
import { Table } from "antd";

function ManagerProfile() {


  const fetchProfileManager = async () => {
    const response = await api.get("/manager/readbyid");
    console.log(response);
  };

  useEffect(() => {
    fetchProfileManager();
    document.title = "Thông tin quản lí";
  }, []);
  return (
    <div className="ManagerProfile">
      <div className="ManagerProfile__sidebar">
        <SidebarManager />
      </div>
      <div className="ManagerProfile__content">
        <div className="ManagerProfile__content__title">
          <h2>Thông tin của bạn</h2>
        </div>
        <div className="ManagerProfile__content__nd"></div>
      </div>
    </div>
  );
}

export default ManagerProfile;
