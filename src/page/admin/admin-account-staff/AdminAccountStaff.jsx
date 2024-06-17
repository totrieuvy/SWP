import React, { useEffect, useState } from "react";
import "./AdminAccountStaff.scss";
import api from "../../../config/axios";
import { Button, Popconfirm, Table, notification } from "antd";
// import { selectUser } from "redux/features/counterSlice";

function AdminAccountStaff() {
  const [dataSource, setDataSource] = useState([]);
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
      dataIndex: "staffID",
      key: "staffID",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Xóa",
      dataIndex: "staffID",
      key: "staffID",
      render: (staffID) => (
        <Popconfirm
          title="Xóa nhân viên"
          description="Bạn có chắc muốn xóa nhân viên không?"
          onConfirm={() => handleDeleteStaff(staffID)}
          okText="Đồng ý"
          cancelText="Không"
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];
  const handleDeleteStaff = async (staffID) => {
    const response = await api.delete(`/api/staff-accounts/${staffID}`);

    const filterAccountAfterDelete = dataSource.filter((data) => data.staffID != staffID);
    setDataSource(filterAccountAfterDelete);
    notification.success({
      message: "Thành công",
      description: "Xóa nhân viênthành công",
    });
  };
  const fetchListOfStaffofAdmin = async () => {
    const response = await api.get("/api/staff-accounts");
    console.log(response.data);
    const responseWithStatusTrue = response.data.filter((item) => item.status === 1);
    setDataSource(responseWithStatusTrue);
  };

  useEffect(() => {
    fetchListOfStaffofAdmin();
    document.title = "Thông tin của staff";
  }, []);
  return (
    <div className="AdminAccountStaff">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default AdminAccountStaff;
