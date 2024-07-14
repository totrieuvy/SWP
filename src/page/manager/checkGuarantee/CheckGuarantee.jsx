import { Button, Input, Table } from "antd";
import api from "../../../config/axios";
import React, { useState } from "react";

function CheckGuarantee() {
  const [inputValue, setInputValue] = useState("");
  const [dataSource, setdataSource] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (inputValue !== "") {
      api
        .get(`/api/productSell/by-guarantee-id?guaranteeId=${inputValue}`)
        .then((response) => {
          console.log(inputValue);
          const data = Array.isArray(response.data) ? response.data : [response.data];
          console.log(data);
          setdataSource(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "pname",
      key: "pname",
      render: (pname) => (pname ? pname : "Không có dữ liệu"),
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "productCode",
      key: "productCode",
      render: (productCode) => (productCode ? productCode : "Không có dữ liệu"),
    },
    {
      title: "Mô tả",
      dataIndex: "pdescription",
      key: "pdescription",
      render: (pdescription) => (pdescription ? pdescription : "Không có dữ liệu"),
    },
    {
      title: "Nhà sản xuất",
      dataIndex: "manufacturer",
      key: "manufacturer",
      render: (manufacturer) => (manufacturer ? manufacturer : "Không có dữ liệu"),
    },
    {
      title: "Giá nhà sản xuất",
      dataIndex: "manufactureCost",
      key: "manufactureCost",
      render: (manufactureCost) => (manufactureCost ? manufactureCost : "Không có dữ liệu"),
    },
    {
      title: "Tên thể loại",
      dataIndex: "category_name",
      key: "category_name",
      render: (category_name) => (category_name ? category_name : "Không có dữ liệu"),
    },
    {
      title: "Loại thể loại",
      dataIndex: "metalType",
      key: "metalType",
      render: (metalType) => (metalType ? metalType : "Không có dữ liệu"),
    },
    {
      title: "Carat",
      dataIndex: "carat",
      key: "carat",
      render: (carat) => (carat ? carat : "Không có dữ liệu"),
    },
    {
      title: "Chỉ",
      dataIndex: "chi",
      key: "chi",
      render: (chi) => (chi ? chi : "Không có dữ liệu"),
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "cost",
      key: "cost",
      render: (cost) => (cost ? cost : "Không có dữ liệu"),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="product" style={{ width: 100 }} />,
    },
  ];
  return (
    <div>
      <Input
        placeholder="Nhập mã bảo hành"
        value={inputValue}
        onChange={handleInputChange}
        style={{ width: 200, marginRight: 10 }}
      />
      <Button type="primary" onClick={handleButtonClick}>
        Xem
      </Button>
      {dataSource != null ? <Table dataSource={dataSource} columns={columns} /> : "Không có sản phẩm"}
    </div>
  );
}

export default CheckGuarantee;
