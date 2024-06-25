import { Table } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";

function StaffProfile() {
  const [dataSource, setDataSource] = useState([]);
  const user = useSelector(selectUser);
  const fetchStaffProfile = async () => {
    try {
      const response = await api.get(`/api/staff-accounts/${user.id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching staff profile:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStaffProfile();
      const dataArray = Array.isArray(data) ? data : [data];
      setDataSource(dataArray);
      console.log(dataArray);
    };

    fetchData();
    document.title = "Thông tin nhân viên";
  }, []);

  const columns = [
    {
      title: "Tên",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Lương",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];
  return (
    <div className="StaffProfile">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default StaffProfile;
