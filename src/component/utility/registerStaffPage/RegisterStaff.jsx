import React from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import "./RegisterStaff.css";

function Register() {
  return (
    <div className="Register">
      <div className="RegisterPage">
        <div className="register__header">
          <img src="./images/Logo.png" alt="Logo" />
          <h2>JEWELRYMS</h2>
        </div>

        <div className="register__form">
          <div className="register__form__left">
            <h3 className="register__form__left__welcome__1">CREATE AN ACCOUNT</h3>
            <Form className="register__form__left__form">
              <Form.Item name="name">
                <Input prefix={<UserOutlined />} placeholder="Name" />
              </Form.Item>
              <Form.Item name="phoneNumber">
                <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
              </Form.Item>
              <Form.Item name="email">
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item name="password">
                <Input prefix={<LockOutlined />} placeholder="Password" type="password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" className="register__form__left__buttonRegister">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="register__form__right">
            <img src="./images/Login.jpg" alt="Register" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
