import React, { useEffect, useState } from "react";
import api from "../../../../config/axios";
import {
  AppstoreOutlined,
  MailOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

function ChooseCategory({ setCategory }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`api/category`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching the order", error);
      }
    };

    fetchData();
  }, []);
  const handleClick = (item) => {
    setCategory(item);
  };
  const menuItems = [
    {
      label: "Product Categories",
      key: "sub1",
      icon: <DownOutlined />,
      children: data.map((item) => ({
        label: item.name,
        key: `category:${item.id}`,
        onClick: () => handleClick(item),
      })),
    },
  ];
  return <Menu mode="horizontal" items={menuItems} />;
}

export default ChooseCategory;
