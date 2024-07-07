import { Button, Popconfirm, Table, notification } from "antd";
import api from "../../../config/axios";
import React from "react";

function AdminCategory() {
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
    await api.delete(`/api/category/${id}`);

    const listAfterDelete = dataSource.filter((category) => category.id !== id);

    setDataSource(listAfterDelete);

    notification.success({
      message: "Thành công",
      description: "Xóa thể loại thành công",
    });
  };
  const fetchCategory = async () => {
    const response = await api.get("/api/category");
    console.log(response.data);
    setDataSource(response.data);
  };
  React.useEffect(() => {
    document.title = "Thể loại sản phẩm";
    fetchCategory();
  }, []);
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default AdminCategory;
