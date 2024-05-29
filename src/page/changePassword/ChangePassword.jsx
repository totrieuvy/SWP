import React from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./ChangePassword.css";

function ChangePassword() {
  return (
    <div className="ChangePassword">
      <div className="ChangePasswordPage">
        <div className="change__header">
          <img src="./images/Logo.png" alt="Logo" />
          <h2>JEWELRYMS</h2>
        </div>

        <div className="change__form">
          <div className="change__form__left">
            <h3 className="change__form__left__welcome__1">CHANGE PASSWORD</h3>
            <h4 className="change__form__left__welcome__2">Enter your new password</h4>

            <Form className="change__form__left__form">
              <Form.Item name="newPassword">
                <Input prefix={<LockOutlined />} type="password" placeholder="New Password" />
              </Form.Item>
              <Form.Item name="confirmPassword">
                <Input prefix={<LockOutlined />} type="password" placeholder="Confirm Password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" className="change__form__left__buttonSave">
                  Save
                </Button>
              </Form.Item>
            </Form>
            <div className="change__form__left__back">
              <Button className="change__form__left__back__button" type="link">
                <ArrowLeftOutlined />
                <Link to="/Login">Back to log in</Link>
              </Button>
            </div>
          </div>
          <div className="change__form__right">
            <img src="./images/Login.jpg" alt="Change Password" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
