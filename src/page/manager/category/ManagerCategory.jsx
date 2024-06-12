import { Button, Popconfirm, Table, notification } from "antd";
import api from "../../../config/axios";
import React from "react";

function ManagerCategory() {
  const [dataSource, setDataSource] = React.useState([]);
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Xóa",
      dataIndex: "staffID",
      key: "staffID",
      render: (id) => (
        <Popconfirm
          title="Xóa nhân viên"
          description="Bạn có chắc muốn xóa nhân viên không?"
          onConfirm={() => handleDeleteCategory(id)}
          okText="Đồng ý"
          cancelText="Không"
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];
  const handleDeleteCategory = async (id) => {
    await api.delete(`/api/category/delete/${id}`);

    const listAfterDelete = dataSource.filter((category) => category.id !== id);

    setDataSource(listAfterDelete);

    notification.success({
      message: "Thành công",
      description: "Xóa nhân viên thành công",
    });
  };
  const fetchCategory = async () => {
    const response = await api.get("/api/category/readall");
    console.log(response.data);
    setDataSource(response.data);
  };
  React.useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <div className="ManagerCategory">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default ManagerCategory;
