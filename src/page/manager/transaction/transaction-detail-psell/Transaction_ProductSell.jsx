import { Image, Spin, Table } from "antd";
import api from "../../../../config/axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Transaction_ProductSell() {
  const { orderID } = useParams();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image} alt="product" width={80} />,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
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
      title: "Loại sản phẩm",
      dataIndex: "gemstoneType",
      key: "gemstoneType",
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
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      dataIndex: "cost",
      key: "cost",
    },
  ];

  const fetchDetailProSell = async () => {
    try {
      const response = await api.get(`/api/order/${orderID}`);
      console.log(response.data);
      setDataSource(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  React.useEffect(() => {
    fetchDetailProSell();
    document.title = "Chi tiết đơn hàng";
  }, []);
  return (
    <div className="Transaction_ProductSell">
      {loading ? <Spin size="large" /> : <Table dataSource={dataSource} columns={columns} />}
    </div>
  );
}

export default Transaction_ProductSell;
