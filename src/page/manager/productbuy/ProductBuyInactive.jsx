import { Table } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";

function ProductBuyInactive() {
  const [data, setData] = useState([]);

  React.useEffect(() => {
    document.title = "Sản phẩm mua được xóa";
  }, []);

  const fetchData = async () => {
    const response = await api.get("/api/productBuy");
    console.log(response.data);
    const responseFalse = response.data.filter((data) => data.pbStatus === false);
    setData(responseFalse);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "pbName",
      key: "pbName",
    },
    {
      title: "Tên thể loại",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Loại kim loại",
      dataIndex: "metalType",
      key: "metalType",
    },
    {
      title: "Chỉ",
      dataIndex: "chi",
      key: "chi",
    },
    {
      title: "Carat",
      dataIndex: "carat",
      key: "carat",
    },
    {
      title: "Giá",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="product" style={{ width: 50 }} />,
    },
  ];
  return (
    <div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default ProductBuyInactive;
