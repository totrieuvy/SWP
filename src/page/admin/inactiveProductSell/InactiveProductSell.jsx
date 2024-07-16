import { Image, Table, Tag } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";

function InactiveProductSell() {
  const [data, setData] = useState([]);

  React.useEffect(() => {
    document.title = "Sản phẩm bị xóa";
  }, []);

  const fetchData = async () => {
    const response = await api.get("/api/productSell");
    console.log(response.data);
    const filterFalseData = response.data.filter((data) => data.status === false);
    console.log(filterFalseData);
    setData(filterFalseData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "pname",
      key: "pname",
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "productCode",
      key: "productCode",
    },
    {
      title: "Mô tả",
      dataIndex: "pdescription",
      key: "pdescription",
    },
    {
      title: "Tên thể loại",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Loại đá",
      dataIndex: "gemstoneType",
      key: "gemstoneType",
    },

    {
      title: "Nhà sản xuất",
      dataIndex: "manufacturer",
      key: "manufacturer",
    },
    {
      title: "Giá nhà sản xuất",
      dataIndex: "manufactureCost",
      key: "manufactureCost",
    },
    {
      title: "Giá bán",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Carat",
      dataIndex: "carat",
      key: "carat",
    },
    {
      title: "Chỉ",
      dataIndex: "chi",
      key: "chi",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="product" style={{ width: 80 }} />,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status ? "geekblue" : "volcano";
        let text = status ? "Còn hàng" : "hết hàng";
        return (
          <Tag color={color} key={text}>
            {text}
          </Tag>
        );
      },
      sorter: (a, b) => (a.status === b.status ? 0 : a.status ? -1 : 1),
    },
  ];
  return (
    <div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default InactiveProductSell;
