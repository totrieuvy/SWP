import { Button, Input, Table } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";

function CheckGuarantee() {
  const [inputValue, setInputValue] = useState(" ");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
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
  ];

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
    </div>
  );
}

export default CheckGuarantee;
