import React, { useEffect, useState } from "react";
import "./ManagerProfile.scss";
import { Table } from "antd";
import api from "../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";

function ManagerProfile() {
  const [dataSource, setDataSource] = useState([]);
  const user = useSelector(selectUser);

  const fetchManagerProfile = async () => {
    try {
      const response = await api.get(`/api/manager/${user.id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching manager profile:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchManagerProfile();
      const dataArray = Array.isArray(data) ? data : [data];
      setDataSource(dataArray);
      console.log(dataArray);
    };

    fetchData();
    document.title = "Thông tin quản lí";
  }, []);

  const columns = [
    {
      title: "Tên",
      dataIndex: "ausername",
      key: "ausername",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <div className="ManagerProfile">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default ManagerProfile;
