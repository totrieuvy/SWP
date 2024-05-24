import React from "react";
import { Button, Form, Input } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./ResetPassword.scss";

function ResetPassword() {
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

            <Form className="reset__form__left__form">
              <Form.Item name="email">
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" className="reset__form__left__buttonReset">
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
