import { Button, Modal, Table, Input, Select, message, Form } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";

function AssignWorkarea() {
  const [dataWorkAreaStaff, setDataWorkAreaStaff] = useState([]);
  const [dataWorkAreaAvailable, setDataWorkAreaAvailable] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [selectedStaffID, setSelectedStaffID] = useState(null);
  const [selectedWorkArea, setSelectedWorkArea] = useState(null);
  const [selectedStaffName, setSelectedStaffName] = useState(null);
  const [currentWorkAreaCode, setCurrentWorkAreaCode] = useState(null);
  const [formCreate] = useForm();
  const [formVariable] = useForm();

  React.useEffect(() => {
    document.title = "Giao quầy làm việc";
  }, []);

  const fetchDataWorkAreaStaff = async () => {
    const response = await api.get("/api/workareas/staff");
    console.log(response.data);
    setDataWorkAreaStaff(response.data);
  };

  const fetchDataWorkArea = async () => {
    const response = await api.get("/api/workareas");
    console.log(response.data);
    const TrueValue = response.data.filter((data) => data.status === "Active");
    setDataWorkAreaAvailable(TrueValue);
  };

  useEffect(() => {
    fetchDataWorkAreaStaff();
    fetchDataWorkArea();
  }, []);

  const columns = [
    {
      title: "Mã nhân viên",
      dataIndex: "staffID",
      key: "staffID",
    },
    {
      title: "Tên tài khoản của nhân viên",
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: "Quầy đang làm việc",
      dataIndex: "workAreaCode",
      key: "workAreaCode",
      sorter: (a, b) => a.workAreaCode.localeCompare(b.workAreaCode),
      defaultSortOrder: "ascend",
    },
    {
      title: "Hành động",
      dataIndex: "staffID",
      key: "staffID",
      render: (staffID, record) => (
        <Button type="primary" onClick={() => handleOpenModal(staffID, record.workAreaCode, record.accountName)}>
          Giao quầy
        </Button>
      ),
    },
  ];

  const handleOpenModal = (staffID, workAreaCode, accountName) => {
    console.log(staffID);
    setSelectedStaffID(staffID);
    setCurrentWorkAreaCode(workAreaCode);
    setSelectedStaffName(accountName);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setSelectedWorkArea(null);
  };

  const handleAssign = async () => {
    const data = {
      staffId: selectedStaffID,
      workAreaCode: selectedWorkArea,
    };

    try {
      const response = await api.put("/api/scheduling/update-work-area", data);
      console.log(response.data);
      message.success("Phân công quầy thành công");
      fetchDataWorkAreaStaff();
      setVisible(false);
    } catch (error) {
      console.error("Error assigning work area:", error);
      if (error.response.data === "Work area is already occupied by another staff member.") {
        message.error("Ca này đang làm bởi nhân viên khác");
      }
    }
  };

  const handleOpenCreate = () => {
    setVisibleCreate(true);
  };

  const handleOkCreate = () => {
    formCreate.submit();
  };

  const handleCancelCreate = () => {
    setVisibleCreate(false);
  };

  const handleCreateWorkArea = async (values) => {
    const data = {
      workAreaCode: values.workAreaCode,
      description: values.description,
    };

    try {
      const response = await api.post("/api/workareas", data);
      console.log(response.data);
      message.success("Thêm quầy làm việc thành công");
      fetchDataWorkArea();
      setVisibleCreate(false);
      formCreate.resetFields();
    } catch (error) {
      console.error("Error creating work area:", error);
      if (error.response.data === "Duplicate") {
        message.error("Quầy này đã tồn tại!");
      }
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleOpenCreate}>
        Thêm quầy làm việc
      </Button>
      <Table dataSource={dataWorkAreaStaff} columns={columns} />
      <Modal title="Phân công quầy" open={visible} onOk={handleAssign} onCancel={handleCloseModal}>
        <Input label="Mã nhân viên" value={selectedStaffID} disabled style={{ marginBottom: "1rem" }} />
        <Input label="Tên nhân viên" value={selectedStaffName} disabled style={{ marginBottom: "1rem" }} />
        {currentWorkAreaCode === "No Work Area" ? (
          <Select placeholder="Chọn quầy" style={{ width: "100%" }} onChange={(value) => setSelectedWorkArea(value)}>
            {dataWorkAreaAvailable.map((area) => (
              <Select.Option key={area.pk_WorkAreaId} value={area.workAreaCode}>
                {area.workAreaCode}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <Input label="Quầy hiện tại" value={currentWorkAreaCode} disabled />
        )}
      </Modal>

      <Modal title="Thêm quầy làm việc" open={visibleCreate} onOk={handleOkCreate} onCancel={handleCancelCreate}>
        <Form form={formCreate} onFinish={handleCreateWorkArea}>
          <Form.Item
            name="workAreaCode"
            label="Mã quầy"
            rules={[
              { required: true, message: "Vui lòng nhập mã quầy" },
              {
                pattern: /^(CASH|APPR|SALE)\d{3}$/,
                message: "Mã quầy phải bắt đầu bằng CASH, APPR, SALE và theo sau là 3 số",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AssignWorkarea;
