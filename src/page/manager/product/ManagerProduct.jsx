import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, Tag, notification } from "antd";
import api from "../../../config/axios";

function ManagerProduct() {
  const [data, setData] = useState([]);

  useEffect(() => {
    document.title = "Danh sách sản phẩm";
    const fetchData = async () => {
      try {
        const response = await api.get("/api/productSell/readall");
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
      render: (image) => <img src={image} alt="product" style={{ width: 50 }} />,
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
    {
      title: "Xóa",
      dataIndex: "productID",
      key: "productID",
      render: (productID) => (
        <Popconfirm
          title="Xóa sản phẩm"
          description="Bạn có chắc muốn xóa sản phẩm không?"
          onConfirm={() => handleDeleteProductSell(productID)}
          okText="Đồng ý"
          cancelText="Không"
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];
  const handleDeleteProductSell = async (productID) => {
    await api.delete(`/api/productSell/delete/${productID}`);

    const listAfterDelete = data.filter((product) => product.productID !== productID);

    setData(listAfterDelete);

    notification.success({
      message: "Thành công",
      description: "Xóa sản phẩm thành công",
    });
  };
  return (
    <div className="productList">
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default ManagerProduct;
