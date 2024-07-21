import { Button, Input, Modal, Form, InputNumber, Table, message, Popconfirm } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";

function CheckGuarantee() {
  const [inputValue, setInputValue] = useState(" ");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    document.title = "Kiểm tra chính sách";
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (inputValue !== "") {
      setLoading(true);
      api
        .get(`/api/productSell/search-product-by-guarantee?search=${inputValue}`)
        .then((response) => {
          const data = Array.isArray(response.data) ? response.data : [response.data];
          console.log(data);
          const responseWithStatusTrue = data.filter((item) => item.status === true);
          setDataSource(responseWithStatusTrue);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    handleButtonClick();
  }, []);

  const showModal = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({
      policyType: record.policyType,
      coverage: record.coverage,
      warrantyPeriod: record.warrantyPeriodMonth,
      pk_guaranteeID: record.guaranteeID,
      fk_productID: record.productSell.productID,
    });
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    showModal(record);
  };

  const handleUpdate = (values) => {
    console.log(values);
    api
      .put(`/api/guarantee/update-details`, values)
      .then((response) => {
        console.log("Update successful:", response.data);
        setIsModalVisible(false);
        handleButtonClick();
        message.success("Cập nhật bảo hành thành công");
      })

      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: ["productSell", "pname"],
      key: "productSell.pname",
    },
    {
      title: "Bảo hiểm",
      dataIndex: "coverage",
      key: "coverage",
    },
    {
      title: "Loại chính sách",
      dataIndex: "policyType",
      key: "policyType",
    },
    {
      title: "Sự đảm bảo theo tháng",
      dataIndex: "warrantyPeriodMonth",
      key: "warrantyPeriodMonth",
    },
    {
      title: "Carat",
      dataIndex: ["productSell", "carat"],
      key: "productSell.carat",
    },
    {
      title: "Chỉ",
      dataIndex: ["productSell", "chi"],
      key: "productSell.chi",
    },
    {
      title: "Giá sản phẩm",
      dataIndex: ["productSell", "cost"],
      key: "productSell.cost",
    },
    {
      title: "Loại đá",
      dataIndex: ["productSell", "gemstoneType"],
      key: "productSell.gemstoneType",
    },
    {
      title: "Loại thể loại",
      dataIndex: ["productSell", "metalType"],
      key: "productSell.metalType",
    },
    {
      title: "Hình ảnh",
      dataIndex: ["productSell", "image"],
      key: "productSell.image",
      render: (image) => <img src={image} alt="Product" style={{ width: 50 }} />,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>{" "}
          <Popconfirm title="Xóa thể loại" onConfirm={() => handleDelete(record.id)} okText="Đồng ý" cancelText="Không">
            <Button danger>Xóa</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleDelete = async (id) => {
    await api.delete(`/api/category/${id}`);

    const listAfterDelete = dataSource.filter((category) => category.id !== id);
    setDataSource(listAfterDelete);

    message.success("Xóa bảo hành thành công");
  };

  return (
    <div>
      <Input
        placeholder="Nhập từ khóa tìm kiếm"
        value={inputValue}
        onChange={handleInputChange}
        style={{ width: 200, marginRight: 10 }}
      />
      <Button type="primary" onClick={handleButtonClick} loading={loading}>
        Tìm kiếm
      </Button>
      <Table dataSource={dataSource} columns={columns} rowKey="guaranteeID" />
      <Modal
        title="Cập nhật bảo hành"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Cập nhật
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleUpdate}>
          <Form.Item
            name="policyType"
            label="Loại chính sách"
            rules={[{ required: true, message: "Vui lòng nhập loại chính sách!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="coverage" label="Bảo hiểm" rules={[{ required: true, message: "Vui lòng nhập bảo hiểm!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="warrantyPeriod"
            label="Sự đảm bảo (tháng)"
            rules={[{ required: true, message: "Vui lòng nhập sự đảm bảo và phải là số lớn hơn 0!" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="pk_guaranteeID" style={{ display: "none" }}>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="fk_productID" style={{ display: "none" }}>
            <Input type="hidden" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CheckGuarantee;
