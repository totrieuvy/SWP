import { Table } from "antd";
import React from "react";
import api from "../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";

function AdminProfile() {
  const [dataSource, setDataSource] = React.useState([]);
  const user = useSelector(selectUser);
  const fetchAdminProfile = async () => {
    try {
      const response = await api.get(`/api/admins/${user.id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching manager profile:", error);
      return [];
    }
  };
  const columns = [
    {
      title: "Tên",
      dataIndex: "username",
      key: "username",
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
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAdminProfile();
      const dataArray = Array.isArray(data) ? data : [data];
      setDataSource(dataArray);
      console.log(dataArray);
    };

    fetchData();
    document.title = "Thông tin quản lí";
  }, []);
  return (
    <div className="AdminProfile">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default AdminProfile;
