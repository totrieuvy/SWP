import React, { useEffect, useState } from "react";
import "./Manager_ViewProduct.scss";
import SidebarManager from "../sidebarManager/SidebarManager";
import { Button, Form, Modal, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import api from "../../../config/axios";

function Manager_ViewProduct() {
  const [visible, setVisible] = useState(false);
  const [formVariable] = useForm();

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "pname",
      key: "pname",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Mô tả",
      dataIndex: "pdescription",
      key: "pdescription",
    },
    {
      title: "Nhà sản xuất",
      dataIndex: "manufacturer",
      key: "manufacturer",
    },
    {
      title: "Loại",
      dataIndex: "metalType",
      key: "metalType",
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
      title: "Loại đá",
      dataIndex: "gemstoneType",
      key: "gemstoneType",
    },
    {
      title: "Giá",
      dataIndex: "cost",
      key: "cost",
    },
  ];

  const [dataSource, setDataSource] = useState([]);

  const handOpenModal = () => {
    setVisible(true);
  };

  const handCloseModal = () => {
    setVisible(false);
  };

  const handleOk = () => {
    formVariable.submit();
  };

  const fetchProductManager = async () => {
    const response = await api.get("/productsell/read");
    console.log(response);
    setDataSource(response.data);
  };

  useEffect(() => {
    document.title = "Danh sách sản phẩm";
    fetchProductManager();
  }, []);
  return (
    <div className="Manager_ViewProduct">
      <div className="Manager_ViewProduct_sidebar">
        <SidebarManager />
      </div>
      <div className="Manager_ViewProduct_content">
        <h2 className="Manager_ViewProduct_content_listProduct">Thông tin sản phẩm</h2>
        <Button className="Manager_ViewProduct_content_button" type="primary" onClick={handOpenModal}>
          Thêm sản phẩm
        </Button>
        <Table dataSource={dataSource} columns={columns} />
      </div>
      <Modal title="Thêm sản phẩm" open={visible} onCancel={handCloseModal} onOk={handleOk}>
        <Form form={formVariable}></Form>
      </Modal>
    </div>
  );
}

export default Manager_ViewProduct;
