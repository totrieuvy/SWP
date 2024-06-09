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
      const response = await api.post("/api/account/reset", values);
      console.log(response);

      if (response.status === 200) {
        notification.success({
          message: "Gửi mail thành công",
          description: "Hãy check mail của bạn",
        });
      }
    } catch (error) {
      console.log(error);
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
            <h3 className="reset__form__left__welcome__1">RESET YOUR PASSWORD</h3>
            <h5 className="reset__form__left__welcome__2">
              Enter the email associated to with your account and we will send an email with instruction to reset your
              password
            </h5>

            <Form className="reset__form__left__form" form={formVariable} onFinish={handleFinish} method="post">
              <Form.Item name="email">
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" className="reset__form__left__buttonReset" htmlType="submit">
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
            <div className="reset__form__left__back">
              <Button className="reset__form__left__back__button" type="link">
                <ArrowLeftOutlined />
                <Link to="/Login">Back to log in</Link>
              </Button>
            </div>
          </div>
          <div className="reset__form__right">
            <img src="./images/Login.jpg" alt="Reset Password" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
