import { Table } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";

function StaffProfile() {
  useEffect(() => {
    document.title = "Hồ sơ nhân viên";
  }, []);
  return <div className="StaffProfile"></div>;
}

export default StaffProfile;
