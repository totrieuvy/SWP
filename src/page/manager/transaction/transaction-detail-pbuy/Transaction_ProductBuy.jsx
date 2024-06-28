import { Spin, Table } from "antd";
import api from "../../../../config/axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Transaction_ProductBuy() {
  const { orderID } = useParams();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "pbName",
      key: "pbName",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Chất liệu sản phẩm",
      dataIndex: "gemstoneType",
      key: "gemstoneType",
    },
    {
      title: "Giá thu vào",
      dataIndex: "cost",
      key: "cost",
    },
  ];

  const fetchDetailProBuy = async () => {
    try {
      const response = await api.get(`/api/order/get-orderBuy/${orderID}`);
      console.log(response.data);
      setDataSource(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  React.useEffect(() => {
    fetchDetailProBuy();
    document.title = "Chi tiết đơn hàng";
  }, []);

  return (
    <div className="Transaction_ProductBuy">
      {loading ? <Spin size="large" /> : <Table dataSource={dataSource} columns={columns} />}
    </div>
  );
}

export default Transaction_ProductBuy;
