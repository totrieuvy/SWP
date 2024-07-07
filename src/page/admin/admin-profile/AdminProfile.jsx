import { Card, Button, Row, Col, Form, Input, Spin } from "antd";
import React, { useState } from "react";
import api from "../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";

function AdminProfile() {
  const [adminProfile, setAdminProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector(selectUser);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const fetchAdminProfile = async () => {
    try {
      const response = await api.get(`/api/admins/${user.id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      return null;
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAdminProfile();
      setAdminProfile(data);
      form.setFieldsValue(data);
      setLoading(false);
    };

    fetchData();
    document.title = "Thông tin quản lí";
  }, [form]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      const updatedProfile = await form.validateFields();
      await api.put(`/api/admins/${user.id}`, {
        email: updatedProfile.email,
        username: updatedProfile.username,
        accountname: updatedProfile.accountname,
      });
      setAdminProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleCancelEdit = () => {
    form.setFieldsValue(adminProfile);
    setIsEditing(false);
  };

  return (
    <div className="AdminProfile" style={{ padding: 20, minHeight: "100vh" }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        adminProfile && (
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
                      <Form.Item label="Tên" name="username">
                        <Input disabled={!isEditing} />
                      </Form.Item>
                      <Form.Item label="Email" name="email">
                        <Input disabled={!isEditing} />
                      </Form.Item>
                      <Form.Item label="Vai trò" name="role">
                        <Input disabled={true} />
                      </Form.Item>
                      <Form.Item label="Tên tài khoản" name="accountName">
                        <Input disabled={!isEditing} />
                      </Form.Item>
                      <Form.Item label="Trạng thái" name="status">
                        <Input disabled={true} />
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
                        alt="Admin Profile"
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
        )
      )}
    </div>
  );
}

export default AdminProfile;
