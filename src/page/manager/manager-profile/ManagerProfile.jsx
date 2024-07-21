import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form, Input, Spin, notification, Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from "../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";
import { useForm } from "antd/es/form/Form";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function ManagerProfile() {
  const [managerProfile, setManagerProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector(selectUser);
  const [form] = useForm();
  const [loading, setLoading] = useState(true);
  const [imageBase64, setImageBase64] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const fetchManagerProfile = async () => {
    try {
      const response = await api.get(`/api/manager/${user.id}`);
      console.log(response.data);
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: response.data.image,
        },
      ]);
      return response.data;
    } catch (error) {
      console.error("Error fetching manager profile:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchManagerProfile();
      setManagerProfile(data);
      form.setFieldsValue(data);
      setImageBase64(data.image);

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

      let imageToUpdate = imageBase64;

      console.log("File List: ", fileList);
      if (fileList.length > 0) {
        const file = fileList[0]?.originFileObj;

        console.log("File info:", file);
        console.log("File instanceof Blob:", file instanceof Blob);
        console.log("File type:", file?.type);

        if (file && (file instanceof Blob || file instanceof File)) {
          imageToUpdate = await getBase64(file);
        }
      }

      const response = await api.put(`/api/managers/${user.id}`, {
        email: updatedProfile.email,
        username: updatedProfile.username,
        accountName: updatedProfile.accountName,
        image: imageToUpdate,
      });

      console.log(response.data);
      setManagerProfile({ ...response.data, image: imageToUpdate });
      if (!(response.data.image == "Invalid base64 string: unable to decode")) {
        setImageBase64(response.data.image);
      }

      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: response.data.image,
        },
      ]);

      notification.success({
        message: "Thành công",
        description: "Cập nhật hồ sơ thành công",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      notification.error({
        message: "Lỗi",
        description: error.message,
      });
    }
  };

  const handleCancelEdit = () => {
    form.setFieldsValue(managerProfile);
    setImageBase64(managerProfile.image);
    setIsEditing(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    console.log("New File List: ", newFileList);
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      const file = newFileList[0].originFileObj;

      console.log("Selected file:", file);
      console.log("File instanceof Blob:", file instanceof Blob);
      console.log("File instanceof File:", file instanceof File);
      console.log("File type:", file?.type);

      if (file instanceof Blob || file instanceof File) {
        const base64 = await getBase64(file);
        setImageBase64(base64);
      } else {
        console.error("Invalid file type for base64 conversion");
      }
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="ManagerProfile" style={{ padding: 20, minHeight: "100vh" }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        managerProfile && (
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
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 20,
                      }}
                    >
                      {isEditing ? (
                        <Upload
                          listType="picture-card"
                          fileList={fileList}
                          onPreview={handlePreview}
                          onChange={handleChange}
                          maxCount={1}
                        >
                          {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                      ) : (
                        <img
                          src={imageBase64 || managerProfile.image}
                          alt="Manager Profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "5%",
                          }}
                        />
                      )}
                      {previewImage && (
                        <Image
                          preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterClose: () => setPreviewImage(""),
                          }}
                          src={previewImage}
                          style={{ display: "none" }}
                        />
                      )}
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

export default ManagerProfile;
