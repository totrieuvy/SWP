import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import api from "../../../../config/axios";

function ProductBoard() {
  const [data, setData] = useState([]);

  React.useEffect(() => {
    document.title = "Danh sách sản phẩm";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/inventory`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Tên",
      dataIndex: "pname",
      key: "pname",
      sorter: (a, b) => a.pname.localeCompare(b.pname),
    },
    {
      title: "Giá",
      dataIndex: "cost",
      key: "cost",
      sorter: (a, b) => a.cost - b.cost,
    },
    {
      title: "Trạng thái",
      dataIndex: "quantity",
      key: "status",
      render: (quantity) => {
        let color =
          quantity === 0 ? "volcano" : quantity < 20 ? "orange" : "geekblue";
        let text =
          quantity === 0
            ? "Hết hàng"
            : quantity < 20
            ? "Sắp hết hàng"
            : "Còn hàng";
        return (
          <Tag color={color} key={text}>
            {text}
          </Tag>
        );
      },
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      render: (quantity) => (
        <Space>
          {quantity}
          {quantity < 20 && quantity > 0 && (
            <Tag color="orange">Sắp hết hàng</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Loại",
      dataIndex: "metalType",
      key: "metalType",
      sorter: (a, b) => a.metalType.localeCompare(b.metalType),
    },
    {
      title: "Mô tả",
      dataIndex: "pdescription",
      key: "pdescription",
    },
    {
      title: "Đá",
      dataIndex: "gemstoneType",
      key: "gemstoneType",
      sorter: (a, b) => a.gemstoneType.localeCompare(b.gemstoneType),
    },
    {
      title: "Nhà sản xuất",
      dataIndex: "manufacturer",
      key: "manufacturer",
      sorter: (a, b) => a.manufacturer.localeCompare(b.manufacturer),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (imageURL) => (
        <img src={imageURL} alt="product" style={{ width: 50 }} />
      ),
    },
    {
      title: "Carat",
      dataIndex: "carat",
      key: "carat",
      sorter: (a, b) => a.carat - b.carat,
    },
    {
      title: "Chỉ",
      dataIndex: "chi",
      key: "chi",
      sorter: (a, b) => a.chi - b.chi,
    },
  ];

  return (
    <div className="productList">
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default ProductBoard;
