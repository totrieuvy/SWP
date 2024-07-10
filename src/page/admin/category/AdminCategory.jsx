import { Button, Form, Input, Modal, Popconfirm, Table, notification } from "antd";
import api from "../../../config/axios";
import React, { useState } from "react";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";

function AdminCategory() {
  const [dataSource, setDataSource] = React.useState([]);
  const [formVariable] = useForm();
  const [visible, setVisible] = useState(false);
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
      dataIndex: "id",
      key: "id",
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
    console.log(id);
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

  const handleFinish = async (values) => {
    console.log(values);

    const response = await api.post("/api/category", values);
    console.log(response.data);

    setDataSource([...dataSource, values]);

    formVariable.resetFields();
    handleCloseModal();

    notification.success({
      message: "Thành công",
      description: "Thêm loại sản phẩm thành công",
    });
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handSubmit = () => {
    formVariable.submit();
  };

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Thêm loại sản phẩm
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal title="Thêm loại sản phẩm" open={visible} onCancel={handleCloseModal} onOk={handSubmit}>
        <Form
          form={formVariable}
          labelCol={{
            span: 24,
          }}
          onFinish={handleFinish}
        >
          <Form.Item
            label={"Tên loại sản phẩm"}
            name={"name"}
            rules={[
              {
                required: true,
                message: "Hãy nhập tên loại sản phẩm!",
              },
              {
                validator: (_, value) =>
                  value && /\d/.test(value) ? Promise.reject(new Error("Không được chứa số!")) : Promise.resolve(),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Mô tả loại sản phẩm"}
            name={"description"}
            rules={[
              {
                required: true,
                message: "Hãy nhập mô tả loại sản phẩm!",
              },
              {
                validator: (_, value) =>
                  value && value.split(" ").length <= 5
                    ? Promise.reject(new Error("Mô tả phải nhiều hơn 5 từ!"))
                    : Promise.resolve(),
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminCategory;
