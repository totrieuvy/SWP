import React, { useState } from "react";
import "./Manager_ViewProduct.scss";
import SidebarManager from "../sidebarManager/SidebarManager";
import { Button, Form, Modal } from "antd";
import { useForm } from "antd/es/form/Form";

function Manager_ViewProduct() {
  const [visible, setVisible] = useState(false);
  const [formVariable] = useForm();

  const handOpenModal = () => {
    setVisible(true);
  };

  const handCloseModal = () => {
    setVisible(false);
  };

  const handleOk = () => {
    formVariable.submit();
  };
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
      </div>
      <Modal title="Thêm sản phẩm" open={visible} onCancel={handCloseModal} onOk={handleOk}>
        <Form form={formVariable}></Form>
      </Modal>
    </div>
  );
}

export default Manager_ViewProduct;
