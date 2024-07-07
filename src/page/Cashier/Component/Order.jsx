import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { Table, Select } from "antd";

const { Option } = Select;

const columns = (discountCodes, handleDiscountChange) => [
  {
    title: "Giá",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
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
    title: "Giá",
    dataIndex: "cost",
    key: "cost",
  },
  {
    title: "Loại đá quý",
    dataIndex: "gemstoneType",
    key: "gemstoneType",
  },
  {
    title: "Nhà sản xuất",
    dataIndex: "manufacturer",
    key: "manufacturer",
  },
  {
    title: "Giảm giá",
    dataIndex: "promotion_id",
    key: "promotion_id",
    render: (text, record) => (
      <Select
        defaultValue={text || undefined}
        onChange={(value) => handleDiscountChange(record.productID, value)}
        style={{ width: 120 }}
      >
        {discountCodes.map((code) => (
          <Option key={code.promotionID} value={code.promotionID}>
            {code.code}
          </Option>
        ))}
      </Select>
    ),
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
];

function Order({ orderID, setOrder, orderStatus, setOrderStatus }) {
  const [data, setData] = useState([]);
  const [discountCodes, setDiscountCodes] = useState([]);

  React.useEffect(() => {
    document.title = "Xác nhận đơn hàng";
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/api/order/${orderID}`);
        // Initialize discount field for each product
        const orderData = response.data.map((product) => ({
          ...product,
          promotion_id: product.promotion_id && product.promotion_id.length > 0 ? product.promotion_id[0] : [],
        }));
        setData(orderData);
        setOrder(orderData);
      } catch (error) {
        console.error("Error fetching the order", error);
      }
    };
    const fetchDiscountCodes = async () => {
      try {
        const response = await api.get("/api/promotion/product-sell-ids");
        setDiscountCodes(response.data);
      } catch (error) {
        console.error("Error fetching discount codes", error);
      }
    };

    fetchOrder();
    fetchDiscountCodes();
  }, [orderID]);

  useEffect(() => {
    if (orderStatus === "Clear") {
      setData([]);
      setOrderStatus("NotClear");
    }
  }, [orderStatus]);

  const handleDiscountChange = (productID, value) => {
    const updatedData = data.map((item) => (item.productID === productID ? { ...item, promotion_id: [value] } : item));
    setData(updatedData);
    setOrder(updatedData);
  };

  return (
    <div className="bill">
      <Table columns={columns(discountCodes, handleDiscountChange)} dataSource={data} />
    </div>
  );
}

export default Order;
