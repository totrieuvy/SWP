import React from "react";
import { Button, Form, Input, notification } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./ResetPassword.css";
import api from "../../config/axios";
import { useForm } from "antd/es/form/Form";

function ResetPassword() {
  const [formVariable] = useForm();

  const handleFinish = async (values) => {
    console.log(values);
    try {
      // Check if email is valid
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(values.email)) {
        notification.error({
          message: "Invalid Email",
          description: "Please enter a valid email address.",
        });
        return;
      }

      const response = await api.post("/api/account/reset", values);
      console.log(response);

      if (response.status === 200) {
        if (response.data == "Is your email correct?") {
          notification.error({
            message: "Email không tồn tại",
            description: "Hãy kiểm tra lại email của bạn!",
          });
        } else {
          notification.success({
            message: "Gửi email thành công",
            description: "Hãy kiểm tra email của bạn và làm theo hướng dẫn để đổi mật khẩu",
          });
        }
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Thất bại",
        description: "Gửi email thất bại!",
      });
    }
  };

  return (
    <div className="ResetPassword">
      <div className="ResetPasswordPage">
        <div className="reset__header">
          <img src="./images/Logo.png" alt="Logo" />
          <h2>JEWELRYMS</h2>
        </div>

        <div className="reset__form">
          <div className="reset__form__left">
            <h3 className="reset__form__left__welcome__1">ĐỔI MẬT KHẨU</h3>
            <h5 className="reset__form__left__welcome__2">
              Nhập email của bạn và làm theo hướng dẫn của chúng tôi để đổi mật khẩu
            </h5>

            <Form className="reset__form__left__form" form={formVariable} onFinish={handleFinish} method="post">
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Bắt buộc nhập email",
                  },
                  {
                    type: "email",
                    message: "Phải nhập đúng định dạng email.",
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" className="reset__form__left__buttonReset" htmlType="submit">
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Form>
            <div className="reset__form__left__back">
              <Button className="reset__form__left__back__button" type="link">
                <ArrowLeftOutlined />
                <Link to="/Login">Quay lại đăng nhập</Link>
              </Button>
            </div>
          </div>
          <div className="reset__form__right">{/* <img src="./images/Login.jpg" alt="Reset Password" /> */}</div>
        </div>
      </div>
    </div>
  );
}
export default ResetPassword;
