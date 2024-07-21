import { Button, Popconfirm, Table, notification, Modal, Form, Input } from "antd";
import api from "../../../config/axios";
import React, { useState, useEffect } from "react";

function ManagerCategory() {
  const [dataSource, setDataSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

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

  const handleAddCancel = () => {
    setAddModalVisible(false);
  };

  const handleAddCategory = async (values) => {
    const { name, description } = values;
    const response = await api.post(`/api/category`, {
      name,
      description,
    });

    setDataSource([...dataSource, response.data]);
    setAddModalVisible(false);

    notification.success({
      message: "Thành công",
      description: "Thêm thể loại thành công",
    });
  };

  const showModal = () => (
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

  const showAddModal = () => (
    <Modal title="Thêm thể loại" visible={addModalVisible} onCancel={handleAddCancel} footer={null}>
      <Form onFinish={handleAddCategory}>
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
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );

  const fetchCategory = async () => {
    const response = await api.get("/api/category");
    setDataSource(response.data);
  };

  useEffect(() => {
    document.title = "Thể loại sản phẩm";
    fetchCategory();
  }, []);

  return (
    <div className="ManagerCategory">
      <Button type="primary" onClick={() => setAddModalVisible(true)}>
        Thêm thể loại
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      {modalVisible && showModal()}
      {addModalVisible && showAddModal()}
    </div>
  );
}

export default ManagerCategory;
