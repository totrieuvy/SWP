import { Button, Popconfirm, Table, notification, Modal, Form, Input } from "antd";
import api from "../../../config/axios";
import React, { useState } from "react";

function AdminCategory() {
  const [dataSource, setDataSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

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
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>{" "}
          {/* Space for better alignment */}
          <Popconfirm
            title="Xóa thể loại"
            onConfirm={() => handleDeleteCategory(record.id)}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditingCategory(record);
    setModalVisible(true);
  };

  const handleDeleteCategory = async (id) => {
    await api.delete(`/api/category/${id}`);

    const listAfterDelete = dataSource.filter((category) => category.id !== id);
    setDataSource(listAfterDelete);

    notification.success({
      message: "Thành công",
      description: "Xóa thể loại thành công",
    });
  };

  const handleUpdateCategory = async (values) => {
    const { name, description } = values;
    await api.put(`/api/category/${editingCategory.id}`, {
      name,
      description,
    });

    // Update the local data source
    const updatedDataSource = dataSource.map((category) =>
      category.id === editingCategory.id ? { ...category, name, description } : category
    );
    setDataSource(updatedDataSource);
    setModalVisible(false);

    notification.success({
      message: "Thành công",
      description: "Cập nhật thể loại thành công",
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingCategory(null);
  };

  const showModal = () => {
    return (
      <Modal title="Cập nhật thể loại" visible={modalVisible} onCancel={handleCancel} footer={null}>
        <Form
          initialValues={{
            name: editingCategory?.name,
            description: editingCategory?.description,
          }}
          onFinish={handleUpdateCategory}
        >
          <Form.Item
            label="Tên loại sản phẩm"
            name="name"
            rules={[
              { required: true, message: "Hãy nhập tên loại sản phẩm!" },
              {
                validator: (_, value) =>
                  value && /\d/.test(value) ? Promise.reject(new Error("Không được chứa số!")) : Promise.resolve(),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả!" },
              {
                validator: (_, value) =>
                  value && value.split(" ").length <= 5
                    ? Promise.reject(new Error("Mô tả phải nhiều hơn 5 từ!"))
                    : Promise.resolve(),
              },
              {
                validator: (_, value) =>
                  value && /\d/.test(value) ? Promise.reject(new Error("Không được chứa số!")) : Promise.resolve(),
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const fetchCategory = async () => {
    const response = await api.get("/api/category");
    setDataSource(response.data);
  };

  React.useEffect(() => {
    document.title = "Thể loại sản phẩm";
    fetchCategory();
  }, []);

  return (
    <div className="ManagerCategory">
      <Table dataSource={dataSource} columns={columns} />
      {modalVisible && showModal()}
    </div>
  );
}

export default AdminCategory;
