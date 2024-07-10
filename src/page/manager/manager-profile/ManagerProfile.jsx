import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form, Input, notification } from "antd";
import api from "../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";
import { useForm } from "antd/es/form/Form";

function ManagerProfile() {
  const [managerProfile, setManagerProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector(selectUser);
  const [form] = useForm();

  const fetchManagerProfile = async () => {
    try {
      const response = await api.get(`/api/manager/${user.id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching manager profile:", error);
      return null;
    }
  };

  React.useEffect(() => {
    document.title = "Thông tin quản lí";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchManagerProfile();
      setManagerProfile(data);
      form.setFieldsValue(data);
    };

    fetchData();
  }, [form]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      const updatedProfile = await form.validateFields();
      const response = await api.put(`/api/managers/${user.id}`, {
        email: updatedProfile.email,
        username: updatedProfile.username,
        accountName: updatedProfile.accountName,
      });
      console.log(response.data);
      setManagerProfile(updatedProfile);
      setIsEditing(false);
      notification.success({
        message: "Thành công",
        description: "Cập nhật hồ sơ thành công",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleCancelEdit = () => {
    form.setFieldsValue(managerProfile);
    setIsEditing(false);
  };

  return (
    <div className="ManagerProfile" style={{ padding: 20, minHeight: "100vh" }}>
      {managerProfile && (
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col span={24}>
            <Card bordered={false} style={{ width: "100%" }}>
              <div
                className="profileContainer"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    borderRight: "1px solid #e8e8e8",
                    paddingRight: 20,
                  }}
                >
                  <Form form={form} layout="vertical">
                    <Form.Item label="Tên đăng nhập" name="username">
                      <Input disabled={!isEditing} />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "Phải nhập đúng định dạng email!",
                        },
                      ]}
                    >
                      <Input disabled={!isEditing} />
                    </Form.Item>
                    <Form.Item label="Tên tài khoản" name="accountName">
                      <Input disabled={!isEditing} />
                    </Form.Item>
                  </Form>
                  <div style={{ marginTop: 20 }}>
                    {isEditing ? (
                      <div>
                        <Button type="primary" onClick={handleSaveProfile} style={{ marginRight: 10 }}>
                          Lưu
                        </Button>
                        <Button onClick={handleCancelEdit}>Hủy</Button>
                      </div>
                    ) : (
                      <Button type="primary" onClick={handleEditProfile}>
                        Chỉnh sửa hồ sơ
                      </Button>
                    )}
                  </div>
                </div>
                <div style={{ flex: 1, paddingLeft: 20 }}>
                  <div
                    style={{
                      border: "1px solid #e8e8e8",
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src="https://t4.ftcdn.net/jpg/06/19/35/33/360_F_619353357_S0oPc83bPWHRdFbscBN3stxauqlRcDKo.jpg"
                      alt="Manager Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ManagerProfile;
