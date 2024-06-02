import { Table, Button, Space } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";

function CustomerBoard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("customer/list-all");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on component mount
  const handleUpdate = (record) => {
    // Implement update logic here
    console.log("Update record:", record);
  };

  const handleDelete = (record) => {
    // Implement delete logic here
    console.log("Delete record:", record);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      ellipsis: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ellipsis: true,
    },
    {
      title: "Số điểm",
      dataIndex: "pointAmount",
      key: "pointAmount",
      sorter: (a, b) => a.pointAmount - b.pointAmount,
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      ellipsis: true,
      key: "status",
      render: (status) => (status ? "Hoạt động" : "Không hoạt động"),
      sorter: (a, b) => {
        const statusA = a.status ? "Hoạt động" : "Không hoạt động";
        const statusB = b.status ? "Hoạt động" : "Không hoạt động";
        return statusA.localeCompare(statusB);
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Chỉnh
          </Button>
          <Button danger onClick={() => handleDelete(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div id="CustomerContainer">
        <p id="CustomerTitle">Tài khoản khách hàng</p>
        <Table dataSource={data} columns={columns} rowKey="id" />
      </div>
    </>
  );
}

export default CustomerBoard;
