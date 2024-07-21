import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  notification,
  Typography,
  Modal,
  Form,
  InputNumber,
} from "antd";
import api from "../../../config/axios";

const { Search } = Input;
const { Text } = Typography;

const ManageInventory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/inventory");
      setData(response.data);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể tải dữ liệu tồn kho",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleImport = (record) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      // Validate form input
      const values = await form.validateFields();
      const quantityToImport = values.quantity;

      // Ensure quantity is positive
      if (quantityToImport <= 0) {
        notification.error({
          message: "Lỗi",
          description: "Số lượng phải lớn hơn 0",
        });
        return;
      }

      // Fetch current quantity
      const response = await api.get(`/api/inventory/${currentRecord.id}`);
      const currentQuantity = response.data.quantity;

      // Calculate new quantity
      const newQuantity = currentQuantity + quantityToImport;

      // Make API call to update the quantity
      await api.patch(
        `/api/inventory/${currentRecord.id}/quantity?quantity=${newQuantity}`
      );

      notification.success({
        message: "Thành công",
        description: `Sản phẩm ${currentRecord.pname} đã được nhập.`,
      });

      // Close the modal and reload data
      setIsModalVisible(false);
      loadData();
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi nhập sản phẩm",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const filteredData = data.filter((item) =>
    item.pname.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img src={text} alt="product" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "pname",
      key: "pname",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => (
        <span style={{ fontWeight: "bold", color: "green" }}>{text}</span>
      ),
    },
    {
      title: "Mức tồn kho tối thiểu",
      dataIndex: "reorderLevel",
      key: "reorderLevel",
    },
    {
      title: "Ngày nhập kho",
      dataIndex: "lastRestocked",
      key: "lastRestocked",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleImport(record)}>
          Nhập sản phẩm
        </Button>
      ),
    },
  ];

  const expandedRowRender = (record) => (
    <div>
      <Text strong>Mã sản phẩm:</Text> {record.productId}
      <br />
      <Text strong>Carat:</Text> {record.carat}
      <br />
      <Text strong>Mã danh mục:</Text> {record.categoryId}
      <br />
      <Text strong>Chi:</Text> {record.chi}
      <br />
      <Text strong>Nhà sản xuất:</Text> {record.manufacturer}
      <br />
      <Text strong>Chi phí sản xuất:</Text> {record.manufactureCost}
      <br />
    </div>
  );

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Tìm kiếm theo tên sản phẩm"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="id"
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => true,
        }}
      />
      <Modal
        title="Nhập sản phẩm"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Nhập"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              { required: true, message: "Vui lòng nhập số lượng!" },
              { type: "number", min: 1, message: "Số lượng phải lớn hơn 0" },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageInventory;
