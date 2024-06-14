import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import api from "../../../config/axios";

function ProductBoard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/productSell`);
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
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Giá",
      dataIndex: "cost",
      key: "cost",
      sorter: (a, b) => a.cost - b.cost,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status ? "geekblue" : "volcano";
        let text = status ? "IN STOCK" : "OUT OF STOCK";
        return (
          <Tag color={color} key={text}>
            {text}
          </Tag>
        );
      },
      sorter: (a, b) => (a.status === b.status ? 0 : a.status ? -1 : 1),
    },
    {
      title: "Loại",
      dataIndex: "metalType",
      key: "metalType",
      sorter: (a, b) => a.metalType.localeCompare(b.metalType),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
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
